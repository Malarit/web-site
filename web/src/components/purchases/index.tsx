import React from "react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

import { useWindowDimensions } from "../../utils/getWindowSize";
import { useWindowScrolls } from "../../utils/getWindowScroll";
import { postOrder } from "../../utils/fetch";
import { selectUser } from "../../store/slices/user/selectors";
import { removeAll } from "../../store/slices/basket/slice";

import Card from "../product/card";
import HeartLoading from "../isLoading/heartLoading";
import Aside from "./aside";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

import style from "./index.module.scss";

const Purchases: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const [active, setActive] = React.useState<boolean>(false);
  const { items, totalPrice } = useSelector(
    (state: RootState) => state.basketReducer
  );
  const user = useSelector(selectUser);
  const { width, height } = useWindowDimensions();
  const { scrollY } = useWindowScrolls();
  const hightWindow = scrollY + height;
  const refRoot = React.useRef<any>();
  const scrollBottomRoot =
    refRoot.current?.clientHeight + refRoot.current?.offsetTop;
  const OnScrollBottom = (): boolean => {
    return hightWindow - 600 > scrollBottomRoot;
  };
  const [onOrder, setOnOrder] = React.useState(false);
  
  const asideProps = {
    items: items,
    width: width,
    totalPrice: totalPrice,
    active: active,
    setActive: setActive,
    enabled: OnScrollBottom(),
  };

  const onSubmit = async (e: React.FormEvent) => {
    const target = e.target as EventTarget & {
      [key: string]: HTMLInputElement;
    };
    e.preventDefault();

    const data = {
      street: target.street.value,
      house: target.house.value,
      user_id: user?.id,
      flat: target.flat.value,
      phoneNumber: target.phoneNumber.value,
      product_id: items,
      totalPrice,
    };

    let result: any;
    await postOrder(data).then((response: any) => (result = response));
    if (result.status === 200) {
      setOnOrder(true);
      window.scroll(50, 50);
      returnToHome()
    }
  };

  const returnToHome = React.useCallback(
    debounce(() => {
      navigate("/");
      dispatch(removeAll())
    }, 1000),
    []
  );

  return items.length !== 0 ? (
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
          <form onSubmit={(e) => onSubmit(e)}>
            <div>Укажите адрес доставки!</div>
            <input type="text" placeholder="Улица" name="street" />
            <input type="text" placeholder="Дом" name="house" />
            <input type="text" placeholder="Квартира" name="flat" />
            <input type="text" placeholder="Телефон" name="phoneNumber" />
            <div className={style.button}>
              <button>Заказать</button>
            </div>
          </form>
        </div>
      </div>
      {onOrder && (
        <div className={style.order}>
          Заказ успешно отправлен! <HeartLoading />{" "}
        </div>
      )}
    </>
  ) : (
    <div className={style.emptyCart}>Корзина пуста :{"("}</div>
  );
};

export default Purchases;
