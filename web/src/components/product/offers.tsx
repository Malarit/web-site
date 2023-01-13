import React from "react";
import { useWindowDimensions } from "../../utils/getWindowSize";

import { card } from "../../store/slices/product/types";

import Card from "./card";

import style from "./offers.module.scss";
import { Link } from "react-router-dom";

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
            <Link to="catalog?category=3">
              {title}
              <span> {">"} </span>
            </Link>
          </div>
        )}
        <Link to="catalog?category=3">Показать все</Link>
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
