from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serializers import *
from rest_framework.exceptions import ValidationError
from django.contrib.postgres.search import SearchVector
from django.db.models import F

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