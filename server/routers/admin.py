from fastapi import APIRouter, Request, Depends
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from uuid import uuid4
from sqlalchemy.orm import Session
from pydantic import parse_obj_as

import models
import schemas
from db import SessionLocal, engine


models.Base.metadata.create_all(bind=engine)


router = APIRouter()


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@router.get("/api/admin", tags=["admin"])
async def root(db: Session = Depends(get_db)):
    pass


@router.get("/api/admin/category", tags=["admin"], response_model=list[schemas.category])
async def root(db: Session = Depends(get_db)):
    item = db.query(models.Category.name, models.Category.parent_id).all()
   
    return  item


@router.post("/api/admin/category", tags=["admin"])
async def root(item: schemas.category, db: Session = Depends(get_db)):

    db.add(models.Category(name=item.name, parent_id=item.parent_id))
    db.commit()

    return item
