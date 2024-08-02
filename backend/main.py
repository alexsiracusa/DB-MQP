from fastapi import FastAPI
from .database_clients import PostgresClient
from .database_clients import MongoClient
from .routers import postgres
from .routers import mongodb
from .routers import auth

app = FastAPI()
app.include_router(postgres.router)
app.include_router(mongodb.router)
app.include_router(auth.router)


@app.on_event("startup")
async def startup():
    postgres_client = PostgresClient()
    await postgres_client.connect()
    app.state.admin_db = postgres_client

    mongo_client = MongoClient()
    app.state.mongo_client = mongo_client

