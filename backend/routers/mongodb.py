from fastapi import APIRouter, Response, Request, status
from pydantic import BaseModel
from ..exceptions import NotLoggedIn
import backend.clients as clients
from bson import json_util, ObjectId  # <- ObjectId import is needed for proper json parsing of mongodb results
import json


class Query(BaseModel):
    query: str | object


router = APIRouter(
    prefix="/mongodb",
    tags=["mongodb"],
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

        query = query.query
        if isinstance(query, str):
            query = json.loads(query)

        con = clients.UserConnection(account_info.get("id"))
        result = await con.execute_mongo(query)
        return {"result": json.loads(json_util.dumps(result))}

    except Exception as error:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": str(error)}
