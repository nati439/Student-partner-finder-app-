# from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
# from fastapi.staticfiles import StaticFiles
# import pymysql.cursors
# import shutil

# from database import get_db
# from models import FullPayload


# router = APIRouter(tags=["users"])


# @router.post("/tinder", status_code=201)
# def save_profile(payload: FullPayload, db=Depends(get_db)):
#     sql = """
#         INSERT INTO user_info (pfp, username, college, year, major, subject, note, day, `time`, contact)
#         VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
#     """
#     values = (
#         payload.user.pfp,
#         payload.user.username,
#         payload.user.college,
#         payload.user.year,
#         payload.subject.major,
#         payload.subject.subject,
#         payload.subject.note,
#         payload.time.day,
#         str(payload.time.time),
#         payload.time.contact
#     )

#     try:
#         with db.cursor() as cursor:
#             cursor.execute(sql, values)
#             db.commit()
#         return {"message": "Created successfully"}
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=f"DB Error: {e}")


# @router.get("/retrieve")
# def retrieve_all(db=Depends(get_db)):
#     try:
#         with db.cursor(pymysql.cursors.DictCursor) as cursor:
#             cursor.execute("SELECT pfp, username, college, year FROM user_info")
#             results = cursor.fetchall()
#         return {"users": results}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


# @router.get("/users/{name}")
# def get_user(name: str, db=Depends(get_db)):
#     with db.cursor(pymysql.cursors.DictCursor) as cursor:
#         cursor.execute("SELECT * FROM user_info WHERE username = %s", (name,))
#         result = cursor.fetchone()
#     return result


# @router.post("/upload/")
# async def upload_image(file: UploadFile = File(...)):
#     file_path = f"images/{file.filename}"
#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)
#     return {"url": f"http://127.0.0.1:8000/images/{file.filename}"}