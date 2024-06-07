from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..util import get_connection
from bson import json_util, ObjectId
import json
import subprocess
import re


@api_view(['POST'])
def run_query(request):
    query = request.data.get('query')

    try:
        # Old code using PyMongo
        # client, db = get_connection()
        # cursor = db.media.find({"id": "21"})
        # list_cur = list(cursor)
        # data = json.loads(json_util.dumps(list_cur))

        cmd = ["mongosh", "mongodb", "--eval", f"'{query}.pretty()'"]
        result = subprocess.check_output(cmd).decode('utf-8')

        # Parse result string
        # Surrounding all keys in double quotes
        result = re.sub('(\s)(\w+):(\s)', '"\g<2>": ', result)

        # parse ObjectId into json
        result = re.sub('ObjectId\(\'(\w+)\'\)', '{"$oid": "\g<1>"}', result)

        # replace single quoted value strings with double quotes
        result = re.sub(': \'(.*)\'', ': "\g<1>"', result)

        # Construct custom response data
        response_data = {
            'result': json.loads(result)
        }
        # Return result of the query
        return Response(response_data, status=status.HTTP_200_OK)
    except Exception as error:
        # Construct custom response data
        response_data = {
            'error': f'{error}'
        }
        # Return error message
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
