from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import backend.clients as clients
from .database import admin, InvalidCredentials
from .routers import postgres
from .routers import mongodb
from .routers import auth

app = FastAPI()
app.include_router(postgres.router)
app.include_router(mongodb.router)
app.include_router(auth.router)

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    # Server for storing account data
    clients.admin_client = clients.AdminClient()

    # Servers for storing account databases
    clients.postgres_client = clients.PostgresClient()
    clients.mongo_client = clients.MongoClient()


# Good tutorial on how to do authentication in fastapi:
# https://medium.com/@marcnealer/fastapi-http-authentication-f1bb2e8c3433
@app.middleware("http")
async def session_middleware(request: Request, call_next):
    session_id = request.cookies.get("session_id")
    if session_id:
        request.scope['session'] = session_id

    response = await call_next(request)
    return response


@app.middleware("http")
async def authentication_middleware(request: Request, call_next):
    try:
        account_info = await admin.authenticate(request)
        request.scope["auth"] = ["user"]
        request.scope["user"] = account_info
    except InvalidCredentials:
        request.scope["auth"] = ["anonymous"]
        request.scope["user"] = None

    response = await call_next(request)
    return response

