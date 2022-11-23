from uuid import uuid4
from sqlalchemy import Column, String, Text, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from db import Base


class Product(Base):
    __tablename__ = "product"

    id = Column(Integer(), primary_key=True)
    title = Column(String(255), nullable=False)
    price = Column(Integer(), nullable=False)
    imgUrl = Column(String(255), nullable=False)
    discount = Column(Integer(), nullable=True)
    category_id = Column(Integer(), ForeignKey('category.id'))

    reviews = relationship('Reviews', backref='product_reviews')


class Category(Base):
    __tablename__ = 'category'

    id = Column(Integer, primary_key=True)
    name = Column(String(),  nullable=False)
    parent_id = Column(Integer, ForeignKey('category.id'),  nullable=True)

    parent = relationship('Category', remote_side=id, backref='subcategories')
    product = relationship(
        'Product', backref='product_category', uselist=False)


class User(Base):
    __tablename__ = "user"

    id = Column(Integer(), primary_key=True)
    login = Column(String(), nullable=False)
    email_address = Column(String(), nullable=False)
    password = Column(String(), nullable=False)
    reviews = relationship("Reviews", backref='user_reviews')


class Reviews(Base):
    __tablename__ = "reviews"

    id = Column(Integer(), primary_key=True)
    text = Column(String(), nullable=True)
    value = Column(Integer(), nullable=False, default=0)
    count = Column(Integer(), nullable=False, default=0)

    product_id = Column(Integer(), ForeignKey('product.id'), nullable=False)
    user_id = Column(Integer(), ForeignKey('user.id'), nullable=False)

