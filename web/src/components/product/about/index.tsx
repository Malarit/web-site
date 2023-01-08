import React from "react";
import { card } from "../../../store/slices/product/types";

import style from "./index.module.scss";

const About: React.FC<{ item: card }> = ({ item }) => {
  return (
    <div className={style.root}>
      <div className={style.title}>Характеристики</div>
      <div className={style.specifications}>
        <div>В упаковке</div>
        <div>{item.packaging}</div>
        <div>Бренд</div>
        <div>{item.brand.name}</div>
        <div>Вес товара</div>
        <div>{item.weight}</div>
        <div>Описание</div>
        <div>{item.description}</div>
      </div>
    </div>
  );
};

export default About;
