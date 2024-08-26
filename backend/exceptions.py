
class InvalidCredentials(Exception):
    def __init__(self):
        super().__init__("Invalid username or password")


class NotLoggedIn(Exception):
    def __init__(self):
        super().__init__("Must be logged in to perform this action")


class EmptyOracleQuery(Exception):
    def __init__(self):
        super().__init__("ORA-00900: invalid SQL statement\nHelp: https://docs.oracle.com/error-help/db/ora-00900/")
