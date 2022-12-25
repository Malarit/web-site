from fastapi import Response
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Union, Any
from jose import jwt
from config import settings


password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_hashed_password(password: str) -> str:
    return password_context.hash(password)


def verify_password(password: str, hashed_pass: str) -> bool:
    return password_context.verify(password, hashed_pass)


def create_access_token(subject: Union[str, Any], expires_delta: int = None) -> str:
    if expires_delta is not None:
        expires_delta = datetime.utcnow() + timedelta(minutes=expires_delta)
    else:
        expires_delta = datetime.utcnow(
        ) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode = {"exp": expires_delta, "sub": str(subject)}
    encoded_jwt = jwt.encode(
        to_encode, settings.JWT_SECRET_KEY, settings.ALGORITHM)
    return encoded_jwt


def create_refresh_token(subject: Union[str, Any], expires_delta: int = None) -> str:
    if expires_delta is not None:
        expires_delta = datetime.utcnow() + timedelta(minutes=expires_delta)
    else:
        expires_delta = datetime.utcnow(
        ) + timedelta(minutes=settings.REFRESH_TOKEN_EXPIRE_MINUTES)

    to_encode = {"exp": expires_delta, "sub": str(subject)}
    encoded_jwt = jwt.encode(
        to_encode, settings.JWT_REFRESH_SECRET_KEY, settings.ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str):
    try:
        token_data = jwt.decode(
            token, settings.JWT_SECRET_KEY, settings.ALGORITHM
        )
        return token_data

    except:
        return None


def decode_refresh_token(token: str):
    token_data = jwt.decode(
        token, settings.JWT_REFRESH_SECRET_KEY, settings.ALGORITHM
    )
    print(token_data)
    return token_data


def set_cookie(response: Response, obj):
    access_token = create_access_token(obj)
    refresh_token = create_refresh_token(obj)

    response.set_cookie(
        key="access_token",
        value=access_token,
        samesite='none',
        secure=True,
        domain="127.0.0.1")

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        samesite='none',
        secure=True,
        domain="127.0.0.1")
