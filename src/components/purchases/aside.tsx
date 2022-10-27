import React from "react";
import Sticky from "react-stickynode";
import cn from "classnames";

import { card } from "../../store/slices/product/types";

import Button from "./button";

import style from "./aside.module.scss";

type aside = {
  items: card[];
  width: number;
  totalPrice: number;
  active: boolean;
  setActive: any;
  enabled: boolean;
};

const Aside: React.FC<aside> = ({
  items,
  width,
  totalPrice,
  active,
  setActive,
  enabled,
}) => {
  return (
    <Sticky enabled={enabled} innerZ={10}>
      <aside className={cn({ [style.aside]: true, [style.active]: active })}>
        <div className={style.wrapper}>
          {width < 1000 && (
            <div
              onClick={() => setActive(!active)}
              className={style.mark}
            ></div>
          )}
          <div>
            <ul>
              {items.map((obj) => (
                <li key={obj.id}>
                  {obj.title}
                  <div>
                    <span>x{obj.count}</span>
                    <span>{obj.price * (obj.count || 1)} ₽</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            Итого: <span>{totalPrice},00 ₽</span>
          </div>
          <Button/>
        </div>
      </aside>
    </Sticky>
  );
};

export default Aside;
