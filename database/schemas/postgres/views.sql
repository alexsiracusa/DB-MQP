-- Browse Media Page
CREATE OR REPLACE VIEW Media_Info AS
SELECT M.*,
    ARRAY_AGG(DISTINCT MG.genre) AS genres,
    ARRAY_AGG(DISTINCT MTS.synonym) AS title_synonyms,
    ARRAY_AGG(DISTINCT SC.is_main) AS is_main_studio,
    ARRAY_AGG(DISTINCT S.name) AS studio_names,
    ARRAY_AGG(DISTINCT S.is_animation_studio) AS is_animation_studios,
    ARRAY_AGG(DISTINCT MS.score) AS scores,
    ARRAY_AGG(DISTINCT MS.amount) AS score_amounts
FROM Media AS M
    LEFT JOIN Media_Genres AS MG ON M.id = MG.media_id
    LEFT JOIN Media_Title_Synonyms AS MTS ON M.id = MTS.media_id
    LEFT JOIN Studio_Connection AS SC ON M.id = SC.media_id
    LEFT JOIN Studio AS S ON SC.studio_id = S.id
    LEFT JOIN Media_Scores AS MS ON MS.media_id = M.id
GROUP BY M.id;   -- cursor.execute("SELECT * FROM MediaInfo WHERE id = %i", (media_id,))



CREATE OR REPLACE VIEW User_Lists AS
SELECT
	ML.account_id,
	ML.id AS list_id,
	ML.list_type,
	ML.list_name,
	JSON_AGG(MLD) AS list,
	JSON_AGG(MLE) AS entries
FROM
	Media_List AS ML
	JOIN Media_List_Group AS MLG ON MLG.list_id = ML.id
	JOIN Media_Info AS MLD ON MLG.media_id = MLD.id
	JOIN Media_List_Entry AS MLE ON MLE.media_id = MLD.id
	WHERE MLE.account_id = ML.account_id
GROUP BY ML.id;



CREATE OR REPLACE VIEW User_List_Entries AS
SELECT
	A.id,
	A.id AS account_id,
	JSON_AGG(MLD) AS list,
	JSON_AGG(MLE) AS entries
FROM
    Anilist_User AS A
    JOIN Media_List_Entry AS MLE ON MLE.account_id = A.id
    JOIN Media_Info AS MLD ON MLE.media_id = MLD.id
GROUP BY A.id;



CREATE OR REPLACE VIEW User_Anime_Stats AS
SELECT
    DISTINCT A.id AS account_id,
    'ANIME' AS type,
    A.id,
    ARRAY_AGG(GRS.name) OVER(PARTITION BY A.id) AS genre_names,
    ARRAY_AGG(COUNT (*) FILTER(WHERE GRS.name = ANY(MLD.genres))) OVER(PARTITION BY A.id) AS genre_counts,
    AVG(MLE.score) AS average_score,
    STDDEV(MLE.score) AS std_score,
    SUM(MLE.progress * MLD.episode_duration) AS minutes_watched,
    SUM(MLE.progress) AS episodes_watched,
    (SELECT histogram(MLE.score,0,100.01, 10))[1:10] AS score_distribution,
    COUNT(MLE) AS total_count
FROM
    Anilist_User AS A
    JOIN Media_List_Entry AS MLE ON MLE.account_id = A.id
    JOIN Media_Info AS MLD ON MLE.media_id = MLD.id
    CROSS JOIN Genre AS GRS
WHERE MLD.type = 'ANIME'
GROUP BY A.id, GRS.name;



CREATE OR REPLACE VIEW User_Manga_Stats AS
SELECT
    DISTINCT A.id AS account_id,
    'MANGA' AS type,
    A.id,
    ARRAY_AGG(GRS.name) OVER(PARTITION BY A.id) AS genre_names,
    ARRAY_AGG(COUNT (*) FILTER(WHERE GRS.name = ANY(MLD.genres))) OVER(PARTITION BY A.id) AS genre_counts,
    AVG(MLE.score) AS average_score,
    STDDEV(MLE.score) AS std_score,
    SUM(MLE.progress) AS chapters_read,
    SUM(MLE.progress_volumes) AS volumes_read,
    (SELECT histogram(MLE.score,0,100.01, 10))[1:10] AS score_distribution,
    COUNT(MLE) AS total_count
FROM
    Anilist_User AS A
    JOIN Media_List_Entry AS MLE ON MLE.account_id = A.id
    JOIN Media_Info AS MLD ON MLE.media_id = MLD.id
    CROSS JOIN Genre AS GRS
WHERE MLD.type = 'MANGA'
GROUP BY A.id, GRS.name;



-- user profile
--   aggregate count of Genre over all media consumed (e.g., 5 Fantasy, 3 Comedy, ...)
--   count of total media consumed (could split into anime count and manga count if you want)
--   mean score of media consumed (ignore null)

-- OPTIONAL:
--   days watched = sum_over_all_anime(episode_duration*episode_count)/number of minutes in a day





