# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from jsonfield import JSONField
from django.contrib.postgres.fields import ArrayField


class Account(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.TextField(blank=True, null=True)
    about = models.TextField(blank=True, null=True)
    avatar_large = models.TextField(blank=True, null=True)
    avatar_medium = models.TextField(blank=True, null=True)
    banner_image = models.TextField(blank=True, null=True)
    site_url = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'account'


class Character(models.Model):
    id = models.IntegerField(primary_key=True)
    name_first = models.TextField(blank=True, null=True)
    name_middle = models.TextField(blank=True, null=True)
    name_last = models.TextField(blank=True, null=True)
    name_full = models.TextField(blank=True, null=True)
    name_native = models.TextField(blank=True, null=True)
    image_large = models.TextField(blank=True, null=True)
    image_medium = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    gender = models.TextField(blank=True, null=True)
    date_of_birth = models.IntegerField(blank=True, null=True)
    age = models.TextField(blank=True, null=True)
    blood_type = models.TextField(blank=True, null=True)
    site_url = models.TextField(blank=True, null=True)
    favorites = models.TextField(blank=True, null=True)
    mod_notes = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'character'


class CharacterCast(models.Model):
    # The composite primary key (id, media_id, character_id) found, that is not supported. The first column is selected.
    id = models.IntegerField(primary_key=True)
    media = models.ForeignKey('Media', models.DO_NOTHING)
    character = models.ForeignKey(Character, models.DO_NOTHING)
    character_name = models.TextField(blank=True, null=True)
    # This field type is a guess.
    character_role = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'character_cast'
        unique_together = (('id', 'media', 'character'),)


class CharacterCastVoice(models.Model):
    # The composite primary key (character_cast_id, voice_actor_id) found, that is not supported. The first column is selected.
    character_cast = models.OneToOneField(
        CharacterCast, models.DO_NOTHING, primary_key=True)
    voice_actor = models.ForeignKey('Staff', models.DO_NOTHING)
    role_notes = models.TextField(blank=True, null=True)
    dub_group = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'character_cast_voice'
        unique_together = (('character_cast', 'voice_actor'),)


class CharacterNameAlternatives(models.Model):
    # The composite primary key (character_id, alternative_name) found, that is not supported. The first column is selected.
    character = models.OneToOneField(
        Character, models.DO_NOTHING, primary_key=True)
    alternative_name = models.TextField()
    is_spoiler = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'character_name_alternatives'
        unique_together = (('character', 'alternative_name'),)


class Genre(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'genre'


class Media(models.Model):
    id = models.IntegerField(primary_key=True)
    title_romanji = models.TextField(blank=True, null=True)
    title_english = models.TextField(blank=True, null=True)
    title_native = models.TextField(blank=True, null=True)
    # This field type is a guess.
    type = models.TextField(blank=True, null=True)
    # This field type is a guess.
    format = models.TextField(blank=True, null=True)
    # This field type is a guess.
    status = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    start_date = models.IntegerField(blank=True, null=True)
    end_date = models.IntegerField(blank=True, null=True)
    # This field type is a guess.
    season = models.TextField(blank=True, null=True)
    season_year = models.IntegerField(blank=True, null=True)
    season_int = models.IntegerField(blank=True, null=True)
    episodes = models.IntegerField(blank=True, null=True)
    episode_duration = models.IntegerField(blank=True, null=True)
    chapters = models.IntegerField(blank=True, null=True)
    volumes = models.IntegerField(blank=True, null=True)
    country_of_origin = models.TextField(blank=True, null=True)
    is_licensed = models.BooleanField(blank=True, null=True)
    # This field type is a guess.
    source = models.TextField(blank=True, null=True)
    hashtag = models.TextField(blank=True, null=True)
    trailer_id = models.TextField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    cover_image_extra_large = models.TextField(blank=True, null=True)
    cover_image_large = models.TextField(blank=True, null=True)
    cover_image_medium = models.TextField(blank=True, null=True)
    cover_image_color = models.TextField(blank=True, null=True)
    banner_image = models.TextField(blank=True, null=True)
    average_score = models.IntegerField(blank=True, null=True)
    mean_score = models.IntegerField(blank=True, null=True)
    popularity = models.IntegerField(blank=True, null=True)
    favourites = models.IntegerField(blank=True, null=True)
    is_adult = models.BooleanField(blank=True, null=True)
    site_url = models.TextField(blank=True, null=True)
    mod_notes = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'media'


class MediaGenres(models.Model):
    # The composite primary key (media_id, genre) found, that is not supported. The first column is selected.
    media = models.OneToOneField(Media, models.DO_NOTHING, primary_key=True)
    genre = models.TextField()  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'media_genres'
        unique_together = (('media', 'genre'),)


class MediaList(models.Model):
    id = models.IntegerField(primary_key=True)
    account = models.ForeignKey(
        Account, models.DO_NOTHING, blank=True, null=True)
    # This field type is a guess.
    list_type = models.TextField(blank=True, null=True)
    list_name = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'media_list'


class MediaListEntry(models.Model):
    account = models.ForeignKey(
        Account, models.DO_NOTHING, blank=True, null=True)
    media = models.ForeignKey(Media, models.DO_NOTHING, blank=True, null=True)
    # This field type is a guess.
    status = models.TextField(blank=True, null=True)
    score = models.IntegerField(blank=True, null=True)
    progress = models.IntegerField(blank=True, null=True)
    progress_volumes = models.IntegerField(blank=True, null=True)
    repeat = models.IntegerField(blank=True, null=True)
    priority = models.IntegerField(blank=True, null=True)
    private = models.BooleanField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    started_at = models.IntegerField(blank=True, null=True)
    completed_at = models.IntegerField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'media_list_entry'
        unique_together = (('account', 'media'),)


class MediaListGroup(models.Model):
    # The composite primary key (list_id, media_id) found, that is not supported. The first column is selected.
    list = models.OneToOneField(MediaList, models.DO_NOTHING, primary_key=True)
    media = models.ForeignKey(Media, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'media_list_group'
        unique_together = (('list', 'media'),)


class MediaRelation(models.Model):
    media_id = models.IntegerField(blank=True, null=True)
    related_media_id = models.IntegerField(blank=True, null=True)
    # This field type is a guess.
    relation_type = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'media_relation'


class MediaReview(models.Model):
    account = models.ForeignKey(
        Account, models.DO_NOTHING, blank=True, null=True)
    media = models.ForeignKey(Media, models.DO_NOTHING, blank=True, null=True)
    summary = models.TextField(blank=True, null=True)
    body = models.TextField(blank=True, null=True)
    rating = models.IntegerField(blank=True, null=True)
    rating_amount = models.IntegerField(blank=True, null=True)
    score = models.IntegerField(blank=True, null=True)
    private = models.BooleanField(blank=True, null=True)
    site_url = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'media_review'


class MediaScores(models.Model):
    # The composite primary key (media_id, score) found, that is not supported. The first column is selected.
    media = models.OneToOneField(Media, models.DO_NOTHING, primary_key=True)
    score = models.IntegerField()
    amount = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'media_scores'
        unique_together = (('media', 'score'),)


class MediaStatuses(models.Model):
    # The composite primary key (media_id, status) found, that is not supported. The first column is selected.
    media = models.OneToOneField(Media, models.DO_NOTHING, primary_key=True)
    status = models.TextField()  # This field type is a guess.
    amount = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'media_statuses'
        unique_together = (('media', 'status'),)


class MediaTag(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    category = models.TextField(blank=True, null=True)
    is_general_spoiler = models.BooleanField(blank=True, null=True)
    is_adult = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'media_tag'


class MediaTagConnection(models.Model):
    # The composite primary key (media_id, tag_id) found, that is not supported. The first column is selected.
    media = models.OneToOneField(Media, models.DO_NOTHING, primary_key=True)
    tag = models.ForeignKey(MediaTag, models.DO_NOTHING)
    rank = models.IntegerField(blank=True, null=True)
    is_media_spoiler = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'media_tag_connection'
        unique_together = (('media', 'tag'),)


class MediaTitleSynonyms(models.Model):
    # The composite primary key (media_id, synonym) found, that is not supported. The first column is selected.
    media = models.OneToOneField(Media, models.DO_NOTHING, primary_key=True)
    synonym = models.TextField()

    class Meta:
        managed = False
        db_table = 'media_title_synonyms'
        unique_together = (('media', 'synonym'),)


class MediaTrailer(models.Model):
    id = models.IntegerField(primary_key=True)
    anilist_id = models.TextField(blank=True, null=True)
    site = models.TextField(blank=True, null=True)
    thumbnail = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'media_trailer'


class Staff(models.Model):
    id = models.IntegerField(primary_key=True)
    name_first = models.TextField(blank=True, null=True)
    name_middle = models.TextField(blank=True, null=True)
    name_last = models.TextField(blank=True, null=True)
    name_full = models.TextField(blank=True, null=True)
    name_native = models.TextField(blank=True, null=True)
    # This field type is a guess.
    language = models.TextField(blank=True, null=True)
    image_large = models.TextField(blank=True, null=True)
    image_medium = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    gender = models.TextField(blank=True, null=True)
    date_of_birth = models.IntegerField(blank=True, null=True)
    date_of_death = models.IntegerField(blank=True, null=True)
    active_from = models.IntegerField(blank=True, null=True)
    active_to = models.IntegerField(blank=True, null=True)
    home_town = models.TextField(blank=True, null=True)
    blood_type = models.TextField(blank=True, null=True)
    site_url = models.TextField(blank=True, null=True)
    favorites = models.IntegerField(blank=True, null=True)
    mod_notes = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'staff'


class StaffConnection(models.Model):
    staff = models.ForeignKey(Staff, models.DO_NOTHING)
    # The composite primary key (media_id, staff_id) found, that is not supported. The first column is selected.
    media = models.OneToOneField(Media, models.DO_NOTHING, primary_key=True)
    role = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'staff_connection'
        unique_together = (('media', 'staff'),)


class StaffNameAlternatives(models.Model):
    # The composite primary key (staff_id, alternative_name) found, that is not supported. The first column is selected.
    staff = models.OneToOneField(Staff, models.DO_NOTHING, primary_key=True)
    alternative_name = models.TextField()

    class Meta:
        managed = False
        db_table = 'staff_name_alternatives'
        unique_together = (('staff', 'alternative_name'),)


class StaffOccupations(models.Model):
    # The composite primary key (staff_id, occupation) found, that is not supported. The first column is selected.
    staff = models.OneToOneField(Staff, models.DO_NOTHING, primary_key=True)
    occupation = models.TextField()

    class Meta:
        managed = False
        db_table = 'staff_occupations'
        unique_together = (('staff', 'occupation'),)


class Studio(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.TextField(blank=True, null=True)
    is_animation_studio = models.BooleanField(blank=True, null=True)
    site_url = models.TextField(blank=True, null=True)
    favorites = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'studio'


class StudioConnection(models.Model):
    # The composite primary key (studio_id, media_id) found, that is not supported. The first column is selected.
    studio = models.OneToOneField(Studio, models.DO_NOTHING, primary_key=True)
    media = models.ForeignKey(Media, models.DO_NOTHING)
    is_main = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'studio_connection'
        unique_together = (('studio', 'media'),)


class MediaInfo(models.Model):
    id = models.IntegerField(primary_key=True)
    title_romanji = models.TextField(blank=True, null=True)
    title_english = models.TextField(blank=True, null=True)
    title_native = models.TextField(blank=True, null=True)
    # This field type is a guess.
    type = models.TextField(blank=True, null=True)
    # This field type is a guess.
    format = models.TextField(blank=True, null=True)
    # This field type is a guess.
    status = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    start_date = models.IntegerField(blank=True, null=True)
    end_date = models.IntegerField(blank=True, null=True)
    # This field type is a guess.
    season = models.TextField(blank=True, null=True)
    season_year = models.IntegerField(blank=True, null=True)
    season_int = models.IntegerField(blank=True, null=True)
    episodes = models.IntegerField(blank=True, null=True)
    episode_duration = models.IntegerField(blank=True, null=True)
    chapters = models.IntegerField(blank=True, null=True)
    volumes = models.IntegerField(blank=True, null=True)
    country_of_origin = models.TextField(blank=True, null=True)
    is_licensed = models.BooleanField(blank=True, null=True)
    # This field type is a guess.
    source = models.TextField(blank=True, null=True)
    hashtag = models.TextField(blank=True, null=True)
    trailer_id = models.TextField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    cover_image_extra_large = models.TextField(blank=True, null=True)
    cover_image_large = models.TextField(blank=True, null=True)
    cover_image_medium = models.TextField(blank=True, null=True)
    cover_image_color = models.TextField(blank=True, null=True)
    banner_image = models.TextField(blank=True, null=True)
    average_score = models.IntegerField(blank=True, null=True)
    mean_score = models.IntegerField(blank=True, null=True)
    popularity = models.IntegerField(blank=True, null=True)
    favourites = models.IntegerField(blank=True, null=True)
    is_adult = models.BooleanField(blank=True, null=True)
    site_url = models.TextField(blank=True, null=True)
    mod_notes = models.TextField(blank=True, null=True)

    genres = models.TextField(blank=True, null=True)
    title_synonyms = ArrayField(models.TextField(blank=True, null=True))
    is_main_studio = ArrayField(models.BooleanField(blank=True, null=True))
    studio_names = ArrayField(models.TextField(blank=True, null=True))
    is_animation_studios = ArrayField(
        models.BooleanField(blank=True, null=True))
    scores = ArrayField(models.IntegerField(blank=True, null=True))
    score_amounts = ArrayField(models.IntegerField(blank=True, null=True))

    class Meta:
        managed = False
        db_table = 'media_info'


class UserList(models.Model):
    account_id = models.IntegerField(blank=True, null=True)
    list_id = models.IntegerField(primary_key=True)
    list_type = models.TextField(blank=True, null=True)
    list_name = models.TextField(blank=True, null=True)
    list = ArrayField(JSONField())
    entries = ArrayField(JSONField())

    class Meta:
        managed = False
        db_table = 'user_lists'


class UserListEntries(models.Model):
    account_id = models.IntegerField(blank=True, null=True)
    list = ArrayField(JSONField())
    entries = ArrayField(JSONField())

    class Meta:
        managed = False
        db_table = 'user_list_entries'


class UserAnimeStats(models.Model):
    type = models.TextField(blank=True, null=True)
    account_id = models.IntegerField(blank=True, null=True)
    genre_names = models.TextField(blank=True, null=True)
    genre_counts = ArrayField(models.IntegerField(blank=True, null=True))
    average_score = models.FloatField(blank=True, null=True)
    std_score = models.FloatField(blank=True, null=True)
    minutes_watched = models.FloatField(blank=True, null=True)
    episodes_watched = models.IntegerField(blank=True, null=True)
    score_distribution = ArrayField(models.IntegerField(blank=True, null=True))
    total_count = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_anime_stats'


class UserMangaStats(models.Model):
    type = models.TextField(blank=True, null=True)
    account_id = models.IntegerField(blank=True, null=True)
    genre_names = models.TextField(blank=True, null=True)
    genre_counts = ArrayField(models.IntegerField(blank=True, null=True))
    average_score = models.FloatField(blank=True, null=True)
    std_score = models.FloatField(blank=True, null=True)
    chapters_read = models.IntegerField(blank=True, null=True)
    volumes_read = models.IntegerField(blank=True, null=True)
    score_distribution = ArrayField(models.IntegerField(blank=True, null=True))
    total_count = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_manga_stats'
