import React from "react";

import style from "./index.module.scss";

import Search from "../search";

const Subscribe: React.FC = () => {
  return (
    <div className={style.root}>
      <div>Выгода с доставкой</div>
      <div>
        Подпишитесь и получайте промокоды, акции и подборки товаров на свою
        почту.
      </div>
      <div>
        <Search text="Подписаться" />
      </div>
    </div>
  );
};

export default Subscribe;
