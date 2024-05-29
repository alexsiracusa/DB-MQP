-- ===================================
-- CS 542 - Group 1
-- Alexander Gu, Anurag Gulavane, Rohan Rana, Alexander Siracusa
-- 
-- Project Schema
-- 
-- ===================================

DROP VIEW IF EXISTS User_List_Entries;
DROP VIEW IF EXISTS User_Anime_Stats;
DROP VIEW IF EXISTS User_Manga_Stats;
DROP VIEW IF EXISTS User_Lists;
DROP VIEW IF EXISTS Media_Info;

DROP TABLE IF EXISTS Media_Statuses;
DROP TABLE IF EXISTS Media_Scores;
DROP TABLE IF EXISTS Media_Review;
DROP TABLE IF EXISTS Media_Trailer;
DROP TABLE IF EXISTS Media_List_Group;
DROP TABLE IF EXISTS Media_List;
DROP TABLE IF EXISTS Media_List_Entry;
DROP TABLE IF EXISTS Staff_Connection;
DROP TABLE IF EXISTS Account;
DROP TABLE IF EXISTS Media_Tag_Connection;
DROP TABLE IF EXISTS Media_Tag;
DROP TABLE IF EXISTS Media_Relation;
DROP TABLE IF EXISTS Studio_Connection;
DROP TABLE IF EXISTS Studio;
DROP TABLE IF EXISTS Character_Cast_Voice;
DROP TABLE IF EXISTS Character_Cast;
DROP TABLE IF EXISTS Staff_Occupations;
DROP TABLE IF EXISTS Staff_Name_Alternatives;
DROP TABLE IF EXISTS Media_Genres;
DROP TABLE IF EXISTS Media_Title_Synonyms;
DROP TABLE IF EXISTS Character_Name_Alternatives;
DROP TABLE IF EXISTS Genre;
DROP TABLE IF EXISTS Character;
DROP TABLE IF EXISTS Media;
DROP TABLE IF EXISTS Staff;
DROP TABLE IF EXISTS Anilist_User;



DROP TYPE IF EXISTS MEDIA_TYPE;

CREATE TYPE MEDIA_TYPE AS ENUM (
	'ANIME', 		-- Japanese Anime
	'MANGA'			-- Asian comic
);

DROP TYPE IF EXISTS MEDIA_FORMAT;

CREATE TYPE MEDIA_FORMAT AS ENUM (
	'TV',			-- Anime broadcast on television
	'TV_SHORT',		-- Anime which are under 15 minutes in length and broadcast on television
	'MOVIE',		-- Anime movies with a theatrical release
	
	'SPECIAL',		-- Special episodes that have been included in DVD/Blu-ray releases,
	               	-- picture dramas, pilots, etc
	               	
	'OVA',			-- (Original Video Animation) Anime that have been released directly on
					-- DVD/Blu-ray without originally going through a theatrical release or 
					-- television broadcast
					
	'ONA',			-- (Original Net Animation) Anime that have been originally released 
					-- online or are only available through streaming services.
					
	'MUSIC',		-- Short anime released as a music video
	'MANGA',		-- Professionally published manga with more than one chapter
	'NOVEL',		-- Written books released as a series of light novels
	'ONE_SHOT'		-- Manga with just one chapter
);

DROP TYPE IF EXISTS MEDIA_STATUS;

CREATE TYPE MEDIA_STATUS AS ENUM (
	'FINISHED',				-- Has completed and is no longer being released
	'RELEASING',			-- Currently releasing
	'NOT_YET_RELEASED',		-- To be released at a later date
	'CANCELLED',			-- Ended before the work could be finished
	'HIATUS'				-- Is currently paused from releasing and will resume at a later date
);

DROP TYPE IF EXISTS MEDIA_LIST_STATUS;

CREATE TYPE MEDIA_LIST_STATUS AS ENUM (
	'CURRENT',
	'PLANNING',
	'COMPLETED',
	'DROPPED',
	'PAUSED'
);

DROP TYPE IF EXISTS MEDIA_SEASON;

CREATE TYPE MEDIA_SEASON AS ENUM (
	'WINTER',		-- Months December to February
	'SPRING',		-- Months March to May
	'SUMMER',		-- Months June to August
	'FALL'			-- Months September to November
);


