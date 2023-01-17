import os
import hashlib
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Body, Response, Cookie
from fastapi.encoders import jsonable_encoder
from datetime import datetime
from pydantic import validate_email

import models
import schemas
from db import SessionLocal, engine
from utils import (verify_password, create_access_token,
                   decode_access_token, get_hashed_password)

models.Base.metadata.create_all(bind=engine)


router = APIRouter()


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@router.on_event("startup")
def initAdmin():
    db = SessionLocal()

    admin = {
        "username": "admin",
        "email": "admin@gmail.com",
        "password": get_hashed_password("admin"),
        "isAdmin": True
    }

    query_admin = db.query(models.User).filter(
        models.User.email == "admin@gmail.com").first()
    if not query_admin:
        db.add(models.User(**jsonable_encoder(admin)))
        db.commit()


@router.get("/api/admin", tags=["admin"])
async def root(
    admin_token: str | None = Cookie(default=None),
    db: Session = Depends(get_db)
):
    try:
        def get_user_id(id: int):
            login = db.query(models.User.id, models.User.username).filter(
                models.User.id == id).first()

            if not login:
                raise HTTPException(status_code=401, detail={
                    "details": "The user belonging to this token no logger exist"})
            return login

        if admin_token == None:
            raise HTTPException(status_code=403, detail={
                "details": "Could not validate credentials"})

        token_admin_data = decode_access_token(admin_token)

        if not token_admin_data:
            raise HTTPException(status_code=403, detail={
                "details": "Could not validate credentials or Token expired"})

        else:
            query_login = get_user_id(token_admin_data["sub"])

    except:
        raise HTTPException(status_code=403, detail={
            "details": "Could not validate credentials or Token expired"})

    return query_login.id


@router.post("/api/admin", tags=["admin"])
async def post_admin(
    response: Response,
    form_data: schemas.user,
    db: Session = Depends(get_db)
):
    query_login = db.query(models.User.username, models.User.password, models.User.id, models.User.isAdmin).filter(
        models.User.email == form_data.email).first()

    if not query_login or not verify_password(form_data.password, query_login.password):
        raise HTTPException(status_code=400, detail={
            "details": "Incorrect email or password"})

    if not query_login.isAdmin:
        raise HTTPException(status_code=400, detail={
            "details": "You are not an administrator"})

    admin_token = create_access_token(query_login["id"])

    response.set_cookie(
        key="admin_token",
        value=admin_token,
        samesite='none',
        secure=True,
        domain="localhost",
    )

    return {"Ok", 200}


@router.post("/api/admin/registration", tags=["admin"])
async def registration_admin(
    data: schemas.admin,
    db: Session = Depends(get_db),
    admin: int = Depends(root)
):
    data = dict(data)

    dataCheck = False
    for key in dict(data).keys():
        if data[key] == "":
            dataCheck = True

    if dataCheck:
        raise HTTPException(status_code=400, detail={
            "details": "values should not be empty"})

    try:
        validate_email(data["email"])
    except:
        raise HTTPException(status_code=400, detail={
            "details": "value is not a valid email address"})

    data["password"] = get_hashed_password(data["password"])

    db.add(models.User(**jsonable_encoder(data)))
    db.commit()
    return {"Ok", 200}


@router.get("/api/admin/logout", tags=["admin"])
async def logout_admin(response: Response, admin_token: str | None = Cookie(default=None),):

    response.delete_cookie(
        key="admin_token",
        samesite='none',
        secure=True,
        domain="localhost"
    )

    return {"Ok", 200}


@router.post("/api/admin/brand", tags=["admin"])
async def post_brand(title: str, db: Session = Depends(get_db), admin: int = Depends(root)):
    db.add(models.Brand(name=title))
    db.commit()

    return title


@router.post("/api/admin/category", tags=["admin"])
async def post_category(item: schemas.category, db: Session = Depends(get_db), admin: int = Depends(root)):

    db.add(models.Category(name=item.name, parent_id=item.parent_id))
    db.commit()

    return item


