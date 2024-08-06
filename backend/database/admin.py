from pydantic import BaseModel
from fastapi import Request
from datetime import datetime, timedelta, timezone
from ..exceptions import InvalidCredentials
import uuid

import backend.database.util as util
import backend.clients as clients

# https://medium.com/@marcnealer/fastapi-http-authentication-f1bb2e8c3433


class AccountInfo(BaseModel):
    email: str
    password: str


async def _create_session(account_id: int, host):
    session_id = str(uuid.uuid4())
    session_hash = util.hash_sha3_256(session_id)
    session_start = datetime.now(timezone.utc)
    expires_at = session_start + timedelta(hours=24)
    last_activity = session_start
    timout_duration = timedelta(hours=8)

    await clients.admin_client.fetch_row("""
        INSERT INTO Session (id, ip_address, account_id, session_start, expires_at, last_activity, timeout_duration)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    """, session_hash, host, account_id, session_start, expires_at, last_activity, timout_duration)

    return session_id


async def _create_postgres_db_for(account_id):
    account_name = util.database_account_name_for(account_id)
    db_name = util.database_name_for(account_id)

    await clients.postgres_client.execute(f"""
        CREATE USER {account_name};
    """)

    await clients.postgres_client.execute(f"""
        CREATE DATABASE {db_name} OWNER {account_name};
    """)

    await clients.postgres_client.execute(f"""
        REVOKE ALL ON DATABASE {db_name} FROM PUBLIC;
    """)


async def _create_mongo_db_for(account_id):
    pass

    # Do something with this:
    # db.createUser({
    #     user: "testUser",
    #     pwd: "password",
    #     roles: [
    #         {role: "readWrite", db: "<your_database>"}
    #     ]
    # })


async def register(account: AccountInfo, host):
    # hash password
    password_hash = util.hash_bcrypt_2b(account.password)

    record = await clients.admin_client.fetch_row("""
        INSERT INTO Account (email, password_hash) 
        VALUES ($1, $2) RETURNING id;
    """, account.email, password_hash)

    account_id = record.get("id")
    await _create_postgres_db_for(account_id)
    await _create_mongo_db_for(account_id)

    return await _create_session(account_id, host)


async def login(account: AccountInfo, host):
    # get stored hash value from database
    record = await clients.admin_client.fetch_row("""
        SELECT id, password_hash 
        FROM Account 
        WHERE lower(email)=lower($1)
    """, account.email)

    # check if account exists
    if record is None:
        raise InvalidCredentials()

    # validate password
    password_hash = record.get('password_hash')
    password_correct = util.check_password(account.password, password_hash)

    if not password_correct:
        raise InvalidCredentials()

    return await _create_session(record.get("id"), host)


async def authenticate(request: Request):
    session_id = request.cookies.get('session_id')
    if not session_id:
        raise InvalidCredentials()

    session_id_hash = util.hash_sha3_256(session_id)

    account_info = await clients.admin_client.fetch_row("""
        WITH Account_Session AS (
            UPDATE Session SET last_activity = CURRENT_TIMESTAMP
            WHERE (
                id = $1 AND
                session_valid(expires_at::TIMESTAMP, last_activity::TIMESTAMP, timeout_duration::INTERVAL)
            )
            RETURNING account_id
        )
        SELECT id, email 
        FROM Account_Session
        JOIN Account ON id = account_id;
    """, session_id_hash)

    if account_info is None:
        raise InvalidCredentials()

    return account_info


def set_session_cookie(response, session_id):
    response.set_cookie(
        key='session_id',
        value=session_id,
        max_age=timedelta(hours=24).total_seconds(),
        expires=timedelta(hours=8).total_seconds(),
        path='/',
        secure=False,
        httponly=True,
        samesite='strict'
    )
