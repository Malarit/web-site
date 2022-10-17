import React from "react";

import Header from "../components/header";
import Footer from "../components/footer";
import Purchases from "../components/purchases";

import appStyle from "../app.module.scss";

const Basket: React.FC = () => {
  return (
    <>
      <Header />
      <div className={appStyle.container}>
        <Purchases />
      </div>
      <Footer />
    </>
  );
};

export default Basket;
