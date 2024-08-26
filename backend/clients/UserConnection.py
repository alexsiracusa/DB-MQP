import asyncpg
import pymongo
import oracledb
from ..database.util import database_account_name_for, database_name_for
from ..config import Settings
import backend.clients as clients


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

    async def _connect_oracle(self):
        return oracledb.connect(
            user="admin",
            password="password",
            dsn=f"{Settings.ORACLE_HOST}:{Settings.ORACLE_PORT}/pdb{self.account_id}",
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

    async def execute_oracle(self, query):
        con = await self._connect_oracle()

        try:
            cursor = con.cursor()
            cursor = cursor.execute(query.rstrip(";"))
            con.commit()  # need to commit changes for oracle
            if cursor is None:
                return []
            columns = [col[0] for col in cursor.description]
            cursor.rowfactory = lambda *args: dict(zip(columns, args))
            return cursor.fetchall()
        except Exception:
            raise
        finally:
            con.close()



