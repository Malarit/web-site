from fastapi import APIRouter, Depends, Query, HTTPException, Response, Cookie
from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder
from pydantic import validate_email
from sqlalchemy import func


import models
import schemas
from utils import (get_hashed_password, verify_password, create_access_token,
                   create_refresh_token, decode_access_token, decode_refresh_token,
                   set_cookie)
from db import SessionLocal, engine


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


@router.post("/api/authorization", tags=["user"])
async def authorization(
    response: Response,
    form_data: schemas.user,
    db: Session = Depends(get_db)
):

    query_login = db.query(models.User.username, models.User.password, models.User.id).filter(
        models.User.email == form_data.email).first()

    if not query_login or not verify_password(form_data.password, query_login.password):
        raise HTTPException(status_code=400, detail={
            "details": "Incorrect email or password"})

    set_cookie(response, query_login['id'])

    return {"Ok": 200}


@router.get('/api/me', tags=["user"])
async def get_me(
    response: Response,
    access_token: str | None = Cookie(default=None),
    refresh_token: str | None = Cookie(default=None),
    db: Session = Depends(get_db)
):

    def get_user_id(id: int):
        login = db.query(models.User.id, models.User.username).filter(
            models.User.id == id).first()

        if not login:
            raise HTTPException(status_code=401, detail={
                "details": "The user belonging to this token no logger exist"})
        return login

    if access_token == None or refresh_token == None:
        raise HTTPException(status_code=403, detail={
            "details": "Could not validate credentials"})

    token_access_data = decode_access_token(access_token)

    if not token_access_data:
        token_refresh_data = decode_refresh_token(refresh_token)
        if not token_refresh_data:
            raise HTTPException(status_code=403, detail={
                "details": "Could not validate credentials or Token expired"})

        query_login = get_user_id(token_refresh_data["sub"])

        set_cookie(response, query_login['id'])

    else:
        query_login = get_user_id(token_access_data["sub"])

    return query_login


@router.post("/api/registration", tags=["user"])
async def add_user(data: schemas.registration, db: Session = Depends(get_db)):
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

    query_check_login = db.query(models.User.username).filter(
        models.User.username == data["username"]).first() != None
    query_check_email = db.query(models.User.email).filter(
        models.User.email == data["email"]).first() != None

    if query_check_login or query_check_email:

        lineLogin = query_check_login and 'login already exists, ' or ""
        lineRmail = query_check_email and 'email already exists' or ""

        raise HTTPException(status_code=400, detail={
            "details": lineLogin + lineRmail,
            "login": query_check_login,
            "email": query_check_email
        })

    data["password"] = get_hashed_password(data["password"])
    del data["secondPassword"]

    db.add(models.User(**jsonable_encoder(data)))
    db.commit()

    return {"Ok": 200}


@router.get("/api/logout", tags=["user"])
async def logout(response: Response,):
    try:
        response.delete_cookie(
            key="access_token",
            samesite='none',
            secure=True,
            domain="127.0.0.1")
        response.delete_cookie(
            key="refresh_token",
            samesite='none',
            secure=True,
            domain="127.0.0.1")
    except:
        raise HTTPException(status_code=400, detail={
            "details": "Failed to logout"})

    return {"Ok": 200}


@router.get("/api/reviews", tags=["user"])
async def add_reviews(
    id: int = Query(..., description="product_id"),
    user_id: int = Query(None),
    db: Session = Depends(get_db)
):
    try:
        def get_list_id(array, key):
            new_list = []

            for obj in array:
                new_list.append(obj.__dict__[key])

            return new_list

        query_reviews = db.query(models.Reviews).filter(
            models.Reviews.product_id == id).all()

        query_user = db.query(models.User.username, models.User.id).filter(
            models.User.id.in_(get_list_id(query_reviews, "user_id"))).all()

        query_assessment = db.query(models.Assessment).filter(
            models.Assessment.reviews_id.in_(get_list_id(query_reviews, "id")))

        if (user_id):
            query_likeIt = db.query(models.Assessment.likeIt, models.Assessment.reviews_id).filter(
                models.Assessment.user_id == user_id)

        reviews = []

        for qr in query_reviews:
            for qu in query_user:
                if (qu["id"] == qr.__dict__["user_id"]):
                    reviews.append(
                        {**qr.__dict__, "username": qu["username"], "like": 0, "dislike": 0})

        for re in reviews:
            for qa in query_assessment:
                if (qa.__dict__["reviews_id"] == re["id"]):
                    if (qa.__dict__["likeIt"]):
                        re["like"] += 1
                    else:
                        re["dislike"] += 1

            if (user_id):
                for ql in query_likeIt:
                    if (ql["reviews_id"] == re["id"]):
                        re["likeIt"] = ql["likeIt"]

    except:
        raise HTTPException(status_code=403, detail={
            "details": ""})

    return reviews


@router.post("/api/reviews", tags=["user"])
async def add_reviews(data: schemas.reviews, db: Session = Depends(get_db)):

    query_review = db.query(models.Reviews).filter(
        models.Reviews.product_id == data.product_id,
        models.Reviews.user_id == data.user_id).\
        first()

    if (not query_review):
        db.add(models.Reviews(**jsonable_encoder(data)))
        db.commit()

    return {"Ok": 200}