@router.put("/api/admin/category", tags=["admin"])
async def put_category(
    category_id: int = Body(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    admin: int = Depends(root)
):
    isImg, imgtype = file.content_type.split('/')

    if isImg != "image":
        raise HTTPException(
            status_code=422, detail="file is not a image")

    else:
        art = hashlib.md5(
            (str(datetime.now()) + file.filename).strip().encode('utf-8'))

        file_location = f"./media/category/{art.hexdigest()}.{imgtype}"

        with open(file_location, "wb+") as file_object:
            file_object.write(file.file.read())

        db.query(models.Category).filter(models.Category.id == category_id).update(
            {"url": "/api" + file_location[1:]}, synchronize_session='evaluate')

    db.commit()

    return {"Ok", 200}


@router.delete("/api/admin/category", tags=["admin"])
async def delete_category(id: int, db: Session = Depends(get_db), admin: int = Depends(root)):
    def get_list_id(array, key):
        new_list = []

        for obj in array:
            new_list.append(obj.__dict__[f"{key}"])

        return new_list

    try:
        query_category = db.query(models.Category).filter(
            models.Category.id == id).one()

        db.query(models.TopCategories).filter(
            models.TopCategories.category_id == id).delete()

        query_bannersBetween = db.query(models.BannersBetween).filter(
            models.BannersBetween.category_id == id)

        db.query(models.BannersBetweenImages).filter(
            models.BannersBetweenImages.bannersBetween_id.in_(get_list_id(query_bannersBetween.all(), "id"))).delete()

        query_bannersBetween.delete()

        try:
            url = query_category.__dict__["url"][4:]
            os.remove(os.getcwd() + f"{url}")
        except:
            pass

        db.delete(query_category)
        db.commit()

    except:
        raise HTTPException(
            status_code=422, detail="Failed to delete")

    return {"Ok", 200}


@router.post("/api/admin/product", tags=["admin"])
async def post_product(
    data: schemas.product = Body(...),
    files: list[UploadFile] = File(...),
    db: Session = Depends(get_db),
    admin: int = Depends(root)
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
async def delete_product(id: int, db: Session = Depends(get_db), admin: int = Depends(root)):
    query_product = db.query(models.Product).\
        filter(models.Product.id == id).\
        one()

    query_productImgId = db.query(models.ProductImages).\
        filter(models.ProductImages.product_id == query_product.id).all()

    db.query(models.Reviews).\
        filter(models.Reviews.product_id == query_product.id).\
        delete()

    for qp in query_productImgId:
        os.remove(os.getcwd() + f"{qp.url[4:]}")

    db.delete(query_product)
    for c in query_productImgId:
        db.delete(c)

    db.commit()


@router.put("/api/admin/product", tags=["admin"])
async def update_product(
    data: schemas.product = Body(None),
    files: list[UploadFile] = File(None),
    db: Session = Depends(get_db),
    admin: int = Depends(root)
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
async def delete_product(id: int, db: Session = Depends(get_db), admin: int = Depends(root)):
    i = db.query(models.ProductImages).filter(
        models.ProductImages.id == id).one()
    db.delete(i)
    db.commit()


@router.post("/api/admin/topCategories", tags=["admin"])
async def post_topCategories(
    category_id: str = Body(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    admin: int = Depends(root)
):

    isImg, imgtype = file.content_type.split('/')

    if isImg != "image":
        raise HTTPException(
            status_code=422, detail="file is not a image")

    else:
        art = hashlib.md5(
            (str(datetime.now()) + file.filename).strip().encode('utf-8'))

        file_location = f"./media/banners/{art.hexdigest()}.{imgtype}"

        with open(file_location, "wb+") as file_object:
            file_object.write(file.file.read())

        db.add(models.TopCategories(
            url="/api" + file_location[1:], category_id=category_id))

    db.commit()

    return {"Ok", 200}


@router.delete("/api/admin/topCategories", tags=["admin"])
async def delete_TopCategories(id: int, db: Session = Depends(get_db), admin: int = Depends(root)):

    if (not id):
        raise HTTPException(status_code=403, detail={
            "details": "Couldn't"})

    query_topCategories = db.query(models.TopCategories).filter(
        models.TopCategories.id == id).one()

    url = query_topCategories.__dict__["url"][4:]
    os.remove(os.getcwd() + f"{url}")

    db.delete(query_topCategories)
    db.commit()

    return {"Ok", 200}


@router.post("/api/admin/banners", tags=["admin"])
async def post_banners(
    name: str = Body(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    admin: int = Depends(root)
):

    isImg, imgtype = file.content_type.split('/')

    if isImg != "image":
        raise HTTPException(
            status_code=422, detail="file is not a image")

    else:
        art = hashlib.md5(
            (str(datetime.now()) + file.filename).strip().encode('utf-8'))

        file_location = f"./media/banners/{art.hexdigest()}.{imgtype}"

        with open(file_location, "wb+") as file_object:
            file_object.write(file.file.read())

        db.add(models.Banners(
            url="/api" + file_location[1:], name=name))

    db.commit()

    return {"Ok", 200}


@router.delete("/api/admin/banners", tags=["admin"])
async def delete_banners(id: int, db: Session = Depends(get_db), admin: int = Depends(root)):

    if (not id):
        raise HTTPException(status_code=403, detail={
            "details": "Couldn't"})

    query_banners = db.query(models.Banners).filter(
        models.Banners.id == id).one()

    url = query_banners.__dict__["url"][4:]
    os.remove(os.getcwd() + f"{url}")

    db.delete(query_banners)
    db.commit()

    return {"Ok", 200}


@router.post("/api/admin/bannersBetween", tags=["admin"])
async def post_banners(
    category_id: str = Body(...),
    files: list[UploadFile] = File(...),
    db: Session = Depends(get_db),
    admin: int = Depends(root)
):

    if len(files) == 0:
        raise HTTPException(
            status_code=422, detail="where is the image?")

    db.add(models.BannersBetween(category_id=category_id))
    db.commit()

    last_id = db.query(models.BannersBetween.id).\
        order_by(models.BannersBetween.id.desc()).first().id

    for file in files:

        isImg, imgtype = file.content_type.split('/')

        if isImg != "image":
            raise HTTPException(
                status_code=422, detail="file is not a image")

        else:
            art = hashlib.md5(
                (str(datetime.now()) + file.filename).strip().encode('utf-8'))

            file_location = f"./media/banners/{art.hexdigest()}.{imgtype}"

            with open(file_location, "wb+") as file_object:
                file_object.write(file.file.read())

            db.add(models.BannersBetweenImages(
                url="/api" + file_location[1:], bannersBetween_id=last_id))

    db.commit()

    return {"Ok", 200}


@router.delete("/api/admin/bannersBetween", tags=["admin"])
async def delete_banners(id: int, db: Session = Depends(get_db), admin: int = Depends(root)):

    query_bannersBetween = db.query(models.BannersBetween).filter(
        models.BannersBetween.id == id).one()

    query_img = db.query(models.BannersBetweenImages).filter(
        models.BannersBetweenImages.bannersBetween_id == query_bannersBetween.id).all()

    for qp in query_img:
        url = qp.__dict__["url"][4:]
        os.remove(os.getcwd() + f"{url}")
        db.delete(qp)

    db.delete(query_bannersBetween)
    db.commit()

    return {"Ok", 200}
