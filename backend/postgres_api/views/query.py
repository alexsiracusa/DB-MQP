from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import connection


def dictfetchall(cursor):
    # Returns all rows from a cursor as a dict
    desc = cursor.description
    return [
        dict(zip([col[0] for col in desc], row))
        for row in cursor.fetchall()
    ]


@api_view(['POST'])
def run_query(request):
    query = request.data.get('query')

    try:
        cursor = connection.cursor()
        cursor.execute(query)
        rows = list(dictfetchall(cursor))

        # Construct custom response data
        response_data = {
            'result': rows
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
