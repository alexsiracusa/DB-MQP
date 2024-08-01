from ..config import Settings
import pymongo


def MongoClient():
    return pymongo.MongoClient(
        host=Settings.MONGO_HOST,
        port=int(Settings.MONGO_PORT),
        username=Settings.MONGO_USER,
        password=Settings.MONGO_PASSWORD,
        serverSelectionTimeoutMS=1,
        maxPoolSize=5
    )
