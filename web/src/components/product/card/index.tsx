import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { useSelector, useDispatch } from "react-redux";

import { card } from "../../../store/slices/product/types";
import { classes } from "./types";
import { selectUser } from "../../../store/slices/user/selectors";
import { postFavourite } from "../../../utils/fetch";
import { useWindowDimensions } from "../../../utils/getWindowSize";
import { setFavourite } from "../../../store/slices/user/slice";

import Button from "./button";
import Price from "./price";

import style from "./index.module.scss";

import heart from "../../../assets/header/img/heart.svg";
import redHeart from "../../../assets/header/img/red-heart.svg";

const handleDragStart = (e: React.DragEvent<HTMLDivElement>) =>
  e.preventDefault();

const Card: React.FC<{ card: card; classes?: classes }> = React.memo(
  ({ card, classes }) => {
    const { width } = useWindowDimensions();
    const dispatch = useDispatch()
    const user = useSelector(selectUser);
    const linkTitle = card.title.replace(/[\ \%\* ]/g, (item) => {
      if (item === " ") return "-";
      else if (item === "%") return "";
      else return item;
    });

    const setFavouriteProduct = () => {
      if (user) postFavourite(card.id, user?.id);
      dispatch(setFavourite(card.id))
    };

    return (
      <div
        onDragStart={handleDragStart}
        className={cn(style.root, classes?.cardRoot)}
      >
        <img
          className={cn(style.favorite, classes?.cardFavorite)}
          src={user?.favourite_product.includes(card.id) ? redHeart : heart}
          onClick={() => setFavouriteProduct()}
          alt="heart"
        />

        {card.discount && card.discount !== 0 ? (
          <span>-{card.discount}%</span>
        ) : (
          <></>
        )}

        <div>
          <Link to={`/catalog/details/${card.id}/${linkTitle}`}>
            <img src={"http://127.0.0.1:5000" + card.imgUrl[0].url} alt="" />
          </Link>
        </div>

        <div className={cn(style.rating, classes?.cardRating)}>
          <Rating
            initialValue={(card.rating.value / card.rating.count) | 0}
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
  }
);

export default Card;
