from fastapi import APIRouter, Response, status
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
    response: Response,
    account: AccountInfo
):
    try:
        record = await admin.login(account)
        response.status_code = status.HTTP_200_OK
        return {"result": record.get("id")}

    except InvalidCredentials as error:
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"error": str(error)}

    except Exception as error:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": str(error)}