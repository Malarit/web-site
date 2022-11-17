import React from 'react'
import { getPercentage } from "../../../../utils/getPercentage";
import cn from "classnames";

import { cardComponents } from '../types';

import style from "./index.module.scss" 

const Price: React.FC<cardComponents> = ({ card, classes }) => {
  return (
    <>
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
    </>
  );
};

export default Price;