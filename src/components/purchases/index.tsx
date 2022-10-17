import React from "react";

import Aside from "./aside";

import { useWindowDimensions } from "../../utils/getWindowSize";
import { useWindowScrolls } from "../../utils/getWindowScroll";

import Card from "../product/card";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import style from "./index.module.scss";

const Purchases: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const scroll = useWindowScrolls();
  const [active, setActive] = React.useState<boolean>(false);
  const { items, totalPrice } = useSelector(
    (state: RootState) => state.basketReducer
  );

  console.log(scroll.scrollY, height);
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