@router.get("/api/review", tags=["user"])
async def add_reviews(product_id: int, user_id: int, db: Session = Depends(get_db)):

    try:
        query_review = db.query(models.Reviews).filter(
            models.Reviews.product_id == product_id, models.Reviews.user_id == user_id).one()

        query_assessment = db.query(models.Assessment).filter(
            models.Assessment.reviews_id == query_review.__dict__["id"]).all()

        likes = {"like": 0, "dislike": 0}
        for qa in query_assessment:
            if (qa.__dict__["likeIt"]):
                likes["like"] += 1
            else:
                likes["dislike"] += 1

    except:
        raise HTTPException(status_code=403, detail={
            "details": "Couldn't find a review"})

    return {**query_review.__dict__, **likes}


@router.get("/api/assessment", tags=["user"])
async def add_reviews(reviews_id: int, user_id: int, db: Session = Depends(get_db)):

    query_likeIt = db.query(models.Assessment.likeIt).filter(
        models.Reviews.id == reviews_id, models.User.id == user_id)

    return query_likeIt


@router.post("/api/assessment", tags=["user"])
async def add_reviews(data: schemas.assessment, db: Session = Depends(get_db)):

    query_assessment = db.query(models.Assessment).\
        filter(models.Assessment.user_id == data.user_id,
               models.Assessment.reviews_id == data.reviews_id)

    if (query_assessment.first()):
        likeIt = query_assessment.first().__dict__["likeIt"]

        if (likeIt == data.likeIt):
            query_assessment.delete()
        else:
            query_assessment.update({"likeIt": data.likeIt})
    else:
        db.add(models.Assessment(**jsonable_encoder(data)))

    db.commit()

    return {"Ok": 200}


@router.get("/api/category", tags=["user"])
async def get_category(db: Session = Depends(get_db)):
    item = []
    countTree = db.query(models.Category).\
        filter(models.Category.parent_id == None).\
        order_by(models.Category.tree_id).\
        all()

    for c in countTree:
        item.append(db.query(models.Category).
                    filter(models.Category.tree_id == c.tree_id).
                    order_by(models.Category.left).
                    all())

    return item


@router.get("/api/brand", tags=["user"])
async def get_category(db: Session = Depends(get_db)):
    brand = db.query(models.Brand).all()

    return brand


@router.get("/api/product", tags=["user"])
async def get_product(
    left: int = Query(None, description="category nested sets"),
    right: int = Query(None, description="category nested sets"),
    tree_id: int = Query(None, description="main category"),
    discount: int = Query(
        0, description="filter product.discount >= discount"),
    limit: int = Query(None),
    page: int = Query(None),
    brand_id: str = Query(None),
    priceL: int = Query(None),
    priceR: int = Query(None),
    db: Session = Depends(get_db)
):

    def get_list_id(array):
        new_list = []

        for obj in array:
            new_list.append(obj.id)

        return new_list

    if not (limit and page):
        offest = 0
    else:
        offest = (limit * page)

    if left and right and tree_id:
        query_category = db.query(models.Category.id).\
            filter(models.Category.tree_id == tree_id,
                   models.Category.left >= left,
                   models.Category.right <= right
                   ).\
            all()
    else:
        query_category = db.query(models.Category.id).all()

    countPage = db.query(models.Product).\
        filter(models.Product.category_id.in_(get_list_id(query_category)),
               models.Product.discount >= discount).with_entities(func.count()).scalar()

    productFilter = []
    if (brand_id):
        productFilter.append(models.Product.brand_id == brand_id)
    if (priceL and priceR):
        productFilter.append(models.Product.price >= (priceL or 0))
        productFilter.append(models.Product.price <= (priceR or 0))

    query_product = db.query(models.Product).\
        filter(
            models.Product.category_id.in_(get_list_id(query_category)),
            models.Product.discount >= discount, *productFilter).\
        order_by(models.Product.id).\
        limit(limit).\
        offset(offest).\
        all()

    query_imgUrl = db.query(models.ProductImages.id,
                            models.ProductImages.url,
                            models.ProductImages.product_id
                            ).\
        filter(models.ProductImages.product_id.in_(get_list_id(query_product))).\
        all()

    query_reviews = db.query(models.Reviews.value, models.Reviews.product_id).\
        filter(models.Reviews.product_id.in_(get_list_id(query_product))).\
        all()

    query_brand = db.query(models.Brand.id, models.Brand.name).all()

    product_list = []
    for qp in query_product:
        id_brand = qp.__dict__["brand_id"]

        del qp.__dict__["brand_id"]

        product_list.append({**qp.__dict__, "imgUrl": [],
                            "rating": {"value": 0, "count": 0}, "brand": {"id": id_brand}})

    for pl in product_list:
        for qi in query_imgUrl:
            if pl["id"] == qi.product_id:
                pl["imgUrl"].append({"id": qi["id"], "url": qi["url"]})

        for qr in query_reviews:
            if pl["id"] == qr.product_id:
                pl["rating"]["value"] += qr.value
                pl["rating"]["count"] += 1

        for qb in query_brand:
            if pl["brand"]["id"] == qb.id:
                pl["brand"] = {"id": pl["brand"]["id"], "name": qb.name}

    return {"item": product_list, "pages": round(countPage / (limit or 1))}
