from fastapi import APIRouter, Response, Request, status
from ..database import AccountInfo, InvalidCredentials, admin


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
        record = await admin.register(account)
        response.status_code = status.HTTP_201_CREATED
        return {"message": f"Account created successfully {record.get('id')}"}
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
        response.status_code = status.HTTP_200_OK
        return {"session_id": session_id}

    except InvalidCredentials as error:
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"error": str(error)}

    except Exception as error:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": str(error)}