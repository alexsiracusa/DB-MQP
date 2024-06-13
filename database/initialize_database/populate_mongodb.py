from pymongo import MongoClient
from dotenv import load_dotenv
import json
import os

# load environment variables from .env file
load_dotenv()

db_host = os.getenv("MONGODB_HOST")
db_name = os.getenv("MONGODB_DB_NAME")
db_user = os.getenv("MONGODB_USER")
db_pass = os.getenv("MONGODB_PASSWORD")
db_port = os.getenv("MONGODB_PORT")

# check that .env was loaded successfully
if db_name is None:
    print("could not find .env file")
    exit(0)

# load database connection
client = MongoClient(
    host=db_host,
    port=int(db_port),
    username=db_user,
    password=db_pass,
    serverSelectionTimeoutMS=1
)
db = client[str(db_name)]

# load schema
with open("../schemas/mongodb/schema.json") as json_file:
    validators = json.load(json_file)

# create schema in db
for validator in validators:
    title = validator["title"]

    try:
        db.drop_collection(title)
        db.create_collection(title)
        db.command("collMod", title, validator=validator)
    except Exception as e:
        print(e)


# command to create a collection with a given name and jsonSchema in shell
create_collection = """
db.createCollection("%s", {
    "validator": {
        "$jsonSchema": {
            %s
        }
    }
})
"""




