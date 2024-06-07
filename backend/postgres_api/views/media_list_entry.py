from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..serializers import *
from rest_framework.exceptions import ValidationError

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
