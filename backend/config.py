from dotenv import load_dotenv
import os

load_dotenv()


class Settings:
    POSTGRES_HOST = os.getenv("POSTGRES_HOST")
    POSTGRES_DB = os.getenv("POSTGRES_DB")
    POSTGRES_PORT = os.getenv("POSTGRES_PORT")
    POSTGRES_USER = os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")

    MONGO_HOST = os.getenv("MONGO_HOST")
    MONGO_DB = os.getenv("MONGO_DB")
    MONGO_PORT = os.getenv("MONGO_PORT")
    MONGO_USER = os.getenv("MONGO_USER")
    MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")

    ORACLE_HOST = os.getenv("ORACLE_HOST")
    ORACLE_SERVICE = os.getenv("ORACLE_SERVICE")
    ORACLE_PORT = os.getenv("ORACLE_PORT")
    ORACLE_USER = os.getenv("ORACLE_USER")
    ORACLE_PASSWORD = os.getenv("ORACLE_PASSWORD")
