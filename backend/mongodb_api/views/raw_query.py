from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..util import get_connection
from bson import json_util, ObjectId
import json


@api_view(['POST'])
def run_raw_query(request):
    # get and parse query if necessary
    query = request.data.get('query')
    if isinstance(query, str):
        query = json.loads(query)

    try:
        # using PyMongo to execute raw query
        client, db = get_connection()
        result = db.command(query)
        client.close()

        # Construct custom response data
        response_data = {
            'result': json.loads(json_util.dumps(result))
        }
        # Return result of the query
        return Response(response_data, status=status.HTTP_200_OK)
    except Exception as error:
        # close client if necessary
        try:
            client.close()
        except:
            pass

        # Construct custom response data
        response_data = {
            'error': f'{error}'
        }
        # Return error message
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
