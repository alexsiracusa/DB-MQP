import hashlib
import bcrypt


def hash_bcrypt_2b(value):
    data = value.encode('utf-8')
    salt = bcrypt.gensalt(prefix=b'2b')
    return bcrypt.hashpw(data, salt).decode('utf-8')


def hash_sha3_256(value):
    sha = hashlib.sha3_256()
    sha.update(value.encode('utf-8'))
    return sha.hexdigest()


def check_password(password, hashed_password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))


def database_account_name_for(account_id):
    return f"account{account_id}"


def database_name_for(account_id):
    return f"database_{account_id}"
