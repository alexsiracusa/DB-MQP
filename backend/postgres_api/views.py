from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from models.models import *
from .serializers import *
from rest_framework.exceptions import ValidationError, ParseError
from models.custom_types import *
from django.contrib.postgres.search import SearchVector
from django.db.models import F


# "/media/" parameters

# Parameter         Type        Description
# list              Boolean     whether to return a list of entries or just the first
# page              Int         page number
# per_page          Int         number of media per page
# id                Int         id of the media
# id_in             [Int]       id must be in this list
# id_not_in         [Int]       id must NOT be in this list
# account           Int         media that appear in one of the accounts lists
# type              MEDIA_TYPE  the type of the media -- ex: "anime", "manga"
# genre             String      ex: "Action", "Comedy" etc.
# media_format      String      ex: "OVA", "TV", "ONE_SHOT", "MOVIE" "MUSIC" etc.
# status            String      ex: "FINISHED", "RELEASING", "CANCELLED", "NOT_YET_RELEASED"
# country_of_origin String      ex: "KR, JP, CN, TW"
# year              Int         start_date year equals
# year_greater      Int         ...
# year_less         Int         ...
# score             Int         average_score equals
# score_greater     Int         ...
# score_less        Int         ...
# search            String      search for words in any of the title translations or description
# sort              String      sort by certain column name(s). Seperate column names with a
#                               comma. default ordering is ascending, put "-" in front of the
#                               column name to do ascending
#                               ex: "sort=id", "sort=-id,title_english"
@api_view(['GET'])
def get_media(request):
    # handle parameters
    list = request.GET.get("list", "False")
    if list.lower() in ["false", "true"]:
        list = eval(list.lower().capitalize())
    else:
        raise ValidationError({"list": "must be true or false"})

    page = request.GET.get("page", "0")
    if not page.isnumeric() and int(page) < 0:
        raise ValidationError({"page": "must be numeric and positive"})
    page = int(page)

    per_page = request.GET.get("per_page", "50")
    if not per_page.isnumeric() and int(per_page) < 1:
        raise ValidationError({"page": "must be numeric and greater than 1"})
    per_page = int(per_page)

    media_id = request.GET.get("id", None)

    id_in = request.GET.get("id_in", None)
    if id_in is not None:
        id_in_list = [int(i) for i in id_in.split(",")]

    id_not_in = request.GET.get("id_not_in", None)
    if id_not_in is not None:
        id_not_in_list = [int(i) for i in id_not_in.split(",")]

    account = request.GET.get("account", None)

    type = request.GET.get("type", None)
    if type is not None and type.upper() not in MEDIA_TYPE:
        raise ValidationError({"type": "not a valid media type"})

    search = request.GET.get("search", None)

    sort = request.GET.get("sort", None)
    sort_columns = []
    if sort is not None:
        columns = sort.split(",")
        all_columns = [f.name for f in MediaInfo._meta.get_fields()]
        for column in columns:
            ascending = True
            if column[0] == "-":
                column = column[1:]
                ascending = False
            if column not in all_columns:
                raise ValidationError(
                    {"sort": f"{column} is not a valid column name"})
            else:
                if ascending:
                    sort_columns.append(F(column).asc(nulls_last=True))
                else:
                    sort_columns.append(F(column).desc(nulls_last=True))

    # filters by: genre, format, publishing status, country of origin, year, score, anime/manga
    genre = request.GET.get("genre", None)
    format = request.GET.get("media_format", None)
    status = request.GET.get("status", None)
    country_of_origin = request.GET.get("country_of_origin", None)

    year = request.GET.get("year", None)
    if year is not None and not year.isnumeric() and int(year) < 0:
        raise ValidationError({"year": "must be numeric and positive"})
    year_greater = request.GET.get("year_greater", None)
    if year_greater is not None and not year_greater.isnumeric() and int(year_greater) < 0:
        raise ValidationError({"year_greater": "must be numeric and positive"})
    year_less = request.GET.get("year_less", None)
    if year_less is not None and not year_less.isnumeric() and int(year_less) < 0:
        raise ValidationError({"year_less": "must be numeric and positive"})

    score = request.GET.get("score", None)
    if score is not None and not score.isnumeric() and int(score) < 0:
        raise ValidationError({"score": "must be numeric and positive"})
    score_greater = request.GET.get("score_greater", None)
    if score_greater is not None and not score_greater.isnumeric() and int(score_greater) < 0:
        raise ValidationError(
            {"score_greater": "must be numeric and positive"})
    score_less = request.GET.get("score_less", None)
    if score_less is not None and not score_less.isnumeric() and int(score_less) < 0:
        raise ValidationError({"score_less": "must be numeric and positive"})

    # get data based on parameters
    medias = MediaInfo.objects.all()
    if account is not None:
        entries = MediaListEntry.objects.filter(account=account)
        media_ids = [entry.media.id for entry in entries]
        medias = medias.filter(id__in=media_ids)

    if media_id is not None:
        medias = medias.filter(id=media_id)

    if id_in is not None:
        medias = medias.filter(id__in=id_in_list)

    if id_not_in is not None:
        medias = medias.exclude(id__in=id_not_in_list)

    if search is not None:
        medias = medias.annotate(search=SearchVector(
            "title_english", "title_english", "title_native", "description")
        ).filter(
            search=search
        )

    # filter
    if genre is not None:
        medias = medias.filter(genres__contains=genre)
    if type is not None:
        medias = medias.filter(type=type.upper())
    if format is not None:
        medias = medias.filter(format=format.upper())
    if status is not None:
        medias = medias.filter(status=status.upper())
    if country_of_origin is not None:
        medias = medias.filter(country_of_origin=country_of_origin.upper())

    # this solution is scuffed :)
    if year is not None:
        year_greater = year
        year_less = year
    if year_greater is not None:
        medias = medias.filter(start_date__gte=int(year_greater) * 10000)
    if year_less is not None:
        medias = medias.filter(start_date__lte=int(year_less) * 10000 + 9999)

    if score is not None:
        medias = medias.filter(average_score=score)
    if score_greater is not None:
        medias = medias.filter(average_score__gte=score_greater)
    if score_less is not None:
        medias = medias.filter(average_score__lte=score_less)

    # sort
    if sort is not None:
        medias = medias.order_by(*sort_columns)

    medias = medias[page*per_page:page*per_page + per_page]

    # return data
    serializer = MediaInfoSerializer(medias, many=True)
    if list:
        return Response(serializer.data)
    else:
        return Response(serializer.data[0])


