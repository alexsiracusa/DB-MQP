-- Triggers

--
-- Checks if score is between 0 - 100
--
CREATE OR REPLACE FUNCTION Score_Entry_Check_function()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.Score < 0 OR NEW.Score > 100 THEN
        RAISE EXCEPTION 'SCORE needs to be between 0 and 100 inclusive.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER Score_Entry_Check
BEFORE INSERT or UPDATE OF Score ON Media_List_Entry
FOR EACH ROW
EXECUTE FUNCTION Score_Entry_Check_function();


--
-- Creates default media list of users
--
CREATE OR REPLACE FUNCTION Default_Media_Lists_function()
RETURNS TRIGGER AS $$
BEGIN
	INSERT INTO Media_List(account_id, list_type, list_name) VALUES(NEW.id, 'anime', 'Anime List');
	INSERT INTO Media_List(account_id, list_type, list_name) VALUES(NEW.id, 'manga', 'Manga List');

	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER Default_Media_Lists
AFTER INSERT ON Anilist_User
FOR EACH ROW
EXECUTE FUNCTION Default_Media_Lists_function();


--
-- Automatically adds to the default anime/manga lists when added
-- to Media_List_Entry
--
CREATE OR REPLACE FUNCTION Insert_Into_Default_Media_Lists_function()
RETURNS TRIGGER AS $$
DECLARE
	mediaType VARCHAR(10);
    animeListId INTEGER;
	mangaListId INTEGER;
BEGIN
    SELECT type INTO mediaType FROM Media WHERE id = NEW.media_id;

    IF mediaType = 'ANIME' THEN
        SELECT id INTO animeListId FROM Media_List WHERE list_name = 'Anime List' AND account_id = NEW.account_id;
        INSERT INTO Media_List_Group VALUES (animeListId, NEW.media_id);
    ELSE
        SELECT id INTO mangaListId FROM Media_List WHERE list_name = 'Manga List' AND account_id = NEW.account_id;
        INSERT INTO Media_List_Group VALUES (mangaListId, NEW.media_id);
    END IF;

	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER Insert_Into_Default_Media_Lists
AFTER INSERT ON Media_List_Entry
FOR EACH ROW
EXECUTE FUNCTION Insert_Into_Default_Media_Lists_function();


--
-- Automatically deletes from the default anime/manga lists when added
-- to Media_List_Entry
--
CREATE OR REPLACE FUNCTION Delete_From_Default_Media_Lists_function()
RETURNS TRIGGER AS $$
DECLARE
    mediaType VARCHAR(10);
	animeListId INTEGER;
	mangaListId INTEGER;
BEGIN
    SELECT type INTO mediaType FROM Media WHERE id = OLD.media_id;
	SELECT id INTO animeListId FROM Media_List WHERE list_name = 'Anime List' AND account_id = NEW.account_id;
	SELECT id INTO mangaListId FROM Media_List WHERE list_name = 'Manga List' AND account_id = NEW.account_id;

    IF mediaType = 'ANIME' THEN
        DELETE FROM Media_List_Group WHERE list_id = animeListId AND media_id = OLD.media_id;
    ELSE
        DELETE FROM Media_List_Group WHERE list_id = mangaListId AND media_id = OLD.media_id;
    END IF;

	RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER Delete_From_Default_Media_Lists
BEFORE DELETE ON Media_List_Entry
FOR EACH ROW
EXECUTE FUNCTION Delete_From_Default_Media_Lists_function();