DROP TYPE IF EXISTS MEDIA_SOURCE;

CREATE TYPE MEDIA_SOURCE AS ENUM (
	'ORIGINAL',				-- An original production not based of another work
	'MANGA',				-- Asian comic book
	'LIGHT_NOVEL',			-- Written work published in volumes
	'VISUAL_NOVEL',			-- Video game driven primary by text and narrative
	'VIDEO_GAME',			-- Video game
	'OTHER',				-- Other
	'NOVEL',				-- Written works not published in volumes
	'DOUJINSHI',			-- Self-published works
	'ANIME',				-- Japanese Anime
	'WEB_NOVEL',			-- Written works published online
	'LIVE_ACTION',			-- Live action media such as movies or TV show
	'GAME',					-- Games excluding video games
	'COMIC',				-- Comics excluding manga
	'MULTIMEDIA_PROJECT',	-- Multimedia project
	'PICTURE_BOOK'			-- Picture book
);


DROP TYPE IF EXISTS LANGUAGE;

CREATE TYPE LANGUAGE AS ENUM (
	'Japanese', 'English', 'Korean', 'Italian', 'Spanish', 'Portuguese', 'French', 'German', 'Hebrew', 
	'Hungarian', 'Chinese', 'Arabic', 'Filipino', 'Catalan', 'Finnish', 'Turkish', 'Dutch', 'Swedish', 
	'Thai', 'Tagalog', 'Malaysian', 'Indonesian', 'Vietnamese', 'Nepali', 'Hindi', 'Urdu', 'Norwegian',
	'Polish'
);


DROP TYPE IF EXISTS USER_TITLE_LANGUAGE;

CREATE TYPE USER_TITLE_LANGUAGE AS ENUM (
	'ROMAJI', 				-- The romanization of the native language title
	'ENGLISH', 				-- The official english title
	'NATIVE', 				-- Official title in it's native language
	'ROMAJI_STYLISED', 		-- The romanization of the native language title, stylised by media creator
	'ENGLISH_STYLISED', 	-- The official english title, stylised by media creator
	'NATIVE_STYLISED'		-- Official title in it's native language, stylised by media creator
);


DROP TYPE IF EXISTS USER_STAFF_NAME_LANGUAGE;

CREATE TYPE USER_STAFF_NAME_LANGUAGE AS ENUM (
	'ROMAJI_WESTERN',		-- The romanization of the staff or character's native name, with western name ordering
	'ROMAJI',				-- The romanization of the staff or character's native name
	'NATIVE'				-- The staff or character's name in their native language
);


DROP TYPE IF EXISTS CHARACTER_ROLE;

CREATE TYPE CHARACTER_ROLE AS ENUM (
	'MAIN',					-- A primary character role in the media
	'SUPPORTING',			-- A supporting character role in the media
	'BACKGROUND'			-- A background character in the media
);


DROP TYPE IF EXISTS MEDIA_RELATION_TYPE;

CREATE TYPE MEDIA_RELATION_TYPE AS ENUM (
	'ADAPTATION',			-- An adaption of this media into a different format
	'PREQUEL',				-- Released before the relation
	'SEQUEL',				-- Released after the relation
	'PARENT',				-- The media a side story is from
	'SIDE_STORY',			-- A side story of the parent media
	'CHARACTER',			-- Shares at least 1 character
	'SUMMARY',				-- A shortened and summarized version
	'ALTERNATIVE',			-- An alternative version of the same media
	'SPIN_OFF',				-- An alternative version of the media with a different primary focus
	'OTHER',				-- Other
	'SOURCE',				-- The source material the media was adapted from
	'COMPILATION',			-- Version 2 only. (NOT SURE)
	'CONTAINS'				-- Version 2 only. (NOT SURE)
);


DROP TYPE IF EXISTS MEDIA_LIST_TYPE;

CREATE TYPE MEDIA_LIST_TYPE AS ENUM (
	'anime',				-- Anime list type
	'manga',				-- Manga list type
	'custom'				-- Custom list type
);


DROP TYPE IF EXISTS MEDIA_LIST_ENTRY_STATUS;

