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
# class Token(BaseModel):
#     access_token: str
#     token_type: str
class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: int
    username: str

class UserPfp(BaseModel):
    college: str
    username : str
    year: str
    pfp: str

class Subject(BaseModel):
    major: str
    subject: str
    note: str

class Time(BaseModel):
    day: str
    time: str
    contact: str 

class FullPayload(BaseModel):
    user_id: int
    user: UserPfp
    subject: Subject
    time: Time