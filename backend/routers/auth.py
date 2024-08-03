from fastapi import APIRouter, Response, Request, status
from ..database import AccountInfo, InvalidCredentials, admin

# Get TLS certificate from here for deploying
# https://letsencrypt.org/

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)


@router.post("/register/")
async def register(
    request: Request,
    response: Response,
    account: AccountInfo
):
    try:
        session_id = await admin.register(account, request.client.host)
        admin.set_session_cookie(response, session_id)
        response.status_code = status.HTTP_201_CREATED
        return {"message": f"Account created successfully"}

    except Exception as error:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": str(error)}


@router.post("/login/")
async def login(
    request: Request,
    response: Response,
    account: AccountInfo
):
    try:
        session_id = await admin.login(account, request.client.host)
        admin.set_session_cookie(response, session_id)
        response.status_code = status.HTTP_200_OK
        return {"message": "Successfully logged in"}

    except InvalidCredentials as error:
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"error": str(error)}

    except Exception as error:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": str(error)}


@router.get("/ping/")
async def ping(
    request: Request,
    response: Response,
):
    try:
        account_info = request.user
        if account_info is None:
            raise InvalidCredentials()

        response.status_code = status.HTTP_200_OK
        return {"account": account_info.get("email")}

    except InvalidCredentials:
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"error": "Invalid or expired session_id"}
