import React from "react";

import Header from "../components/header";
import Slider from "../components/banner/slider";
import Category from "../components/category";
import Offers from "../components/product/offers";
import Banner from "../components/banner";
import Subscribe from "../components/subscribe";
import Footer from "../components/footer";

import appStyle from "../app.module.scss";

import OffersImg from "../assets/offers/offers.webp";
import cardImg from "../assets/product/q.webp";
import bannerTable from "../assets/banner/b3.webp";
import bannerPhone from "../assets/banner/b3-2.webp";
import categoryImg1 from "../assets/category/milk.webp";
import categoryImg2 from "../assets/category/meat.webp";
import sliderImg from "../assets/banner/b.webp";
import sliderImg2 from "../assets/banner/b2.webp";

import "react-alice-carousel/lib/scss/alice-carousel.scss";
import "../components/carousel/carousel.scss";

const sliderList = [
  sliderImg,
  sliderImg2,
  sliderImg,
  sliderImg2,
  sliderImg,
  sliderImg2,
  sliderImg,
];

const cardListSale = [
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 3, count: 20 },
    discount: 30,
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 3, count: 20 },
    discount: 30,
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 3, count: 20 },
    discount: 30,
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 3, count: 20 },
    discount: 30,
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 3, count: 20 },
    discount: 30,
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 3, count: 20 },
    discount: 30,
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 3, count: 20 },
    discount: 30,
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 3, count: 20 },
    discount: 30,
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 3, count: 20 },
    discount: 30,
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 3, count: 20 },
    discount: 30,
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 3, count: 20 },
    discount: 30,
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 3, count: 20 },
    discount: 30,
  },
];

const cardList = [
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 5, count: 20 },
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 5, count: 20 },
    discount: 30,
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 5, count: 20 },
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 5, count: 20 },
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 5, count: 20 },
    discount: 30,
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 5, count: 20 },
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 5, count: 20 },
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 5, count: 20 },
    discount: 30,
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 5, count: 20 },
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 5, count: 20 },
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 5, count: 20 },
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 5, count: 20 },
  },
];

const categoryList = [
  { imgUrl: categoryImg1, title: "Молоко, сыр, яйцо" },
  { imgUrl: categoryImg2, title: "Мясо, птица, колбасы" },
  { imgUrl: categoryImg1, title: "Молоко, сыр, яйцо" },
  { imgUrl: categoryImg2, title: "Мясо, птица, колбасы" },
  { imgUrl: categoryImg1, title: "Молоко, сыр, яйцо" },
  { imgUrl: categoryImg2, title: "Мясо, птица, колбасы" },
  { imgUrl: categoryImg1, title: "Молоко, сыр, яйцо" },
  { imgUrl: categoryImg2, title: "Мясо, птица, колбасы" },
  { imgUrl: categoryImg1, title: "Молоко, сыр, яйцо" },
  { imgUrl: categoryImg2, title: "Мясо, птица, колбасы" },
];

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className={appStyle.container}>
        <Slider imgUrl={sliderList} />
        <Category title={"Топ категорий"} card={categoryList} />
        <Offers
          title="Наши спецпредложения"
          imgUrl={OffersImg}
          card={cardListSale.map((obj, id) => ({ id, ...obj }))}
        />
        <Banner imgUrlTable={bannerTable} imgUrlPhone={bannerPhone} />
        <Offers
          title="Часто покупают"
          imgUrl={OffersImg}
          card={cardList.map((obj, id) => ({ id: id + 100, ...obj }))}
        />
        <Banner imgUrlTable={bannerTable} imgUrlPhone={bannerPhone} />
        <Subscribe />
      </div>

      <Footer />
    </>
  );
};

export default Home;
