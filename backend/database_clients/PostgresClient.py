from ..config import Settings
import asyncpg


class PostgresClient:
    def __init__(self):
        self.user = Settings.POSTGRES_USER
        self.password = Settings.POSTGRES_PASSWORD
        self.host = Settings.POSTGRES_HOST
        self.port = Settings.POSTGRES_PORT
        self.database = Settings.POSTGRES_DB
        self._cursor = None

        self._connection_pool = None
        self.con = None

    async def connect(self):
        if not self._connection_pool:
            try:
                self._connection_pool = await asyncpg.create_pool(
                    min_size=1,
                    max_size=10,
                    command_timeout=30,
                    host=self.host,
                    port=self.port,
                    user=self.user,
                    password=self.password,
                    database=self.database,
                )

            except Exception as e:
                print(e)

    async def fetch(self, query: str, *args):
        async def fetch():
            return await self.con.fetch(query, *args)

        return await self._execute(fetch)

    async def fetch_row(self, query: str, *args):
        async def fetch_row():
            return await self.con.fetchrow(query, *args)

        return await self._execute(fetch_row)

    async def _execute(self, get_result):
        if not self._connection_pool:
            await self.connect()
        else:
            self.con = await self._connection_pool.acquire()
            try:
                result = await get_result()
                return result
            except Exception:
                raise
            finally:
                await self._connection_pool.release(self.con)
