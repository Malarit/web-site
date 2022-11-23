import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectById } from "../store/slices/product/selectors";
import { fetchProducts } from "../store/slices/product/slice";

import appStyle from "../app.module.scss";
import Product from "../components/product";

const Details: React.FC = () => {
  const dispatch = useDispatch();
  let flag = React.useRef(true);
  
  React.useEffect(() => {
    if (flag.current) dispatch<any>(fetchProducts());
    flag.current = false;
  }, []);

  const params = useParams();
  const items = useSelector(selectById(Number(params.id)));

  return (
    <div className={appStyle.container}>
      <Product items={{ ...items }} />
    </div>
  );
};

export default Details;
