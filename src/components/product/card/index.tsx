import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { useWindowDimensions } from "../../../utils/getWindowSize";

import Button from "./button";
import Price from "./price";

import { card } from "../../../store/slices/product/types";
import { classes } from "./types";

import style from "./index.module.scss";

import heart from "../../../assets/header/img/heart.svg";

const handleDragStart = (e: React.DragEvent<HTMLDivElement>) =>
  e.preventDefault();

const Card: React.FC<{ card: card; classes?: classes }> = ({
  card,
  classes,
}) => {
  const { width } = useWindowDimensions();
  const linkTitle = card.title.replace(/[\ \%\* ]/g, (item) => {
    if (item === " ") return "-";
    else if (item === "%") return "";
    else return item;
  });

  return (
    <div
      onDragStart={handleDragStart}
      className={cn(style.root, classes?.cardRoot)}
    >
      <img
        className={cn(style.favorite, classes?.cardFavorite)}
        src={heart}
        alt=""
      />

      {card.discount && card.discount !== 0 ? (
        <span>-{card.discount}%</span>
      ) : (
        <></>
      )}

      <div>
        <Link to={`/catalog/details/${card.id}/${linkTitle}`}>
          <img src={card.imgUrl} alt="" />
        </Link>
      </div>

      <div className={cn(style.rating, classes?.cardRating)}>
        <Rating
          initialValue={card.rating.value}
          readonly
          size={width > 754 ? 20 : 15}
        />
        <span>({card.rating.count})</span>
      </div>

      <div className={cn(style.title, classes?.cardTitle)}>{card.title}</div>
      
      <Price card={card} classes={classes}></Price>
      <Button card={card} classes={classes}></Button>
    </div>
  );
};





export default Card;
