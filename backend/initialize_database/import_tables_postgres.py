import pandas as pd
import numpy as np
from pathlib import Path
import psycopg
from dotenv import load_dotenv
import os

# NOTE: make sure to cd into AniListApi before running this file (if running from console)
# or make sure to run this file from the AniListApi directory (if running from an IDE)

# load environment variables from .env file
load_dotenv()

db_name = os.getenv("DATABASE_NAME")
db_user = os.getenv("DATABASE_USER")
db_pass = os.getenv("DATABASE_PASSWORD")
db_port = os.getenv("DATABASE_PORT")

# load database connection
conn = psycopg.connect(
    dbname=db_name,
    user=db_user,
    host='127.0.0.1',
    password=db_pass,
    port=db_port
)
cur = conn.cursor()


# loading tables from CSVs
tables_dir = "../tables/"

# media data
media = pd.read_csv(tables_dir + "Media.csv")\
    .drop_duplicates(['id'], keep='first')
media_title_synonyms = pd.read_csv(
    tables_dir + "Media_Title_Synonyms.csv").drop_duplicates()
media_genres = pd.read_csv(tables_dir + "Media_Genres.csv")\
    .drop_duplicates(['media_id', 'genre'], keep='first')
media_scores = pd.read_csv(tables_dir + "Media_Scores.csv")
media_statuses = pd.read_csv(tables_dir + "Media_Statuses.csv")

# staff data
staff = pd.read_csv(tables_dir + "Staff.csv")
staff_name_alternatives = pd.read_csv(tables_dir + "Staff_Name_Alternatives.csv")\
    .drop_duplicates()
staff_occupations = pd.read_csv(tables_dir + "Staff_Occupations.csv")

# character data
character = pd.read_csv(tables_dir + "Character.csv")
character_name_alternatives = pd.read_csv(tables_dir + "Character_Name_Alternatives.csv")\
    .drop_duplicates(['character_id', 'alternative_name'], keep='first')

# genre data
genre = pd.read_csv(tables_dir + "Genre.csv")

# studio data
studio = pd.read_csv(tables_dir + "Studio.csv")

# tag data
media_tag = pd.read_csv(tables_dir + "Media_Tag.csv")

# user data
anilist_user = pd.read_csv(tables_dir + "Anilist_User.csv")
media_list_entry = pd.read_csv(tables_dir + "Media_List_Entry.csv")\
    .drop_duplicates(['account_id', 'media_id'], keep='first')
media_list_entry = media_list_entry[media_list_entry["account_id"].isin(
    anilist_user["id"])]
media_list_entry = media_list_entry[media_list_entry["media_id"].isin(
    media["id"])]
# media_list_entry.to_csv("../tables_tmp/Media_List_Entry.csv", index=False)



# relation tables
character_cast = pd.read_csv(tables_dir + "Character_Cast.csv")\
    .drop_duplicates(['id', 'media_id', 'character_id'], keep='first')
character_cast_voice = pd.read_csv(tables_dir + "Character_Cast_Voice.csv")\
    .drop_duplicates(['character_cast_id', 'voice_actor_id'], keep="first")
studio_connection = pd.read_csv(tables_dir + "Studio_Connection.csv")\
    .drop_duplicates(['studio_id', 'media_id'], keep='first')
media_relation = pd.read_csv(tables_dir + "Media_Relation.csv")\
    .drop_duplicates(['media_id', 'related_media_id'], keep='first')
media_tag_connection = pd.read_csv(tables_dir + "Media_Tag_Connection.csv")\
    .drop_duplicates(['media_id', 'tag_id'], keep='first')
staff_connection = pd.read_csv(tables_dir + "Staff_Connection.csv")\
    .drop_duplicates(['staff_id', 'media_id'], keep='first')

# filter out inconsistent data from certain relations
character_cast = character_cast[character_cast["character_id"].isin(
    character["id"])]
character_cast_voice = character_cast_voice[character_cast_voice["voice_actor_id"].isin(
    staff["id"])]
character_cast_voice = character_cast_voice[character_cast_voice["character_cast_id"].isin(
    character_cast["id"])]
media_tag_connection = media_tag_connection[media_tag_connection["media_id"].isin(
    media["id"])]
media_tag_connection = media_tag_connection[media_tag_connection["tag_id"].isin(
    media_tag["id"])]
staff_connection = staff_connection[staff_connection["staff_id"].isin(
    staff["id"])]

print("Loaded and cleaned all data")


# refresh database
sql_file_dir = "../../sql/"

helper = Path(sql_file_dir + "helper.sql").read_text()
cur.execute(helper)

schema = Path(sql_file_dir + "schema.sql").read_text()
cur.execute(schema)
print("Refreshed database")


def progress_count(current, total):
    ending = '\n' if current == total else ''
    print(f'\rProgress: {current}/{total}', end=ending)


