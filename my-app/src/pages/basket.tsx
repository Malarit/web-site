import React from "react";

import Header from "../components/header";
import Purchases from "../components/purchases";

import appStyle from "../app.module.scss";

import cardImg from "../assets/product/q.webp";

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
  },
  {
    title: "Творог Простоквашино 2% 200 г ",
    price: 600,
    imgUrl: cardImg,
    rating: { value: 3, count: 20 },
    discount: 30,
  },
];

const Basket: React.FC = () => {
  return (
    <>
      <Header />
      <div className={appStyle.container}>
        <Purchases  />
      </div>
    </>
  );
};

export default Basket;
