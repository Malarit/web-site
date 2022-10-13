import React from "react";

import style from "./card.module.scss";

export type card = { imgUrl: string; title: string };

const Card: React.FC<card> = ({ imgUrl, title }) => {
  return (
    <div className={style.root}>
      <a href="">
        <span>{title}</span>
        <img src={imgUrl} alt="" />
      </a>
    </div>
  );
};

export default Card;
