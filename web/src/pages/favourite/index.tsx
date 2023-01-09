import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../components/product/card";
import { selectAllProducts } from "../../store/slices/product/selectors";
import { fetchProducts } from "../../store/slices/product/slice";
import { selectUser } from "../../store/slices/user/selectors";

import style from "./index.module.scss";
import appStyle from "../../app.module.scss";

const Favourite: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const refFlag = React.useRef<boolean>(true);

  React.useEffect(() => {
    if (refFlag.current && user && user.favourite_product.length != 0) {
      dispatch<any>(
        fetchProducts({ favourite: user?.favourite_product })
      );
      refFlag.current = false;
    }
  }, [user]);

  const product = useSelector(selectAllProducts);

  const getJSX = (): JSX.Element => {
    if (!user) return <>Вам нужно войти!</>;
    else if (user.favourite_product.length == 0)
      return <>Вы не добавили ни одного продукта в избранное</>;
    return <></>;
  };

  return (
    <div className={style.root}>
      <div className={appStyle.container}>
        <div className={style.card}>
          {user && refFlag.current == false &&
            user.favourite_product.length != 0 &&
            product.map((item) => <Card key={item.id} card={item} />)}
        </div>
        <div className={style.block}>{getJSX()}</div>
      </div>
    </div>
  );
};

export default Favourite;
