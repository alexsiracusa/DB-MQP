from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serializers import *
from rest_framework.exceptions import ValidationError
from ..custom_types import *

# "/media-lists/" parameters

# Parameter     Type                Description
# account       Int                 the account to get media lists from
# list_type     MEDIA_LIST_TYPE     the type of lists to get ('anime', 'manga', or 'custom')
@api_view(['GET'])
def get_media_lists(request):
    # handle parameters
    account = request.GET.get("account", None)
    if account is None:
        raise ValidationError({"account": "must specify an account number"})

    list_type = request.GET.get("list_type", None)
    if list_type is not None and list_type.lower() not in MEDIA_LIST_TYPE:
        raise ValidationError({"list_type": "not a valid list type"})

    # get data list(s) on parameters
    lists = UserList.objects.filter(account_id=account)

    if list_type is not None:
        lists = lists.filter(list_type=list_type.lower())

    serializer = UserListSerializer(lists, many=True)
    return Response(serializer.data)