CREATE TYPE MEDIA_LIST_ENTRY_STATUS AS ENUM (
	'CURRENT',				-- Currently watching/reading
	'PLANNING',				-- Planning to watch/read
	'COMPLETED',			-- Finished watching/reading
	'DROPPED',				-- Stopped watching/reading before completing
	'PAUSED',				-- Paused watching/reading
	'REPEATING'				-- Re-watching/reading
);


DROP TYPE IF EXISTS MEDIA_GENRE;

CREATE TYPE MEDIA_GENRE AS ENUM (
	'Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Hentai', 'Horror', 'Mahou Shoujo',
    'Mecha', 'Music', 'Mystery', 'Psychological', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports',
    'Supernatural', 'Thriller'
);



CREATE TABLE Media (
	id					INT		Primary Key,	-- The id of the media
	
											-- The official titles of the media in various languages
	title_romanji		TEXT,					-- The romanization of the native language title
	title_english		TEXT,					-- The official english title
	title_native		TEXT,					-- Official title in it's native language
												-- ** Also check the "Media_Title_Synonyms" Table **
	
	type				MEDIA_TYPE,				-- The type of the media; anime or manga
	format				MEDIA_FORMAT,			-- The format the media was released in
	status				MEDIA_STATUS,			-- The current releasing status of the media
	description			TEXT,					-- Short description of the media's story and characters
	start_date 			INT,					-- The first official release date of the media
	end_date			INT,					-- The last official release date of the media
	season				MEDIA_SEASON,			-- Derived from "start_date"
	season_year			INT,					-- Derived from "start_date"
	season_int			INT, 					-- Derived from "start_date" (!**maybe idk what this is?)
	
											-- Only contains values for the relevant "type" (anime/manga)
	episodes			INT,					-- The amount of episodes the anime has when complete
	episode_duration	INT,					-- The general length of each anime episode in minutes
	chapters			INT,					-- The amount of chapters the manga has when complete
	volumes				INT, 					-- The amount of volumes the manga has when complete
	
	country_of_origin	TEXT,					-- Where the media was created. (ISO 3166-1 alpha-2) (!**make foreign key in "country" table)
	is_licensed			BOOLEAN,				-- If the media is officially licensed or a self-published doujin release
	source				MEDIA_SOURCE,			-- Source type the media was adapted from.
	hashtag				TEXT,					-- Official Twitter hashtags for the media
	trailer_id			TEXT,					-- Media trailer or advertisement	(!**make trailer table)
	updated_at			TIMESTAMP,				-- When the media's data was last updated
	
											-- The cover images of the media
	cover_image_extra_large		TEXT,			-- The cover image url of the media at its largest size. 
												-- If this size isn't available, large will be provided instead.
	cover_image_large			TEXT, 			-- The cover image url of the media at a large size
	cover_image_medium			TEXT, 			-- The cover image url of the media at medium size
	cover_image_color			TEXT, 			-- Average #hex color of cover image
	
	banner_image		TEXT,					-- The banner image of the media
	average_score		INT,					-- A weighted average score of all the user's scores of the media
	mean_score			INT,					-- Mean score of all the user's scores of the media
	popularity			INT,					-- The number of users with the media on their list
	favourites			INT,					-- The amount of user's who have favourited the media
	is_adult			BOOLEAN,				-- If the media is intended only for 18+ adult audiences
	site_url			TEXT,					-- The url for the media page on the AniList website
	mod_notes			TEXT,					-- Notes for site moderators (included for personal interest)
	
	
	
	CHECK (cover_image_color is null or cover_image_color ~* '^#[a-f0-9]{2}[a-f0-9]{2}[a-f0-9]{2}$')
);



CREATE TABLE Media_Relation (
	media_id			INT,					-- The id of the media
	related_media_id	INT,					-- The id of the related media
	relation_type		MEDIA_RELATION_TYPE		-- The type of relation to the parent model
);



CREATE TABLE Genre (
	id					INT		Primary Key,	-- The id of the genre
	name				MEDIA_GENRE				-- The name of the genre
);



CREATE TABLE Media_Genres (
	media_id			INT		REFERENCES Media (id),	-- The id of the media
	genre				MEDIA_GENRE,					-- The genre the media is a part of
	
	Primary Key (media_id, genre)
);



