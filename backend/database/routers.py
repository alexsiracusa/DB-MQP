import inspect
import sys

postgres_models = [cls_name for cls_name, cls_obj in inspect.getmembers(sys.modules['models.models']) if inspect.isclass(cls_obj)]

class DBRouter(object):
    def db_for_read(self, model, **hints):
        # check if model is a postgres model
        if model.__name__ in postgres_models:
           return 'postgres'
        return None

    def db_for_write(self, model, **hints):
        # check if model is a postgres model
        if model.__name__ in postgres_models:
            return 'postgres'
        return None
