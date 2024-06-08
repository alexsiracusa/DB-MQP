from rest_framework import serializers
from .models import Media, MediaListEntry, MediaList, MediaInfo, UserList, UserListEntries, Studio, Staff, Character, UserAnimeStats, UserMangaStats, Account


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'


class MediaInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaInfo
        fields = '__all__'


class MediaListEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaListEntry
        fields = '__all__'


class MediaListSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaList
        fields = '__all__'


class UserListSerializer(serializers.ModelSerializer):
    list = serializers.JSONField()
    entries = serializers.JSONField()

    class Meta:
        model = UserList
        fields = [
            'account_id',
            'list_id',
            'list_type',
            'list_name',
            'list',
            'entries'
        ]


class UserListEntriesSerializer(serializers.ModelSerializer):
    list = serializers.JSONField()
    entries = serializers.JSONField()

    class Meta:
        model = UserListEntries
        fields = [
            'account_id',
            'list',
            'entries'
        ]


class StudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studio
        fields = '__all__'


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'


class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = '__all__'


class UserAnimeStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAnimeStats
        fields = [
            'type',
            'account_id',
            'genre_names',
            'genre_counts',
            'average_score',
            'std_score',
            'minutes_watched',
            'episodes_watched',
            'score_distribution',
            'total_count',
        ]


class UserMangaStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMangaStats
        fields = [
            'type',
            'account_id',
            'genre_names',
            'genre_counts',
            'average_score',
            'std_score',
            'chapters_read',
            'volumes_read',
            'score_distribution',
            'total_count',
        ]


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
