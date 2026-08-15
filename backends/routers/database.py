import pymysql
import os
from dotenv import load_dotenv
from pathlib import Path

dotenv_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path)

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = int(os.getenv("DB_PORT"))  
DB_NAME = os.getenv("DB_NAME")
#{All the code above this} Reads sensitive info (username, password, host, port, database name) from a .env file.
                         
def get_connection():
    return pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        port=DB_PORT,
        cursorclass=pymysql.cursors.DictCursor
    )
def get_db():
    conn = get_connection()
    try:
        yield conn
    finally:
        conn.close()
#whenever you want to run a raw SQL query, you call get_connection() 
#to connect to the database, run your query, then close the connection.