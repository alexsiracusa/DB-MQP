from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
db_host = os.getenv("MONGODB_HOST")
db_name = os.getenv("MONGODB_DB_NAME")
db_user = os.getenv("MONGODB_USER")
db_pass = os.getenv("MONGODB_PASSWORD")
db_port = os.getenv("MONGODB_PORT")


def get_connection():
    client = MongoClient(
        host=db_host,
        port=int(db_port),
        username=db_user,
        password=db_pass,
        serverSelectionTimeoutMS=1
    )
    db = client[str(db_name)]
    return client, db
