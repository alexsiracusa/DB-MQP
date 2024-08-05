import asyncpg
import pymongo
from ..database.util import database_account_name_for, database_name_for
from ..config import Settings


class UserConnection:
    def __init__(self, account_id):
        self.account_id = account_id
        self.account_name = database_account_name_for(account_id)
        self.database_name = database_name_for(account_id)

    async def _connect_postgres(self):
        return await asyncpg.connect(
            host=Settings.POSTGRES_HOST,
            port=Settings.POSTGRES_PORT,
            user=self.account_name,
            password="",
            database=self.database_name,
        )

    async def _connect_mongo(self):
        return pymongo.MongoClient(
            host=Settings.MONGO_HOST,
            port=int(Settings.MONGO_PORT),
            username="",
            password="",
            serverSelectionTimeoutMS=1,
            maxPoolSize=1
        )

    async def execute_postgres(self, query):
        con = await self._connect_postgres()

        try:
            result = await con.fetch(query)
            return result
        except Exception:
            raise
        finally:
            await con.close()

    async def execute_mongo(self, query):
        client = await self._connect_mongo()
        db = client[self.database_name]

        try:
            try:
                # cursor_command fails on insert/update commands instead
                # of just returning nothing because mongodb is stupid.
                result = db.cursor_command(query)
                return result
            except Exception:
                db.command(query)
        except Exception:
            raise
        finally:
            client.close()