CREATE TABLE Media_Title_Synonyms (
	media_id			INT		REFERENCES Media (id),	-- The id of the media 
	synonym				TEXT,							-- The alternative title of the media
	
	Primary Key (media_id, synonym)
);



CREATE TABLE Media_Trailer (
	id					INT		Primary Key,			-- The trailer video id
	anilist_id			TEXT,							-- why is anilist's id a string???
	site				TEXT,							-- The site the video is hosted by 
														-- (Currently either youtube or dailymotion)
	thumbnail			TEXT							-- The url for the thumbnail image of the video
);



CREATE TABLE Character (
	id					INT		Primary Key,	-- The id of the character
	
											-- The name(s) of the character
	name_first			TEXT,					-- The character's given name
	name_middle			TEXT,					-- The character's middle name
	name_last			TEXT,					-- The character's surname
	name_full			TEXT,					-- The character's first and last name
	name_native			TEXT,					-- The character's full name in their native language
												-- ** Also check the "Character_Name_Alternatives" Table **
												
											-- The character images
	image_large			TEXT,					-- The character's image of media at its largest size
	image_medium		TEXT,					-- The character's image of media at medium size
	
	description			TEXT,					-- A general description of the character
	gender				TEXT, 					-- The character's gender. Usually "Male", "Female", or 
												-- "Non-binary" but can be any string.
	date_of_birth		INT,					-- The character's birth date
	age					TEXT,					-- The character's age. Note this is a string, not an int, 
	                                            -- it may contain further text and additional ages.
	blood_type			TEXT,					-- The character's blood type
	site_url			TEXT,					-- The url for the character page on the AniList website
	favorites			INT,					-- The amount of user's who have favourited the character
	mod_notes			TEXT					-- Notes for site moderators (included for personal interest)
);



CREATE TABLE Character_Name_Alternatives (
	character_id		INT		REFERENCES Character (id),	-- The id of the character
	alternative_name	TEXT,								-- The alternative name of the character
	is_spoiler			BOOLEAN,							-- If the name is considered a spoiler
	
	Primary Key (character_id, alternative_name)
);



CREATE TABLE Staff (
	id					INT		Primary Key,	-- The id of the staff member
	
											-- The names of the staff member
	name_first			TEXT,					-- The person's given name
	name_middle			TEXT,					-- The person's middle name
	name_last			TEXT,					-- The person's surname
	name_full			TEXT,					-- The person's first and last name
	name_native			TEXT,					-- The person's full name in their native language
												-- ** Also check the "Staff_Name_Alternatives" table **
	
	language			LANGUAGE,				-- The primary language of the staff member
	
											-- The staff images
	image_large			TEXT,					-- The person's image of media at its largest size
	image_medium		TEXT,					-- The person's image of media at medium size
	
	description			TEXT,					-- A general description of the staff member
	gender				TEXT,					-- The staff's gender. Usually Male, Female, or 
												-- Non-binary but can be any string
	date_of_birth		INT,					-- The staff's birth date
	date_of_death		INT,					-- The staff's death date if applicable
	active_from			INT,					-- First year the staff was active
	active_to			INT,					-- Last year the staff was active (Null if staff is still active)
	home_town			TEXT,					-- The persons birthplace or hometown
	blood_type			TEXT,					-- The person's blood type
	site_url			TEXT,					-- The url for the staff page on the AniList website
	favorites			INT,					-- The amount of user's who have favourited the staff member
	mod_notes			TEXT					-- Notes for site moderators (included for personal interest)
);



CREATE TABLE Staff_Name_Alternatives (
	staff_id			INT		REFERENCES Staff (id),	-- The id of the staff
	alternative_name	TEXT,							-- The alternative name of the staff
	
	Primary Key (staff_id, alternative_name)
);



CREATE TABLE Staff_Occupations (
	staff_id			INT		REFERENCES Staff (id),	-- The id of the staff
	occupation			TEXT,							-- One of the person's primary occupations
	
	Primary Key (staff_id, occupation)
);



CREATE TABLE Staff_Connection (
	staff_id			INT		REFERENCES Staff (id),	-- The id of the staff
	media_id			INT		REFERENCES Media (id),	-- The id of the media inolved in
	role				TEXT,							-- The role of the staff member in the production of the media
	
	Primary Key (media_id, staff_id)
);



