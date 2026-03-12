from fastapi import APIRouter, Depends, HTTPException, status, FastAPI
#APIRouter helps organize your api into smaller routers
#Depends it allows you to call something like database, jwt or function automatically before you run your endpoints
#HTTPException lets you send HTTP errors like 401 or 404
#status have predefined HTTP status code 

from passlib.context import CryptContext
#helps with varifying passwords 
from datetime import timedelta, datetime
#works with data and time 
from jose import jwt
#to create and verify JSON web tokens FOR AUTHENTICATION 
from database import get_db
#Your fucntion to get a db connections/session 
from models import CreateUserRequest, LoginRequest, Token
#CreateUserRequest validates the signup data (makes sure the user sent all required fields in the right format).
#LoginRequest validates the login data (checks that the username/password exist and are structured correctly).
#Token defines the response sent back to the frontend, usually including the JWT access_token so the app knows the user is logged in.
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# origins = [ 
#     "http://localhost:5173", #This is hostname and tells your computer ' talk to this same machin'
#     "http://127.0.0.1:5173", #This is loopback IP address It's raw ip version of localhost
# ]

# app.add_middleware(
#     CORSMiddleware,
#     #Before any request reaches my routes, run it through CORS rules first.
#     allow_origins=origins, #Only React running at localhost:5173 is allowed to call me.
#     allow_credentials=True, #“Okay, it’s safe to include credentials like cookies or auth headers in requests from the allowed domains.”
#     allow_methods=["*"], #Allow all HTTP methods.
#     allow_headers=["*"], #This allows headers; React needs this to send JSON data.
# )

router = APIRouter(prefix="/auth", tags=["auth"]) 
#router is like folder like how @app is like folder too
#APIRouter lets you organize your FastAPI routes into separate groups instead of putting everything in app directly.
#prefix Every path inside this router gets /auth glued in front.
#tags is just for docm

SECRET_KEY = "1aspojfi39202aookalkj394ijsakj4902nr" #the “master password” used to sign and verify tokens.
ALGORITHM = "HS256" #the “method” used to create the token’s signature securely.

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto") 
#CrytContext --> Think of it as a toolbox for hashing and verifying passwords.
#schemes=['bcrypt'] --> bcrypt is a strong, modern way to hash passwords so they can’t be easily guessed.
#This tells Passlib to warn you if you ever switch to an old/weak hash.

def create_access_token(username: str, user_id: int, expires_delta: timedelta):
    expire = datetime.utcnow() + expires_delta ## Calculates when the token should expire
    to_encode = {"sub": str(user_id), "username": username, "exp": expire} #set user info with expired date also, The reason user_id is string becasue what if other laungues or server don't interprets the data correctly. 
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM) 
    #This line creates a JWT token.
    #jtw is impored using *import jtw*. encode is function that turns this data into a signed JWT.
    #to_encode anything inside here is readable by anyone who has the token but cannot be changed without break the signature.
    # SECRET_KEY is super-secret-key 
    #algorithm=ALGORITHM This tells JWT how to sign the token
# ---------------- SIGNUP ----------------
@router.post("/signup", status_code=status.HTTP_201_CREATED) #Create a POST endpoint under /auth/signup. If the request succeeds, return HTTP 201.
async def create_user(create_user_request: CreateUserRequest, db=Depends(get_db)):# This function handles the signup request by receiving validated user data and a database connection so it can create a new user in the database.
    MAX_BCRYPT_LEN = 72

    plain_password = str(create_user_request.password)[:MAX_BCRYPT_LEN]
    hashed_password = bcrypt_context.hash(plain_password)
    
    
    
    
    
    # plain_password = str(create_user_request.password) #Get the password from the request and make sure it is a string before hashing it.
    # hashed_password = bcrypt_context.hash(plain_password) #Hashes the password using bcrypt so the original password cannot be recovered.
    with db.cursor() as cursor: #Opens a database cursor to run SQL queries.
        cursor.execute( #Executes an SQL INSERT using parameterized values to prevent SQL injection.
            "INSERT INTO users (username, hashed_password) VALUES (%s, %s)",
            (create_user_request.username, hashed_password)
        )
        db.commit() #Commits the transaction so the user is saved in the database.
        user_id = cursor.lastrowid #Retrieves the auto-generated id of the newly inserted user
    return {"id": user_id, "username": create_user_request.username} #Sends JSON response back to client
    
# ---------------- LOGIN ----------------
@router.post("/login", response_model=Token) #create end point /login. It say the value inside Token was be str (both value). Becasue of response_model being there it removes any extra stuff before sending to frontend
async def login(login_request: LoginRequest, db=Depends(get_db)): #Create an async login function that receives validated login data and automatically gets a database connection.
    username = login_request.username #Get the username
    password = login_request.password #Get the password

    with db.cursor() as cursor: #Open a database cursor to execute SQL queries.
        cursor.execute("SELECT id, username, hashed_password FROM users WHERE username = %s", (username,)) #execute sql and get user info by matching the username
        user = cursor.fetchone() #Fetch one matching user record or None if user does not exist.

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")
        #If you can't find user info return error

    user_id = user["id"]
    db_username = user["username"]
    db_hashed_password = user["hashed_password"]
    #Extract user ID, username, and hashed password from database result.

    if not bcrypt_context.verify(password, db_hashed_password): #if the password doesn't match. 
        #bcrypt_context object from passlib.context.CrytContext. it's like toolbox for hashing.
        #.verify(password, db_hashed_password) --> This checks if the plain-text password (password from the login request) matches the hashed password stored in the database (db_hashed_password)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password") #error
    



    token = create_access_token(db_username, user_id, timedelta(minutes=20))
    #Generate a JWT access token valid for 20 minutes.
    return {"access_token": token, "token_type": "bearer"} #this create JWT to the client

