import cx_Oracle
from fastapi import APIRouter, Response, Request, status
from pydantic import BaseModel
from ..exceptions import NotLoggedIn
import backend.clients as clients


class Query(BaseModel):
    query: str


router = APIRouter(
    prefix="/oracle",
    tags=["oracle"],
    responses={404: {"description": "Not found"}},
)


@router.post("/execute/")
async def execute_query(
    request: Request,
    response: Response,
    query: Query
):
    try:
        account_info = request.user
        if account_info is None:
            raise NotLoggedIn()

        con = clients.UserConnection(account_info.get("id"))
        # result = await con.execute_postgres(query.query)
        return {"result": "result"}

    except Exception as error:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": str(error)}
