#create endpoint 
#check if the formate is 
#Get date from the frontend and sent it to database that main goal 
import pymysql.cursors
from fastapi import APIRouter, Depends, HTTPException, status, FastAPI, UploadFile, File
from datetime import timedelta, datetime
from database import get_db
from pydantic import BaseModel
from models import FullPayload
from database import get_connection
from fastapi import HTTPException 
from fastapi.middleware.cors import CORSMiddleware
import shutil
#Turns a normal folder into something a browser can access.
import os
from fastapi.staticfiles import StaticFiles


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for testing only
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    conn = get_connection() #This function have info about database 
    try:
        yield conn
    finally:
        conn.close()


@app.post("/tinder", status_code=201)
def tinders (payload: FullPayload, db=Depends(get_db)):
    sql = """ 
        INSERT INTO user_info (pfp, username, college, year, major, subject, note, day, `time`, contact)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    values = (
        payload.user.pfp,
        payload.user.username,
        payload.user.college,
        payload.user.year,
        payload.subject.major,
        payload.subject.subject,
        payload.subject.note,
        payload.time.day,
        str(payload.time.time),
        payload.time.contact
    )
    print("RECEIVED PAYLOAD:", payload)
    print("USER:", payload.user)
    print("PF:", payload.user.pfp)
    print("USERNAME:", payload.user.username)
        
    # try:
    #     print("Values going into DB:", values)
    #     db.execute(sql, values)
    #     db.commit()
    #     print("Commit done")
    #     return {"Messege": "Created successfully"}
    # except:
    #     raise HTTPException(
    #         status_code=400,
    #         detail="Your request doesn't make sense"
            
    #     )
    try:
        cursor = db.cursor()
        cursor.execute(sql, values)
        db.commit()
        cursor.close()
        return {"message": "Created successfully"}
    except Exception as e: #Catches any error that happened inside the try block.
        print("MySQL Error:", e)
        raise HTTPException(status_code=400, detail=f"DB Error: {e}")


# This endpoint connects your frontend to your database by retrieving user data and sending it as JSON so your React app can display it as cards.
@app.get("/retrieve")
def retrieve(db=Depends(get_db)):
    try:
        with db.cursor(pymysql.cursors.DictCursor) as cursor:
            #db.cursor let's you talk to DB
            #Normally mysql returns like ("John", "KU", 2)
            #With pymysql.cursors.DictCursor turns into {"username": "John", "college":"KU", "year":2}. so it create dictionary
            sql = "SELECT pfp, username, college, year FROM user_info"
            cursor.execute(sql)
            results = cursor.fetchall()
            #Get all rows returned from the query
            
        return {"users": results}
        #this is what the frontend reads make everything value of "users"
        
    except Exception as e:
        print(f"DATABASE ERROR: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    
app.mount("/images", StaticFiles(directory="images"), name="images")
#exposes your local uploads folder as a public URL path so users (and your frontend) can access uploaded files through the browser.
@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    #file --> This is just the parameter name, it's what your function receives
    #uploadfile --> This parameter will be an uploaded file.
    # File(...) is what makes FastAPI treat this parameter as an uploaded file
    # The ... means required
    file_path = f"images/{file.filename}"
    #the original filename provided by the client
    with open(file_path, "wb") as buffer:
        #This creates a file at that location (if it doesn’t exist)
        #with auto close file 
        #wb --> “Open this file for writing in binary mode.” why bc image and videos and pdf aren't text 
        shutil.copyfileobj(file.file, buffer)
        #shutil.copyfileobj --> transfers data:
        #Copies data from the uploaded file into your local file.
        #file.file → the uploaded file stream (coming from the user)
        #buffer → A buffer is a temporary place where data is held before being processed or saved.

    return {"url": f"http://127.0.0.1:8000/images/{file.filename}"}


@app.get("/users/{name}")
#/users/john or nati or anything 
#the frontend tells it what user it want. 
def getdata(name, db=Depends(get_db)):
    with db.cursor(pymysql.cursors.DictCursor) as cursor: 
        sqls = "SELECT * from user_info where username = %s"
        cursor.execute(sqls, (name,))
        #need "," to make value tuple. 
        result = cursor.fetchone()

    return result 
        
@app.get("/matching/{major}")
def matching(major, db=Depends(get_db)):
    with db.cursor(pymysql.cursors.DictCursor) as cursor:
         sqls = "SELECT * from user_info where major = %s LIMIT 20" #limit to only 20 users
         cursor.execute(sqls, (major,))
        #need "," to make value tuple. 
         result = cursor.fetchall()
         #result = cursor.fetchall() return mulitple people not only one person 

    return {"users": result}


#/images is folder that when user visit /images it just give them specific file inside it, it doesn't run the code.
# StaticFiles = the engine that knows how to serve files
# app.mount() = the connector that attaches that engine to a URL
# directory="images" tells FastAPI where the files are
# name="images" is just a label for FastAPI’s internal use (optional)