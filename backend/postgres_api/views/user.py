from rest_framework.decorators import api_view
from rest_framework.response import Response
from models.models import *
from postgres_api.serializers import *
from rest_framework.exceptions import ValidationError
from models.custom_types import *

# "/user-stats/" parameters

# Parameter     Type        Description
# account       Int         the account to get anime stats from
@api_view(['GET'])
def get_user_stats(request):
    # handle parameters
    account = request.GET.get("account")
    if account is None:
        raise ValidationError({"account": "must specify an account number"})

    anime_stats = UserAnimeStats.objects.filter(account_id=account)
    anime_serializer = UserAnimeStatsSerializer(anime_stats, many=True)
    # process the genre_names field into a list of strings
    temp1 = anime_serializer.data[0]['genre_names']
    anime_serializer.data[0]['genre_names'] = temp1[1:-
                                                    1].replace('"', '').split(",")

    manga_stats = UserMangaStats.objects.filter(account_id=account)
    manga_serializer = UserMangaStatsSerializer(manga_stats, many=True)
    # process the genre_names field into a list of strings
    temp2 = manga_serializer.data[0]['genre_names']
    manga_serializer.data[0]['genre_names'] = temp2[1:-
                                                    1].replace('"', '').split(",")

    return Response(anime_serializer.data + manga_serializer.data)


# "/account/" parameters

# Parameter     Type        Description
# id            Int         the account id to get info on
# name          String      the account name to get info on
@api_view(['GET'])
def get_account(request):
    # handle parameters
    id = request.GET.get("id")
    name = request.GET.get("name")
    if id is None and name is None:
        raise ValidationError({"account/name": "must specify an account number or username"})

    # get data based on parameters
    account = Account.objects.all()

    if id is not None:
        account = account.filter(id=id)

    if name is not None:
        account = account.filter(name=name)

    serializer = AccountSerializer(account, many=True)
    return Response(serializer.data[0])

