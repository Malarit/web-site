import React from "react";
import cn from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { selectCountCard } from "../../../../store/slices/basket/selectors";
import { addItem, removeItem } from "../../../../store/slices/basket/slice";

import { cardComponents } from "../types";

import style from "./index.module.scss";

export const Button: React.FC<cardComponents> = ({ card, classes }) => {
  const dispatch = useDispatch();
  const count = useSelector(selectCountCard(card.id));

  return (
    <>
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
    </>
  );
};

export default Button;
