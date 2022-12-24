from fastapi import APIRouter, Depends, Query, HTTPException, Response
from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder
from pydantic import validate_email
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_jwt_auth import AuthJWT

import models
import schemas
from deps import get_current_user
from utils import get_hashed_password, verify_password, create_access_token, create_refresh_token
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


@router.get('/api/me', tags=["user"])
async def get_me(user: schemas.user = Depends(get_current_user)):
    return user


@router.post("/api/authorization", tags=["user"])
async def authorization_user(
    response: Response,
    form_data: schemas.user,
    Authorize: AuthJWT = Depends(),
    db: Session = Depends(get_db)
):

    query_login = db.query(models.User.username, models.User.password, models.User.id).filter(
        models.User.username == form_data.username).first()

    if not query_login or not verify_password(form_data.password, query_login.password):
        raise HTTPException(status_code=400, detail={
            "details": "Incorrect email or password"})

    access_token = create_access_token(query_login['id'])
    
    authjwt_token_location: set = {"cookies"}
    
    Authorize.set_access_cookies(access_token)
    
    return {
        "access_token": access_token,
        "refresh_token": create_refresh_token(query_login['id']),
    }


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


@router.post("/api/reviews", tags=["user"])
async def add_reviews(data: schemas.reviews, db: Session = Depends(get_db)):

    db.add(models.Reviews(**jsonable_encoder(data)))
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


@router.get("/api/product", tags=["user"])
async def get_product(
    left: int = Query(None, description="category nested sets"),
    right: int = Query(None, description="category nested sets"),
    tree_id: int = Query(None, description="main category"),
    discount: int = Query(
        0, description="filter product.discount >= discount"),
    db: Session = Depends(get_db)
):
    def get_list_id(array):
        new_list = []

        for obj in array:
            new_list.append(obj.id)

        return new_list

    if left and right and tree_id:
        query_category = db.query(models.Category.id).\
            filter(models.Category.tree_id == tree_id,
                   models.Category.left >= left,
                   models.Category.right <= right
                   ).\
            all()
    else:
        query_category = db.query(models.Category.id).all()

    query_product = db.query(models.Product).\
        filter(models.Product.category_id.in_(get_list_id(query_category)),
               models.Product.discount >= discount).\
        order_by(models.Product.id).\
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

    product_list = []
    for qp in query_product:
        product_list.append({**qp.__dict__, "imgUrl": [],
                            "rating": {"value": 0, "count": 0}})

    for pl in product_list:
        for qi in query_imgUrl:
            if pl["id"] == qi.product_id:
                pl["imgUrl"].append({"id": qi["id"], "url": qi["url"]})

        for qr in query_reviews:
            if pl["id"] == qr.product_id:
                pl["rating"]["value"] += qr.value
                pl["rating"]["count"] += 1

    return product_list
