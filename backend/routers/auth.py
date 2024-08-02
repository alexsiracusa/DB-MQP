from fastapi import APIRouter, Request, Response, status
from pydantic import BaseModel
import backend.database_clients as clients
import bcrypt


class AccountInfo(BaseModel):
    email: str
    password: str


router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)


@router.post("/register/")
async def register(
    response: Response,
    account: AccountInfo
):
    try:
        # hashing password
        data = account.password.encode('utf-8')
        salt = bcrypt.gensalt()
        password_hash = bcrypt.hashpw(data, salt)

        await clients.postgres_client.fetch("""
            INSERT INTO Account (email, password_hash) VALUES ($1, $2);
        """, account.email, password_hash.decode('utf-8'))

        response.status_code = status.HTTP_201_CREATED
        return {"message": "Account created successfully"}
    except Exception as error:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": str(error)}


@router.post("/login/")
async def login(
    request: Request,
    response: Response,
    account: AccountInfo
):
    class InvalidCredentials(Exception):
        def __init__(self, dummy):
            super().__init__("Invalid username or password")
            self.dummy = dummy

    def dummy_check():
        dummy = "$2b$12$w.W7RowVPITWT4n7y8SOt.jzmZIDPRO95WQrcK.DsxWm9iqcX.4WW"
        _ = bcrypt.checkpw("".encode('utf-8'), dummy.encode('utf-8'))

    try:
        # get stored hash value from database
        record = await clients.postgres_client.fetch_row("""
            SELECT password_hash FROM Account WHERE lower(email)=lower($1)
        """, account.email)

        # check if account exists
        if record is None:
            raise InvalidCredentials(True)

        password_hash = record.get('password_hash')

        password_correct = bcrypt.checkpw(account.password.encode('utf-8'), password_hash.encode('utf-8'))

        if not password_correct:
            raise InvalidCredentials(False)

        return {"result": "success"}

    except InvalidCredentials as error:
        if error.dummy:
            # Run a dummy bcrypt.checkpw(...) so the wait time for existing and non-existing account is the same.
            # This prevents someone from using response time to figure out if a given email has an account
            # associated with it.
            dummy_check()

        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"error": str(error)}

    except Exception as error:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": str(error)}