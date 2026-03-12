# main.py
from fastapi import FastAPI, Depends, status
from database import get_connection
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import HTTPException, Header
import auth 


app = FastAPI()



app.include_router(auth.router) #app.include_router(auth.router) tells FastAPI to take all the endpoints defined in the router variable inside the auth file and connect them to the main FastAPI app so they become active routes.
origins = [ 
    "http://localhost:5173", #This is hostname and tells your computer ' talk to this same machin'
    "http://127.0.0.1:5173", #This is loopback IP address It's raw ip version of localhost
]

app.add_middleware(
    CORSMiddleware,
    #Before any request reaches my routes, run it through CORS rules first.
    allow_origins=origins, #Only React running at localhost:5173 is allowed to call me.
    allow_credentials=True,
    allow_methods=["*"], #Allow all HTTP methods.
    allow_headers=["*"], #This allows headers; React needs this to send JSON data.
)

@app.get("/test-cors")
def test_cors():
    return {"message": "CORS should work"}



def get_db():
    conn = get_connection() #This function have info about database 
    try:
        yield conn
    finally:
        conn.close()
#This function is used every time you write raw sql. What it does it open connection to mysql. 
#Also, give connection to the route that requested it. FInially, it close the route so nothing get's leaked. 




class RowCreate(BaseModel): #Just say “This is what I expect the client to send me.”
    namee: str
    majorr: str
    subjectt: str



@app.post("/add-row") #Create endpoint. Post mena s sending new data to be added 
def add_row(row: RowCreate, db=Depends(get_db)): #Take the JSON body of the request, validate it using RowCreate, and give me a Python object called row
    #dp=Depends(get_db) is dependency injection. This get resuit of another function before running this. 
    print("endpoint hit", row)
    with db.cursor() as cursor: #This opens a cursor, which is a temporary object used to execute SQL commands.
        cursor.execute("INSERT INTO test_table (name, major, subject) VALUES (%s, %s, %s)", (row.namee, row.majorr, row.subjectt)) #This runs a SQL command to insert a new row into test_table.
        db.commit() #This saves the change to the database.
        row_id = cursor.lastrowid #Gets the ID of the row you just inserted (the auto-increment primary key).
    return {"status": "success", "added_row": {"id": row_id, "name": row.namee, "major": row.majorr, "subject": row.subjectt}}
    #Sends a JSON response back to the frontend.
    

@app.get("/check-db") #GET is used when the frontend wants to read data, not send new data.
def check_db(db=Depends(get_db)): # This get resuit of another function before running this. 
    with db.cursor() as cursor: #Opens a cursor for executing SQL commands.
        cursor.execute("SELECT * FROM test_table") #Executes a SQL query to select all rows and columns from test_table.
        result = cursor.fetchall()  #fetchall() gets all results from the query.
    return { 
        "status": "success",
        "rows": result
    }

#SO this runs ever time and it just standing there and says “no one can enter” (always raises 401).
#The real JWT Checks ID and look at database 

@app.get("/", status_code=status.HTTP_200_OK) 
async def get_current_user(user: None = None, db=Depends(get_db)):
    #create varible that always None. Next we provide DB connection (It's not actully used)
    if user is None:
        raise HTTPException(status_code=401, detail="Unauthorized") #There is no logged-in user
    return user #This line at this moment can never be true 
