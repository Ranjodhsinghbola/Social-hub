import database as db
from werkzeug.security import generate_password_hash, check_password_hash
class User:
    def __init__(self, user_id=None, username=None, email=None, created_at=None):
        self.user_id = user_id
        self.username = username
        self.email = email
        self.created_at = created_at

    @classmethod
    def register(cls, username: str, email: str, password: str):
        psw_hash = generate_password_hash(password)
        db.add_user(username, email, psw_hash)