@api_view(['POST'])
def create_media_list_entry(request, account=1):
    if request.method == 'POST':
        data = request.data
        # data.pop('id', None)  # remove id if it exists (it will auto-increment) #TODO: implement this (eventually)

        data['account'] = account

        # to conform with the model, we need to change media_id to media
        data['media'] = data['media_id']
        data.pop('media_id', None)

        print(data)  # debugging

        serializer = MediaListEntrySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)  # debugging
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_media_list_entry(request, entry_id):
    try:
        entry = MediaListEntry.objects.get(id=entry_id)
    except MediaListEntry.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        serializer = MediaListEntrySerializer(
            entry, data=request.data, partial=True)

        # processing to ensure that score and progress are int or null
        if request.data['score'] == '':
            request.data['score'] = None
        else:
            request.data['score'] = int(request.data['score'])
        if request.data['progress'] == '':
            request.data['progress'] = None
        else:
            request.data['progress'] = int(request.data['progress'])

        if serializer.is_valid():
            serializer.save()
            # print(f'entry {entry_id} updated with {request.data}')  # debugging
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_media_list_entry(request, entry_id):
    try:
        entry = MediaListEntry.objects.get(id=entry_id)
    except MediaListEntry.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    entry.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# "/media-list-entries/" parameters

# Parameter     Type        Description
# account       Int         the account to get media list entries from
@api_view(['GET'])
def media_list_entries(request):
    account = request.GET.get("account", None)
    if account is None:
        raise ValidationError({"account": "must specify an account number"})

    entries = UserListEntries.objects.filter(account_id=account)
    serializer = UserListEntriesSerializer(entries, many=True)
    return Response(serializer.data)


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


