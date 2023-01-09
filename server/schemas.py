import json
from fastapi import HTTPException, Query
from typing import Optional
from pydantic import BaseModel, UUID4, validator, Field


class category(BaseModel):
    name: str
    parent_id: Optional[int] = None


class user(BaseModel):
    email: str
    password: str


class registration(user):
    username: str
    secondPassword: str

    @validator('secondPassword')
    def passwords_match(cls, v, values, **kwargs):
        if 'firstPassword' in values and v != values['firstPassword']:
            raise HTTPException(status_code=400, detail={
                                "details": "passwords do not match", "firstPassword": False})
        return v


class reviews(BaseModel):
    text: str
    product_id: int
    user_id: int
    value: int = Field(0, gt=-1, lt=6)


class product(BaseModel):
    title: str
    price: int
    discount: int = Field(None, gt=-1, lt=101)
    category_id: int
    brand_id: int
    packaging: str
    description: str
    weight: int

    @classmethod
    def __get_validators__(cls):
        yield cls.validate_to_json

    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value


class assessment(BaseModel):
    likeIt: bool
    reviews_id: int
    user_id: int


class favourite(BaseModel):
    user_id: int
    product_id: int
