import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectById } from "../store/slices/product/selectors";
import { fetchProducts } from "../store/slices/product/slice";

import appStyle from "../app.module.scss";
import Product from "../components/product";

const Details: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams();

  React.useEffect(() => {
    if (params.id)
      dispatch<any>(fetchProducts({ product_id: Number(params.id) }));
  }, [params]);

  const item = useSelector(selectById(Number(params.id)));

  return (
    <div className={appStyle.container}>{item && <Product item={item} />}</div>
  );
};

export default Details;