# "/studio/" parameters

# Parameter     Type        Description
# list          Boolean     whether to return a list of entries or just the first
# page          Int         page number
# per_page      Int         number of media per page
# id            Int         id of the studio
# id_in         [Int]       id must be in this list
# id_not_in     [Int]       id must NOT be in this list
# search        String      search for ...
# sort          String      ...
@api_view(['GET'])
def get_studio(request):
    # handle parameters
    list = request.GET.get("list", "False")
    if list.lower() in ["false", "true"]:
        list = eval(list.lower().capitalize())
    else:
        raise ValidationError({"list": "must be true or false"})

    page = request.GET.get("page", "0")
    if not page.isnumeric() and int(page) < 0:
        raise ValidationError({"page": "must be numeric and positive"})
    page = int(page)

    per_page = request.GET.get("per_page", "50")
    if not per_page.isnumeric() and int(per_page) < 1:
        raise ValidationError({"page": "must be numeric and greater than 1"})
    per_page = int(per_page)

    studio_id = request.GET.get("id", None)

    id_in = request.GET.get("id_in", None)
    if id_in is not None:
        id_in_list = [int(i) for i in id_in.split(",")]

    id_not_in = request.GET.get("id_not_in", None)
    if id_not_in is not None:
        id_not_in_list = [int(i) for i in id_not_in.split(",")]

    search = request.GET.get("search", None)

    sort = request.GET.get("sort", None)
    sort_columns = []
    if sort is not None:
        columns = sort.split(",")
        all_columns = [f.name for f in Studio._meta.get_fields()]
        for column in columns:
            ascending = True
            if column[0] == "-":
                column = column[1:]
                ascending = False
            if column not in all_columns:
                raise ValidationError(
                    {"sort": f"{column} is not a valid column name"})
            else:
                if ascending:
                    sort_columns.append(F(column).asc(nulls_last=True))
                else:
                    sort_columns.append(F(column).desc(nulls_last=True))

    # get data based on parameters
    studios = Studio.objects.all()

    if studio_id is not None:
        studios = studios.filter(id=studio_id)

    if id_in is not None:
        studios = studios.filter(id__in=id_in_list)

    if id_not_in is not None:
        studios = studios.exclude(id__in=id_not_in_list)

    if search is not None:
        studios = studios.annotate(search=SearchVector(
            "name")
        ).filter(
            search=search
        )

    if sort is not None:
        studios = studios.order_by(*sort_columns)

    studios = studios[page * per_page:page * per_page + per_page]

    # return data
    serializer = StudioSerializer(studios, many=True)
    if list:
        return Response(serializer.data)
    else:
        return Response(serializer.data[0])


# "/staff/" parameters

