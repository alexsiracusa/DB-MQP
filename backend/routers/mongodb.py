import pymongo.errors
from fastapi import APIRouter, Request, Response, status
from pydantic import BaseModel
from bson import json_util, ObjectId
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
    request: Request,
    response: Response,
    query: Query
):
    try:
        query = query.query
        if isinstance(query, str):
            query = json.loads(query)

        db = request.app.state.mongo_client.get_database("mongodb")
        result = db.cursor_command(query)
        return {"result": json.loads(json_util.dumps(result))}
    except pymongo.errors.OperationFailure as e:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": str(e)}
    except Exception as error:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": error}


# required imports for this function
# import subprocess
# import re

# @router.post("/execute-mongosh/")
# async def execute_query(
#     response: Response,
#     query: Query
# ):
#     try:
#         db_name = "mongodb"
#
#         # use command line to run mongosh terminal command
#         # cmd = ["mongosh", db_name, "--json=relaxed", "--eval", f"'{query.query}.toArray()'"]
#         cmd = ["mongosh", db_name, "--eval", f"'{query.query}'"]
#         result = subprocess.check_output(cmd).decode('utf-8')
#
#         # Parse result string
#         # Surround all keys in double quotes
#         result = re.sub('(\s)(\w+):(\s)', '"\g<2>": ', result)
#
#         # Parse ObjectId into json
#         result = re.sub('ObjectId\(\'(\w+)\'\)', '{"$oid": "\g<1>"}', result)
#
#         # Replace single quoted value strings with double quotes
#         result = re.sub(': \'(.*)\'', ': "\g<1>"', result)
#
#         # Load as json
#         result = json.loads(result)
#
#         return {'result': result}
#     except Exception as error:
#         response.status_code = status.HTTP_400_BAD_REQUEST
#         return {"error": error}





# I swear I tried to get it to run arbitrary javascript to do mongodb "queries" in a
# virtual environment for so long. The code below attempts to use STPyV8, which is
# maintained by CloudFlare, to run javascript in the Google V8 engine. Unfortunately
# when calling the python db object from pymongo's functions the parameter types don't
# match. I tried to "monkey patch" some of them as seen below, but this will only make
# the db.collection.find({field: "value"}) work and nothing else (i.e. aggregate etc.)


# How to monkey patch classes:
#   https://stackoverflow.com/questions/19545982/monkey-patching-a-class-in-another-module-in-python


# STPyV8 and other options for running arbitrary js code in (hopefully) safe environments
#   STPyV8        https://github.com/cloudflare/stpyv8
#   quickjs       https://github.com/PetterS/quickjs
#   PythonMonkey  https://github.com/Distributive-Network/PythonMonkey

#   https://stackoverflow.com/questions/10136319/executing-javascript-from-python


# required imports for this function
# import pymongo
# import STPyV8


# Monkey patching:
# old_init = pymongo.cursor.Cursor.__init__
#
# def new_init(self, *k, **kw):
#     params = list(k)
#     if len(params) > 1 and params[1].__class__.__name__ == "JSObject":
#         filter = params[1]
#         params[1] = dict((name, getattr(filter, name)) for name in dir(filter) if not name.startswith('__'))
#         old_init(self, *tuple(params), **kw)
#     else:
#         old_init(self, *k, **kw, filter=None)
#
# pymongo.cursor.Cursor.__init__ = new_init


# @router.post("/execute-javascript/")
# async def execute_raw_query(
#     request: Request,
#     response: Response,
#     query: Query
# ):
#     try:
#         db = request.app.state.mongo_client.get_database("mongodb")
#
#         with STPyV8.JSContext() as ctxt:
#             global0 = ctxt.locals
#             global0.db = db
#
#             ctxt.eval("""
#             function run() {
#                 try {
#                     return %s
#                 } catch (error) {
#                     return error
#                 }
#             }
#             """ % query.query)
#
#             output = ctxt.eval("run()")
#
#         return {"result": [doc for doc in json.loads(json_util.dumps(output))]}
#     except Exception as error:
#         response.status_code = status.HTTP_400_BAD_REQUEST
#         return {"error": error}
