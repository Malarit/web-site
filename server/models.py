import datetime
from uuid import uuid4
from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy_mptt.mixins import BaseNestedSets

from db import Base


class Product(Base):
    __tablename__ = "product"

    id = Column(Integer(), primary_key=True)
    title = Column(String(255), nullable=False)
    price = Column(Integer(), nullable=False)
    discount = Column(Integer(), nullable=True)
    packaging = Column(String(), nullable=True)
    description = Column(String(), nullable=True)
    weight = Column(Integer(), nullable=True)
    brand_id = Column(Integer(),  ForeignKey('brand.id'))
    category_id = Column(Integer(), ForeignKey('category.id'))

    reviews = relationship('Reviews', backref='product_reviews')
    productImages = relationship('ProductImages', backref='product_images')


class Brand(Base):
    __tablename__ = "brand"

    id = Column(Integer(), primary_key=True)
    name = Column(String(255), nullable=False)

    product = relationship('Product', backref='brand_product')


class ProductImages(Base):
    __tablename__ = "product_images"
    id = Column(Integer(), primary_key=True)
    url = Column(String(), nullable=False)
    product_id = Column(Integer(), ForeignKey('product.id'), nullable=False)


class Category(Base, BaseNestedSets):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True)
    name = Column(String(), nullable=False)
    visible = Column(Boolean)

    product = relationship('Product', backref='category_product')

    def __repr__(self):
        return "<Node (%s)>" % self.id


class User(Base):
    __tablename__ = "user"

    id = Column(Integer(), primary_key=True)
    username = Column(String(32), nullable=False)
    email = Column(String(32), nullable=False)
    password = Column(String(128), nullable=False)

    reviews = relationship("Reviews", backref='user_reviews')


class Reviews(Base):
    __tablename__ = "reviews"

    id = Column(Integer(), primary_key=True)
    text = Column(String(), nullable=True)
    value = Column(Integer(), nullable=False)
    date = Column(DateTime(timezone=True), default=datetime.datetime.today())

    product_id = Column(Integer(), ForeignKey('product.id'), nullable=False)
    user_id = Column(Integer(), ForeignKey('user.id'), nullable=False)


class Assessment(Base):
    __tablename__ = "assessment"

    id = Column(Integer(), primary_key=True)
    likeIt = Column(Boolean(), nullable=False)

    reviews_id = Column(Integer(), ForeignKey('product.id'), nullable=False)
    user_id = Column(Integer(), ForeignKey('user.id'), nullable=False)
