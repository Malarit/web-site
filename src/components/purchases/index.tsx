import React from "react";
import Sticky from "react-stickynode";
import cn from "classnames";

import { useWindowDimensions } from "../../utils/getWindowSize";
import Card from "../product/card";

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { card } from "../../features/basket/types";

import style from "./index.module.scss";

const Aside: React.FC<{
  items: card[];
  width: number;
  totalPrice: number;
  active: boolean;
  setActive: any;
}> = ({ items, width, totalPrice, active, setActive }) => {
  return (
    <Sticky enabled={true} innerZ={10}>
      <aside className={cn({ [style.aside]: true, [style.active]: active })}>
        <div className={style.wrapper}>
          {width < 1000 && (
            <div onClick={() => setActive(!active)} className={style.mark}>
              {"<"}
            </div>
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
          <div className={style.button}>Заказать</div>
        </div>
      </aside>
    </Sticky>
  );
};

const Purchases: React.FC = () => {
  const { width } = useWindowDimensions();
  const [active, setActive] = React.useState<boolean>(false);
  const { items, totalPrice } = useSelector(
    (state: RootState) => state.basketReducer
  );

  return (
    <>
      {width < 1000 && (
        <Aside
          items={items}
          width={width}
          totalPrice={totalPrice}
          active={active}
          setActive={setActive}
        />
      )}
      <div className={style.root}>
        <div>
          {items.map((obj) => (
            <div key={obj.id}>
              <Card key={obj.id} card={{ ...obj }} classes={style} />
            </div>
          ))}
        </div>
        {width > 1000 && (
          <Aside
            items={items}
            width={width}
            totalPrice={totalPrice}
            active={active}
            setActive={setActive}
          />
        )}
      </div>
    </>
  );
};

export default Purchases;

