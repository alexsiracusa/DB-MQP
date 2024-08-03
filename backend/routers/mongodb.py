from fastapi import APIRouter, Response, status
from pydantic import BaseModel
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
    response: Response,
    query: Query
):
    try:
        query = query.query
        if isinstance(query, str):
            query = json.loads(query)

        db = clients.mongo_client.get_database("mongodb")
        result = db.cursor_command(query)
        return {"result": json.loads(json_util.dumps(result))}

    except Exception as error:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": str(error)}
