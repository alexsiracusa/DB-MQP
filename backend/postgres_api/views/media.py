from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serializers import *
from rest_framework.exceptions import ValidationError
from ..custom_types import *
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