CREATE TABLE Character_Cast (
	id					INT 	UNIQUE,						-- The id of this particular character cast
	media_id			INT 	REFERENCES Media (id),		-- The id of the media the character has been cast in
	
	character_id		INT 	REFERENCES Character (id),	-- The id of the character that has been cast
	character_name		TEXT,								-- Media specific character name
	character_role		CHARACTER_ROLE,						-- The characters role in the media
	
															-- ** voice actor information is in the **
															-- ** "Character_Cast_Voice" table      **
	
	Primary Key (id, media_id, character_id)	
);



CREATE TABLE Character_Cast_Voice (
	character_cast_id	INT		REFERENCES Character_Cast (id),	-- The id of the character cast being voiced
	voice_actor_id		INT 	REFERENCES Staff (id),			-- The id of the staff voicing the character
	role_notes			TEXT,									-- Notes regarding the VA's role for the character
	dub_group			TEXT,									-- Used for grouping roles where multiple dubs exist 
																-- for the same language. Either dubbing company name 
																-- or language variant.
															
	Primary Key (character_cast_id, voice_actor_id)
);



CREATE TABLE Studio (
	id						INT		Primary Key,	-- The id of the studio
	name					TEXT,					-- The name of the studio
	is_animation_studio		BOOLEAN,				-- If the studio is an animation studio or a
													-- different kind of company
	site_url				TEXT,					-- The url for the studio page on the AniList website
	favorites				INT						-- The amount of user's who have favourited the studio
);



CREATE TABLE Studio_Connection (
	studio_id				INT		REFERENCES Studio (id),		-- The id of the studio
	media_id				INT 	REFERENCES Media (id),		-- The id of the media produced
	is_main					BOOLEAN,							-- If the studio is the main animation 
																-- studio of the anime
	
	Primary Key (studio_id, media_id)
);



CREATE TABLE Media_Tag (
	id						INT		Primary Key,	-- The id of the tag
	name					TEXT,					-- The name of the tag
	description				TEXT, 					-- A general description of the tag
	category				TEXT,					-- The categories of tags this tag belongs to
	is_general_spoiler		BOOLEAN,				-- If the tag could be a spoiler for any media
	is_adult				BOOLEAN					-- If the tag is only for adult 18+ media
);



CREATE TABLE Media_Tag_Connection (
	media_id				INT		REFERENCES Media (id),		-- The id of the media being tagged
	tag_id					INT		REFERENCES Media_Tag (id),	-- The id of the tag
	rank					INT,								-- The relevance ranking of the tag out of the 100 for this media
	is_media_spoiler		BOOLEAN,							-- If the tag is a spoiler for this media
	
	Primary Key (media_id, tag_id)
);



CREATE TABLE Account (
	id						SERIAL		Primary Key,		-- The id of the account
	name					TEXT		Unique,				-- The name of the account
	about					TEXT,							-- The bio written by account (Markdown)
	
														-- The account's avatar images
	avatar_large			TEXT,							-- The avatar of account at its largest size
	avatar_medium			TEXT,							-- The avatar of account at medium size
	
	banner_image			TEXT,							-- The account's banner images
	site_url				TEXT							-- The url for the user page on the AniList website
	
	-- (!** will likely add user aggregate statistics in a seperate related table to be updated by triggers)
	-- (!** may add user list settings for manga/anime list display if we have time)
);



CREATE TABLE Media_List_Entry (
	id						SERIAL 		Primary Key,				-- The id of the list entry
	account_id				INT 		REFERENCES Account (id),	-- The id of the user owner of the list entry
	media_id				INT			REFERENCES Media (id),		-- The id of the media
	status					MEDIA_LIST_ENTRY_STATUS,				-- The watching/reading status
	score					INT,									-- The score of the entry [0,100]
	progress				INT,									-- The amount of episodes/chapters consumed by the user
	progress_volumes		INT,									-- The amount of volumes read by the user
	repeat					INT,									-- The amount of times the user has rewatched/read the media
	priority				INT,									-- Priority of planning
	private					BOOLEAN,								-- If the entry should only be visible to authenticated user
	notes					TEXT,									-- Text notes
	started_at				INT,									-- When the entry was started by the user
	completed_at			INT,									-- When the entry was completed by the user
	updated_at				TIMESTAMP,								-- When the entry data was last updated
	created_at				TIMESTAMP,								-- When the entry data was created
	
	UNIQUE (account_id, media_id)
);



