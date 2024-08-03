from pydantic import BaseModel
import backend.clients as clients
from datetime import datetime, timedelta, timezone
import hashlib
import bcrypt
import uuid


class AccountInfo(BaseModel):
    email: str
    password: str


class InvalidCredentials(Exception):
    def __init__(self):
        super().__init__("Invalid username or password")


def _hash_bcrypt_2b(value):
    data = value.encode('utf-8')
    salt = bcrypt.gensalt(prefix=b'2b')
    return bcrypt.hashpw(data, salt).decode('utf-8')


def _hash_sha3_256(value):
    sha = hashlib.sha3_256()
    sha.update(value.encode('utf-8'))
    return sha.hexdigest()


async def _create_session(account_id: int, host):
    session_id = str(uuid.uuid4())
    session_hash = _hash_sha3_256(session_id)
    session_start = datetime.now(timezone.utc)
    expires_at = session_start + timedelta(hours=24)
    last_activity = session_start
    timout_duration = timedelta(hours=8)

    await clients.postgres_client.fetch_row("""
        INSERT INTO Session (id, ip_address, account_id, session_start, expires_at, last_activity, timeout_duration)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    """, session_hash, host, account_id, session_start, expires_at, last_activity, timout_duration)

    return session_id


async def register(account: AccountInfo):
    # hash password
    password_hash = _hash_bcrypt_2b(account.password)

    record = await clients.postgres_client.fetch_row("""
        INSERT INTO Account (email, password_hash) 
        VALUES ($1, $2) RETURNING id;
    """, account.email, password_hash)

    return record


async def login(account: AccountInfo, host):
    # get stored hash value from database
    record = await clients.postgres_client.fetch_row("""
        SELECT id, password_hash 
        FROM Account 
        WHERE lower(email)=lower($1)
    """, account.email)

    # check if account exists
    if record is None:
        raise InvalidCredentials()

    # validate password
    password_hash = record.get('password_hash')
    password_correct = bcrypt.checkpw(account.password.encode('utf-8'), password_hash.encode('utf-8'))

    if not password_correct:
        raise InvalidCredentials()

    return await _create_session(record.get("id"), host)


async def authenticate(session_id):
    account_info = await clients.postgres_client.fetch_row("""
        SELECT id, email
        FROM (
            SELECT account_id FROM Session 
            WHERE id = encode(digest($1, 'sha3-256'), 'hex')
        )
        JOIN Account ON id = account_id;
    """, session_id)

    if account_info is None:
        raise InvalidCredentials()

    return account_info
