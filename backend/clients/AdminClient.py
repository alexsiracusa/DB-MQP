from .PostgresClient import PostgresClient


# Theoretically the admin database should be on a different server from
# the users' databases for security, Currently it is not.
class AdminClient(PostgresClient):
    pass


admin_client: AdminClient = None

