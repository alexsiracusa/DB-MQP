
class InvalidCredentials(Exception):
    def __init__(self):
        super().__init__("Invalid username or password")


class NotLoggedIn(Exception):
    def __init__(self):
        super().__init__("Must be logged in to perform this action")
