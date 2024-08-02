from fastapi import FastAPI
import backend.clients as clients
from .routers import postgres
from .routers import mongodb
from .routers import auth

app = FastAPI()
app.include_router(postgres.router)
app.include_router(mongodb.router)
app.include_router(auth.router)


@app.on_event("startup")
async def startup():
    clients.postgres_client = clients.PostgresClient()
    clients.mongo_client = clients.MongoClient()

