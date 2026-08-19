import os
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from passlib.context import CryptContext
from jose import jwt
from mysql.connector import IntegrityError

from routers.database import get_db
from routers.models import CreateUserRequest, LoginRequest, Token

router = APIRouter(prefix="/auth", tags=["auth"])


# Get the secret key from an environment variable.
SECRET_KEY = os.getenv("SECRET_KEY")

if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY environment variable is not set")


ALGORITHM = "HS256"

bcrypt_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def create_access_token(
    username: str,
    user_id: int,
    expires_delta: timedelta
):
    expire = datetime.now(timezone.utc) + expires_delta

    to_encode = {
        "sub": str(user_id),
        "username": username,
        "exp": expire
    }

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


# ---------------- SIGNUP ----------------

@router.post(
    "/signup",
    status_code=status.HTTP_201_CREATED
)
async def create_user(
    create_user_request: CreateUserRequest,
    db=Depends(get_db)
):
    password = str(create_user_request.password)

    # bcrypt only supports passwords up to 72 bytes.
    # Reject instead of silently cutting the password.
    if len(password.encode("utf-8")) > 72:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be 72 bytes or fewer"
        )

    hashed_password = bcrypt_context.hash(password)

    try:
        with db.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO users (username, hashed_password)
                VALUES (%s, %s)
                """,
                (
                    create_user_request.username,
                    hashed_password
                )
            )

            db.commit()

            user_id = cursor.lastrowid

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username already exists"
        )

    return {
        "id": user_id,
        "username": create_user_request.username
    }


# ---------------- LOGIN ----------------

@router.post(
    "/login",
    response_model=Token
)
async def login(
    login_request: LoginRequest,
    db=Depends(get_db)
):
    username = login_request.username
    password = login_request.password

    with db.cursor() as cursor:
        cursor.execute(
            """
            SELECT id, username, hashed_password
            FROM users
            WHERE username = %s
            """,
            (username,)
        )

        user = cursor.fetchone()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )

    user_id = user["id"]
    db_username = user["username"]
    db_hashed_password = user["hashed_password"]

    if not bcrypt_context.verify(
        password,
        db_hashed_password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )

    token = create_access_token(
        db_username,
        user_id,
        timedelta(minutes=20)
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user_id": user_id,
        "username": db_username
    }