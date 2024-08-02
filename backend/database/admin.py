from pydantic import BaseModel
import backend.clients as clients
import bcrypt


class AccountInfo(BaseModel):
    email: str
    password: str


class InvalidCredentials(Exception):
    def __init__(self):
        super().__init__("Invalid username or password")


async def register(account: AccountInfo):
    # hashing password
    data = account.password.encode('utf-8')
    salt = bcrypt.gensalt()
    password_hash = bcrypt.hashpw(data, salt)

    record = await clients.postgres_client.fetch_row("""
        INSERT INTO Account (email, password_hash) VALUES ($1, $2) RETURNING id;
    """, account.email, password_hash.decode('utf-8'))

    return record


async def login(account: AccountInfo):
    # get stored hash value from database
    record = await clients.postgres_client.fetch_row("""
        SELECT id, password_hash FROM Account WHERE lower(email)=lower($1)
    """, account.email)

    # check if account exists
    if record is None:
        raise InvalidCredentials()

    # validate password
    password_hash = record.get('password_hash')
    password_correct = bcrypt.checkpw(account.password.encode('utf-8'), password_hash.encode('utf-8'))

    if not password_correct:
        raise InvalidCredentials()

    return record

