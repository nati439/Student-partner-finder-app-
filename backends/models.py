#This use for sqlAlchemy so you don't need it

from pydantic import BaseModel

# ---------- SIGNUP ----------
class CreateUserRequest(BaseModel):
    username: str
    password: str

# ---------- LOGIN ----------
class LoginRequest(BaseModel):
    username: str
    password: str

# ---------- JWT RESPONSE ----------
class Token(BaseModel):
    access_token: str
    token_type: str