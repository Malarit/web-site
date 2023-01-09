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
        fetchProducts({ discount: 0, favourite: user?.favourite_product })
      );
      refFlag.current = false;
    }
  }, [user]);

  const product = useSelector(selectAllProducts);

  return (
    <div className={style.root}>
      <div className={appStyle.container}>
        {product.map((item) => (
          <Card card={item} />
        ))}
      </div>
    </div>
  );
};

export default Favourite;
