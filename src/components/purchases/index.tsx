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

  const { width, height } = useWindowDimensions();
  const { scrollY } = useWindowScrolls();
  const refDiv = React.useRef<any>();
  const scrollBottomRoot =
    refDiv.current?.clientHeight + refDiv.current?.offsetTop;
  const hightWindow = scrollY + height;

  const { items, totalPrice } = useSelector(
    (state: RootState) => state.basketReducer
  );

  const OnScrollBottom = () => {
    const onBottom: boolean = scrollBottomRoot < hightWindow - 200;
    return onBottom;
  };

  const asideProps = {
    items: items,
    width: width,
    totalPrice: totalPrice,
    active: active,
    setActive: setActive,
    enabled: !OnScrollBottom(),
  };

  return items ? (
    <>
      {width < 1000 && !OnScrollBottom() && <Aside {...asideProps} />}
      <div className={style.root} ref={refDiv}>
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
        <div>
          <iframe
            src="https://yandex.ru/map-widget/v1/-/CCUZb2eMlA"
            allowFullScreen={true}
          ></iframe>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Purchases;
