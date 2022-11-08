import React from "react";

import Aside from "./aside";

import { useWindowDimensions } from "../../utils/getWindowSize";
import { useWindowScrolls } from "../../utils/getWindowScroll";

import Card from "../product/card";
import Button from "./button";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import style from "./index.module.scss";

const Purchases: React.FC = () => {
  const [active, setActive] = React.useState<boolean>(false);
  const { items, totalPrice } = useSelector(
    (state: RootState) => state.basketReducer
  );

  const { width, height } = useWindowDimensions();
  const { scrollY } = useWindowScrolls();
  const hightWindow = scrollY + height;

  const refRoot = React.useRef<any>();
  const scrollBottomRoot =
    refRoot.current?.clientHeight + refRoot.current?.offsetTop;

  const OnScrollBottom = (): boolean => {
    return hightWindow - 600 > scrollBottomRoot;
  };

  const asideProps = {
    items: items,
    width: width,
    totalPrice: totalPrice,
    active: active,
    setActive: setActive,
    enabled: OnScrollBottom(),
  };

  return items.length != 0 ? (
    <>
      {width < 1000 && <Aside {...asideProps} />}
      <div className={style.root} ref={refRoot}>
        <div className={style.wrapper}>
          {items.map((obj) => (
            <div key={obj.id}>
              <Card key={obj.id} card={{ ...obj }} classes={style} />
            </div>
          ))}
        </div>
        {width > 1000 && <Aside {...asideProps} />}
      </div>
      <div className={style.map}>
        <div>
          <div>Укажите адрес доставки!</div>
          <input type="text" placeholder="Улица" />
          <input type="text" placeholder="Дом" />
          <input type="text" placeholder="Квартира" />
          <input type="text" placeholder="Телефон" />
          <div className={style.button}>
            <Button />
          </div>
        </div>

      </div>
    </>
  ) : (
    <div className={style.emptyCart}>
      Корзина пуста :{"("}
    </div>
  );
};

export default Purchases;
