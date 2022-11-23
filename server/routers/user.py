from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session


import models
from db import SessionLocal, engine
from models import Product


models.Base.metadata.create_all(bind=engine)


router = APIRouter()


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@router.get("/api/", tags=["user"])
async def root(db: Session = Depends(get_db)):

    return {"gg": "gg"}
