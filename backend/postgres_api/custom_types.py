from enum import Enum, EnumMeta


class MetaEnum(EnumMeta):
    def __contains__(cls, item):
        try:
            cls(item)
        except ValueError:
            return False
        return True


class BaseEnum(Enum, metaclass=MetaEnum):
    pass


class MEDIA_TYPE(str, BaseEnum):
    ANIME = 'ANIME'
    MANGA = 'MANGA'


class MEDIA_FORMAT(str, BaseEnum):
    TV = 'TV'
    TV_SHORT = 'TV_SHORT'
    MOVIE = 'MOVIE'
    SPECIAL = 'SPECIAL'
    OVA = 'OVA'
    ONA = 'ONA'
    MUSIC = 'MUSIC'
    MANGA = 'MANGA'
    NOVEL = 'NOVEL'
    ONE_SHOT = 'ONE_SHOT'


class MEDIA_LIST_TYPE(str, BaseEnum):
    anime = 'anime'
    manga = 'manga'
    custom = 'custom'