# Parameter     Type        Description
# list          Boolean     whether to return a list of entries or just the first
# page          Int         page number
# per_page      Int         number of media per page
# id            Int         id of the staff
# id_in         [Int]       id must be in this list
# id_not_in     [Int]       id must NOT be in this list
# search        String      search for ...
# sort          String      ...
@api_view(['GET'])
def get_staff(request):
    # handle parameters
    list = request.GET.get("list", "False")
    if list.lower() in ["false", "true"]:
        list = eval(list.lower().capitalize())
    else:
        raise ValidationError({"list": "must be true or false"})

    page = request.GET.get("page", "0")
    if not page.isnumeric() and int(page) < 0:
        raise ValidationError({"page": "must be numeric and positive"})
    page = int(page)

    per_page = request.GET.get("per_page", "50")
    if not per_page.isnumeric() and int(per_page) < 1:
        raise ValidationError({"page": "must be numeric and greater than 1"})
    per_page = int(per_page)

    studio_id = request.GET.get("id", None)

    id_in = request.GET.get("id_in", None)
    if id_in is not None:
        id_in_list = [int(i) for i in id_in.split(",")]

    id_not_in = request.GET.get("id_not_in", None)
    if id_not_in is not None:
        id_not_in_list = [int(i) for i in id_not_in.split(",")]

    search = request.GET.get("search", None)

    sort = request.GET.get("sort", None)
    sort_columns = []
    if sort is not None:
        columns = sort.split(",")
        all_columns = [f.name for f in Staff._meta.get_fields()]
        for column in columns:
            ascending = True
            if column[0] == "-":
                column = column[1:]
                ascending = False
            if column not in all_columns:
                raise ValidationError(
                    {"sort": f"{column} is not a valid column name"})
            else:
                if ascending:
                    sort_columns.append(F(column).asc(nulls_last=True))
                else:
                    sort_columns.append(F(column).desc(nulls_last=True))

    # get data based on parameters
    staff = Staff.objects.all()

    if studio_id is not None:
        staff = staff.filter(id=studio_id)

    if id_in is not None:
        staff = staff.filter(id__in=id_in_list)

    if id_not_in is not None:
        staff = staff.exclude(id__in=id_not_in_list)

    if search is not None:
        staff = staff.annotate(search=SearchVector(
            "name_first", "name_middle", "name_last", "name_full", "name_native", "description", "gender", "home_town")
        ).filter(
            search=search
        )

    if sort is not None:
        staff = staff.order_by(*sort_columns)

    staff = staff[page * per_page:page * per_page + per_page]

    # return data
    serializer = StaffSerializer(staff, many=True)
    if list:
        return Response(serializer.data)
    else:
        return Response(serializer.data[0])


# "/character/" parameters

# Parameter     Type        Description
# list          Boolean     whether to return a list of entries or just the first
# page          Int         page number
# per_page      Int         number of media per page
# id            Int         id of the character
# id_in         [Int]       id must be in this list
# id_not_in     [Int]       id must NOT be in this list
# search        String      search for ...
# sort          String      ...
@api_view(['GET'])
def get_character(request):
    # handle parameters
    list = request.GET.get("list", "False")
    if list.lower() in ["false", "true"]:
        list = eval(list.lower().capitalize())
    else:
        raise ValidationError({"list": "must be true or false"})

    page = request.GET.get("page", "0")
    if not page.isnumeric() and int(page) < 0:
        raise ValidationError({"page": "must be numeric and positive"})
    page = int(page)

    per_page = request.GET.get("per_page", "50")
    if not per_page.isnumeric() and int(per_page) < 1:
        raise ValidationError({"page": "must be numeric and greater than 1"})
    per_page = int(per_page)

    studio_id = request.GET.get("id", None)

    id_in = request.GET.get("id_in", None)
    if id_in is not None:
        id_in_list = [int(i) for i in id_in.split(",")]

    id_not_in = request.GET.get("id_not_in", None)
    if id_not_in is not None:
        id_not_in_list = [int(i) for i in id_not_in.split(",")]

    search = request.GET.get("search", None)

    sort = request.GET.get("sort", None)
    sort_columns = []
    if sort is not None:
        columns = sort.split(",")
        all_columns = [f.name for f in Character._meta.get_fields()]
        for column in columns:
            ascending = True
            if column[0] == "-":
                column = column[1:]
                ascending = False
            if column not in all_columns:
                raise ValidationError(
                    {"sort": f"{column} is not a valid column name"})
            else:
                if ascending:
                    sort_columns.append(F(column).asc(nulls_last=True))
                else:
                    sort_columns.append(F(column).desc(nulls_last=True))

    # get data based on parameters
    character = Character.objects.all()

    if studio_id is not None:
        character = character.filter(id=studio_id)

    if id_in is not None:
        character = character.filter(id__in=id_in_list)

    if id_not_in is not None:
        character = character.exclude(id__in=id_not_in_list)

    if search is not None:
        character = character.annotate(search=SearchVector(
            "name_first", "name_middle", "name_last", "name_full", "name_native", "description", "gender")
        ).filter(
            search=search
        )

    if sort is not None:
        character = character.order_by(*sort_columns)

    character = character[page * per_page:page * per_page + per_page]

    # return data
    serializer = StaffSerializer(character, many=True)
    if list:
        return Response(serializer.data)
    else:
        return Response(serializer.data[0])


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





