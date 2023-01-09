import React from "react";

import Purchases from "../components/purchases";

import appStyle from "../app.module.scss";

const Cart: React.FC = () => {
  return (
    <div className={appStyle.container}>
      <Purchases />
    </div>
  );
};

export default Cart;