def insert_table(table, query):
    total = len(table)
    current = 0

    for index, row in table.iterrows():
        # print out progress count
        current += 1
        progress_count(current, total)

        # insert row into db
        row_list = row.fillna(np.nan).replace([np.nan], [None]).tolist()
        cur.execute(query, row_list)


# ======================
# insert Media and related tables(s)
# ======================

media_query = """
    INSERT INTO Media VALUES (
        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 
        %s, %s, %s, %s, %s, %s, %s, to_timestamp(%s), %s, %s, %s, %s,
        %s, %s, %s, %s, %s, %s, %s, %s
    );
    """
media_title_synonyms_query = """
    INSERT INTO Media_Title_Synonyms VALUES (
        %s, %s
    );
    """
media_genres_query = """
    INSERT INTO Media_Genres VALUES (
        %s, %s
    );
    """
media_scores_query = """
    INSERT INTO Media_Scores VALUES (
        %s, %s, %s
    );
    """
media_statuses_query = """
    INSERT INTO Media_Statuses VALUES (
        %s, %s, %s
    );
    """

insert_table(media, media_query)
insert_table(media_title_synonyms, media_title_synonyms_query)
insert_table(media_genres, media_genres_query)
insert_table(media_scores, media_scores_query)
insert_table(media_statuses, media_statuses_query)
print("Inserted Media and related table(s)")


# ======================
# insert Staff and related table(s)
# ======================

staff_query = """
INSERT INTO Staff VALUES (
        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
    );
    """
staff_name_alternatives_query = """
    INSERT INTO Staff_Name_Alternatives VALUES (
        %s, %s
    );
    """
staff_occupations_query = """
    INSERT INTO Staff_Occupations VALUES (
        %s, %s
    );
    """

insert_table(staff, staff_query)
insert_table(staff_name_alternatives, staff_name_alternatives_query)
insert_table(staff_occupations, staff_occupations_query)
print("Inserted Staff and related table(s)")


# ======================
# insert Character and related table(s)
# ======================

character_query = """
    INSERT INTO Character VALUES (
        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
        %s, %s, %s, %s, %s, %s
    );
    """
character_name_alternatives_query = """
    INSERT INTO Character_Name_Alternatives VALUES (
        %s, %s, %s
    );
    """

insert_table(character, character_query)
insert_table(character_name_alternatives, character_name_alternatives_query)
print("Inserted Character and related table(s)")


# ======================
# insert Genre, Studio, and Tag tables
# ======================

genre_query = """
    INSERT INTO Genre VALUES (
        %s, %s
    );
    """
studio_query = """
    INSERT INTO Studio VALUES (
        %s, %s, %s, %s, %s
    );
    """
media_tag_query = """
    INSERT INTO Media_Tag VALUES (
        %s, %s, %s, %s, %s, %s
    );
    """

insert_table(genre, genre_query)
insert_table(studio, studio_query)
insert_table(media_tag, media_tag_query)
print("Inserted Genre, Studio, and Tag tables")


# ======================
# insert relation tables
# ======================

character_cast_query = """
    INSERT INTO Character_Cast VALUES (
        %s, %s, %s, %s, %s
    );
    """
character_cast_voice_query = """
    INSERT INTO Character_Cast_Voice VALUES (
        %s, %s, %s, %s
    );
    """
studio_connection_query = """
    INSERT INTO Studio_Connection VALUES (
        %s, %s, %s
    );
    """
media_relation_query = """
    INSERT INTO Media_Relation VALUES (
        %s, %s, %s
    );
    """
media_tag_connection_query = """
    INSERT INTO Media_Tag_Connection VALUES (
        %s, %s, %s, %s
    );
    """
staff_connection_query = """
    INSERT INTO Staff_Connection VALUES (
        %s, %s, %s
    );
    """

insert_table(character_cast, character_cast_query)
insert_table(character_cast_voice, character_cast_voice_query)
insert_table(studio_connection, studio_connection_query)
insert_table(media_relation, media_relation_query)
insert_table(media_tag_connection, media_tag_connection_query)
insert_table(staff_connection, staff_connection_query)
print("Inserted relation tables")


# ======================
# insert User table
# ======================
anilist_user_query = """
    INSERT INTO Anilist_User VALUES (
        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
        %s, %s, %s, to_timestamp(%s), to_timestamp(%s), %s, %s, %s, %s, %s,
        %s, %s, %s, %s, %s
    )
"""
insert_table(anilist_user, anilist_user_query)
print("Inserted Anilist_User table")


# ======================
# insert Media_List_Entry table
# ======================
media_list_entry_query = """
    INSERT INTO Media_List_Entry
        (account_id,media_id,status,score,progress,progress_volumes,repeat,priority,private,notes,started_at,completed_at,updated_at,created_at) 
    VALUES (
        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, to_timestamp(%s), to_timestamp(%s)
    );
"""
insert_table(media_list_entry, media_list_entry_query)
print("Inserted Media_List_Entry table")


# commit changes
conn.commit()
print("Committed changes")


# close connection
cur.close()
conn.close()
print("Closed connection")

print("done")
