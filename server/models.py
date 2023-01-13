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
    url = Column(String(), nullable=True)

    product = relationship('Product', backref='category_product')
    topCategories = relationship(
        'TopCategories', backref='category_topCategories')
    bannersBetween = relationship(
        'BannersBetween', backref='category_bannersBetween')

    def __repr__(self):
        return "<Node (%s)>" % self.id


class User(Base):
    __tablename__ = "user"

    id = Column(Integer(), primary_key=True)
    username = Column(String(32), nullable=False)
    email = Column(String(32), nullable=False)
    password = Column(String(128), nullable=False)
    isAdmin = Column(Boolean, default=False)

    reviews = relationship("Reviews", backref='user_reviews')
    favourite = relationship("Favourite", backref='user_favourite')
    orders = relationship("Orders", backref='user_orders')
    oldOrders = relationship("OldOrders", backref='user_oldOrders')


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


class Favourite(Base):
    __tablename__ = "favourite"

    id = Column(Integer(), primary_key=True)

    product_id = Column(Integer(), ForeignKey('product.id'), nullable=False)
    user_id = Column(Integer(), ForeignKey('user.id'), nullable=False)


class Banners(Base):
    __tablename__ = "banners"

    id = Column(Integer(), primary_key=True)
    name = Column(String(),  nullable=False)
    url = Column(String(),  nullable=False)


class TopCategories(Base):
    __tablename__ = "topCategories"

    id = Column(Integer(), primary_key=True)
    url = Column(String(),  nullable=False)
    category_id = Column(Integer(), ForeignKey('category.id'), nullable=False)


class BannersBetween(Base):
    __tablename__ = "bannersBetween"

    id = Column(Integer(), primary_key=True)
    category_id = Column(Integer(), ForeignKey('category.id'), nullable=False)

    bannersBetween = relationship(
        'BannersBetweenImages', backref='BannersBetween_images')


class BannersBetweenImages(Base):
    __tablename__ = "BannersBetweenImages"

    id = Column(Integer(), primary_key=True)
    url = Column(String(),  nullable=False)

    bannersBetween_id = Column(
        Integer(), ForeignKey('bannersBetween.id'), nullable=False)


class Orders(Base):
    __tablename__ = "orders"

    id = Column(Integer(), primary_key=True)
    user_id = Column(Integer(), ForeignKey('user.id'), nullable=True)
    street = Column(String(), nullable=False)
    house = Column(String(), nullable=False)
    flat = Column(String(), nullable=False)
    phoneNumber = Column(String(), nullable=False)
    totalPrice = Column(Integer(), nullable=False)


class OrderProduct(Base):
    __tablename__ = "orderProduct"

    id = Column(Integer(), primary_key=True)
    order_id = Column(Integer(), ForeignKey('orders.id'), nullable=False)
    product_id = Column(Integer(), ForeignKey('product.id'), nullable=False)
    count = Column(Integer(), nullable=False)


class OldOrders(Base):
    __tablename__ = "oldOrders"

    id = Column(Integer(), primary_key=True)
    user_id = Column(Integer(), ForeignKey('user.id'), nullable=False)
    product_id = Column(Integer(), ForeignKey('product.id'), nullable=False)


class Mailing(Base):
    __tablename__ = "mailing"

    id = Column(Integer(), primary_key=True)
    email = Column(String(), nullable=False)
