import React from "react";
import { useWindowDimensions } from "../../utils/getWindowSize";

import { card } from "../../store/slices/product/types";

import Card from "./card";

import style from "./offers.module.scss";

type offers = {
  title: string;
  imgUrl: string;
  card: card[];
};

const Offers: React.FC<offers> = ({ title, imgUrl, card }) => {
  const { width } = useWindowDimensions();

  return (
    <div className={style.root}>
      <div className={style.banner}>
        {width > 1000 ? (
          <div>{title}</div>
        ) : (
          <div>
            <a href="">
              {title}
              <span> {">"} </span>
            </a>
          </div>
        )}
        <a href="">Показать все</a>
        <img src={imgUrl} alt="" />
      </div>
      <div className={style.carousel}>
        {card.map((item, id) => {
          if (id < 6) {
            return <Card key={item.id} card={{ ...item }} />;
          }
        })}
      </div>
    </div>
  );
};

export default Offers;
