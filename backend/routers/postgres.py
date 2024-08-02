from fastapi import APIRouter, Request, Response, status
from pydantic import BaseModel
from typing import cast
from ..database_clients import PostgresClient


class Query(BaseModel):
    query: str


router = APIRouter(
    prefix="/postgres",
    tags=["postgres"],
    responses={404: {"description": "Not found"}},
)


@router.post("/execute/")
async def execute_query(
    request: Request,
    response: Response,
    query: Query
):
    try:
        db = cast(PostgresClient, request.app.state.admin_db)
        result = await db.fetch(query.query)
        return {"result": result}
    except Exception as error:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": error}
