from typing import Union, Any
from datetime import datetime
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import jwt
from pydantic import ValidationError

from config import settings

reuseable_oauth = OAuth2PasswordBearer(
    tokenUrl="/api/authorization",
    scheme_name="schemas.user"
)


async def get_current_user(token: str = Depends(reuseable_oauth)):
    try:
        token_data = jwt.decode(
            token, settings.JWT_SECRET_KEY, algorithms=[settings.ALGORITHM]
        )

        if datetime.fromtimestamp(token_data["exp"]) < datetime.now():
            raise HTTPException(status_code=401, detail={
                "details": "Token expired",
                "headers": {"WWW-Authenticate": "Bearer"}})

    except (jwt.JWTError, ValidationError):
        raise HTTPException(status_code=403, detail={
            "details": "Could not validate credentials",
            "headers": {"WWW-Authenticate": "Bearer"}})

    return token_data
