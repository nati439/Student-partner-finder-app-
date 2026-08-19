from fastapi import APIRouter
from fastapi.responses import JSONResponse
from typing import Dict
import asyncio

from routers.database import get_db
from fastapi import Depends


router = APIRouter(tags=["swipes"])

user_queues: Dict[int, asyncio.Queue] = {}

@router.get("/poll/{user_id}")
async def long_poll(user_id: int):
    if user_id not in user_queues:
        user_queues[user_id] = asyncio.Queue()

    try:
        message = await asyncio.wait_for(user_queues[user_id].get(), timeout=30)
        return JSONResponse({"status": "ok", "data": message})
    except asyncio.TimeoutError:
        return JSONResponse({"status": "timeout", "data": None})

@router.post("/swipe")
async def swipe(payload: dict, db=Depends(get_db)):
    swiper_id = payload["swiper_id"]
    swiped_id = payload["swiped_id"]
    direction = payload["direction"]

    with db.cursor() as cursor:
        cursor.execute(
            "INSERT INTO swipes (swiper_id, swiped_id, direction) VALUES (%s, %s, %s)",
            (swiper_id, swiped_id, direction)
        )
        db.commit()

        cursor.execute(
            "SELECT * FROM swipes WHERE swiper_id = %s AND swiped_id = %s AND direction = 'right'",
            (swiped_id, swiper_id)
        )
        match = cursor.fetchone()

    if match:
        for uid in [swiper_id, swiped_id]:
            if uid in user_queues:
                await user_queues[uid].put({
                    "type": "match",
                    "with": swiped_id if uid == swiper_id else swiper_id
                    
                })

    return {"status": "ok", "match": bool(match)}