CREATE TABLE Media_List (
	id						SERIAL		Primary Key,				-- The id of the list
	account_id				INT 		REFERENCES Account (id),	-- The id of the user owner of the list
	list_type				MEDIA_LIST_TYPE,						-- The type of list this entry is a part of
	list_name				TEXT									-- The name of the list
);



-- !** ensure that the owner of the list has a list entry for the corresponding media 
--     for all media in a list using a trigger
CREATE TABLE Media_List_Group (
	list_id					INT			REFERENCES Media_List (id),			-- The id of the list
	media_id				INT			REFERENCES Media (id),				-- The id of the list entry media
	
	Primary Key (list_id, media_id)
);



CREATE TABLE Media_Review (
	id					SERIAL	Primary Key,				-- The id of the review
	account_id			INT		REFERENCES Account (id),	-- The id of the review's creator
	media_id			INT		REFERENCES Media (id),		-- The id of the review's media
	summary				TEXT,								-- A short summary of the review
	body				TEXT,								-- The main review body text
	rating				INT,								-- The total user rating of the review
	rating_amount		INT,								-- The amount of user ratings of the review
	score				INT,								-- The review score of the media
	private				BOOLEAN,							-- If the review is not yet publicly published and is only
															-- viewable by creator
	site_url			TEXT,								-- The url for the review page on the AniList website
	created_at			TIMESTAMP,							-- The time of the thread creation
	updated_at			TIMESTAMP							-- The time of the thread last update
);



CREATE TABLE Media_Scores (
	media_id			INT		REFERENCES Media (id),		-- The id of the media
	score				INT,								-- The score
	amount				INT,								-- The amount of people who have rated the media 
															-- the given score
															
	Primary Key (media_id, score)
);



CREATE TABLE Media_Statuses (
	media_id			INT		REFERENCES Media (id),		-- The id of the media
	status				MEDIA_LIST_STATUS,					-- The status
	amount				INT,								-- The amount of people who have the media as
															-- the given status
															
	Primary Key (media_id, status)
);


CREATE TABLE Anilist_User (
	id								INT		Primary Key,		-- The id of the user
	name							TEXT,						-- The name of the user
	about							TEXT,						-- The bio written by user (Markdown)

															-- The User's Profile Images
	avatar_large					TEXT,						-- The avatar of user at its largest size
	avatar_medium					TEXT,						-- The avatar of user at medium size
	banner_image					TEXT,						-- The user's banner images
	
															-- The User's Options/Settings
	options_title_language			USER_TITLE_LANGUAGE,		-- The language the user wants to see media titles in
	options_display_adult_content	BOOLEAN,					-- Whether the user has enabled viewing of 18+ content
	options_airing_notifications	BOOLEAN,					-- Whether the user receives notifications when a show they are watching aires
	options_profile_color			TEXT,						-- Profile highlight color (blue, purple, pink, orange, red, green, gray)
	options_staff_name_language		USER_STAFF_NAME_LANGUAGE,	-- The language the user wants to see staff and character names in
	
	score_format					TEXT,
	site_url						TEXT,						-- The url for the user page on the AniList website
	created_at						TIMESTAMP,					-- When the user's account was created. 
																-- (Does not exist for accounts created before 2020)
	updated_at						TIMESTAMP,					-- When the user's data was last updated
	
															-- Aggregate User Anime Stats
	stats_anime_count				INT,						-- 
	stats_anime_mean_score			INT,						--
	stats_anime_standard_deviation	INT,						--
	stats_anime_minutes_watched		INT,						--
	stats_anime_episodes_watched	INT,						--
	
															-- Aggregate User Manga Stats
	stats_manga_count				INT,						-- 
	stats_manga_mean_score			INT,						--
	stats_manga_standard_deviation	INT,						--
	stats_manga_chapters_read		INT,						--
	stats_manga_volumes_read		INT							--
);














































