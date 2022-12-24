import os
import hashlib
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Body
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Optional

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


# response_model= list[list[schemas.category]]


@router.post("/api/admin/category", tags=["admin"])
async def post_category(item: schemas.category, db: Session = Depends(get_db)):

    db.add(models.Category(name=item.name, parent_id=item.parent_id))
    db.commit()

    return item


@router.delete("/api/admin/category", tags=["admin"])
async def delete_category(id: int, db: Session = Depends(get_db)):
    i = db.query(models.Category).filter(
        models.Category.id == id).one()
    db.delete(i)
    db.commit()


@router.post("/api/admin/product", tags=["admin"])
async def post_product(
    data: schemas.product = Body(...),
    files: list[UploadFile] = File(...),
    db: Session = Depends(get_db)
):

    if len(files) == 0:
        raise HTTPException(
            status_code=422, detail="where is the image?")

    db.add(models.Product(**jsonable_encoder(data)))
    db.commit()

    product_last_id = db.query(models.Product.id).\
        order_by(models.Product.id.desc()).first().id

    for file in files:

        isImg, imgtype = file.content_type.split('/')

        if isImg != "image":
            raise HTTPException(
                status_code=422, detail="file is not a image")

        else:
            art = hashlib.md5(
                (str(datetime.now()) + file.filename).strip().encode('utf-8'))

            file_location = f"./media/product/{art.hexdigest()}.{imgtype}"

            with open(file_location, "wb+") as file_object:
                file_object.write(file.file.read())

            db.add(models.ProductImages(
                url="/api" + file_location[1:], product_id=product_last_id))

    db.commit()

    return data, files


@router.delete("/api/admin/product", tags=["admin"])
async def delete_product(id: int, db: Session = Depends(get_db)):
    query_product = db.query(models.Product).\
        filter(models.Product.id == id).\
        one()

    query_productImgId = db.query(models.ProductImages).\
        filter(models.ProductImages.product_id == query_product.id).all()

    db.query(models.Reviews).\
        filter(models.Reviews.product_id == query_product.id).\
        delete()

    for qp in query_productImgId:
        os.remove(os.getcwd() + f"{qp.url[4:]}".replace('/', '\\'))

    db.delete(query_product)
    for c in query_productImgId:
        db.delete(c)

    db.commit()


@router.put("/api/admin/product", tags=["admin"])
async def update_product(
    data: schemas.product = Body(None),
    files: list[UploadFile] = File(None),
    db: Session = Depends(get_db)
):

    data = jsonable_encoder(data)
    id = data["id"]
    del data["id"]

    db.query(models.Product).filter(
        models.Product.id == id).update({**data}, synchronize_session='evaluate')

    for file in files:

        isImg, imgtype = file.content_type.split('/')

        if isImg != "image":
            raise HTTPException(
                status_code=422, detail="file is not a image")

        else:
            art = hashlib.md5(
                (str(datetime.now()) + file.filename).strip().encode('utf-8'))

            file_location = f"./media/product/{art.hexdigest()}.{imgtype}"

            with open(file_location, "wb+") as file_object:
                file_object.write(file.file.read())

            db.add(models.ProductImages(
                url="/api" + file_location[1:], product_id=id))

    db.commit()

    return data, files


@router.delete("/api/admin/product/image", tags=["admin"])
async def update_product(id: int, db: Session = Depends(get_db)):
    i = db.query(models.ProductImages).filter(
        models.ProductImages.id == id).one()
    db.delete(i)
    db.commit()
