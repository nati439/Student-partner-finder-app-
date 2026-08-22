from fastapi import APIRouter, Depends, HTTPException, status
import pymysql.cursors

from routers.database import get_db


router = APIRouter(prefix="/matching", tags=["matching"])


# @router.get("/{major}")
# def get_matching_people(major: str, db=Depends(get_db)):
#     with db.cursor(pymysql.cursors.DictCursor) as cursor:
#         sql = "SELECT * FROM user_info WHERE major = %s LIMIT 20"
#         cursor.execute(sql, (major,))
#         result = cursor.fetchall()

#     return {"users": result}

@router.get("/{major}/{user_id}")
def get_matching_people(major: str, user_id: int, db=Depends(get_db)):
    with db.cursor(pymysql.cursors.DictCursor) as cursor:
        sql = "SELECT * FROM user_info WHERE major = %s AND user_id != %s LIMIT 20"
        cursor.execute(sql, (major, user_id))
        result = cursor.fetchall()

    return {"users": result}