from fastapi import APIRouter, Request, Response, status
from pydantic import BaseModel
import backend.database_clients as clients


class Query(BaseModel):
    query: str


router = APIRouter(
    prefix="/postgres",
    tags=["postgres"],
    responses={404: {"description": "Not found"}},
)


@router.post("/execute/")
async def execute_query(
    response: Response,
    query: Query
):
    try:
        result = await clients.postgres_client.fetch(query.query)
        return {"result": result}
    except Exception as error:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": str(error)}
