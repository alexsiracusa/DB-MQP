from backend.config import Settings
import oracledb


class OracleClient:
    def __init__(self):
        self.user = Settings.ORACLE_USER
        self.password = Settings.ORACLE_PASSWORD
        self.host = Settings.ORACLE_HOST
        self.port = Settings.ORACLE_PORT
        self.service = Settings.ORACLE_SERVICE
        self._cursor = None

        self._connection_pool = None
        self.con = None

    async def connect(self):
        if not self._connection_pool:
            try:
                self._connection_pool = oracledb.SessionPool(
                    user=self.user,
                    password=self.password,
                    dsn=f"{self.host}:{self.port}/{self.service}",
                    min=1,
                    max=10,
                    increment=1,
                    encoding="UTF-8",
                    mode=oracledb.SYSDBA
                )

            except Exception:
                raise

    async def execute(self, query: str, *args):
        async def execute():
            return self._cursor.execute(query.rstrip().rstrip(";"), *args)

        return await self._execute(execute)

    async def _execute(self, get_result):
        if not self._connection_pool:
            await self.connect()

        self.con = self._connection_pool.acquire()
        self._cursor = self.con.cursor()
        try:
            cursor = await get_result()
            if cursor is not None:
                columns = [col[0] for col in cursor.description]
                cursor.rowfactory = lambda *args: dict(zip(columns, args))
                return cursor.fetchall()
            else:
                return []
        except Exception:
            raise
        finally:
            self._connection_pool.release(self.con)


oracle_client: OracleClient = None
