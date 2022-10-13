import React from "react";
import cn from "classnames";
import { useWindowDimensions } from "../../utils/getWindowSize";
import { getPercentage } from "../../utils/getPercentage";

import { useSelector, useDispatch } from "react-redux";
import { selectCountCard } from "../../features/basket/selectors";
import { addItem, removeItem } from "../../features/basket/slice";
import { card } from "../../features/basket/types";

import { Rating } from "react-simple-star-rating";

import style from "./card.module.scss";

import heart from "../../assets/header/img/heart.svg";

const handleDragStart = (e: React.DragEvent<HTMLDivElement>) =>
  e.preventDefault();

type classes = {
  cardRoot?: string;
  cardFavorite?: string;
  cardRating?: string;
  cardTitle?: string;
  cardPrice?: string;
  cardButton?: string;
};

const Card: React.FC<{ card: card; classes?: classes }> = ({
  card,
  classes,
}) => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const count = useSelector(selectCountCard(card.id));

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

      {card.discount && card.discount != 0 ? (
        <span>-{card.discount}%</span>
      ) : (
        <></>
      )}

      <div>
        <a href="">
          <img src={card.imgUrl} alt="" />
        </a>
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
      <div
        className={cn({
          [cn(style.price, classes?.cardPrice)]: true,
          [style.discount]: card.discount,
        })}
      >
        {card.discount ? (
          <>
            <div>
              {getPercentage(card.price, card.discount) * (card.count || 1)},00
              ₽
            </div>
            <span>{card.price * (card.count || 1)},00 ₽</span>
          </>
        ) : (
          <div>{card.price * (card.count || 1)},00 ₽</div>
        )}
      </div>

      {count ? (
        <div
          className={cn({
            [cn(style.button, classes?.cardButton)]: true,
            [style.active]: count,
          })}
        >
          <div>
            <span onClick={() => dispatch(removeItem(card))}>-</span>
            <span>{count}</span>
            <span onClick={() => dispatch(addItem(card))}>+</span>
          </div>
        </div>
      ) : (
        <div
          onClick={() => dispatch(addItem(card))}
          className={cn({
            [cn(style.button, classes?.cardButton)]: true,
            [style.active]: count,
          })}
        >
          В корзину
        </div>
      )}
    </div>
  );
};

export default Card;
