import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../store/slices/product/slice";

import { selectAllCategory } from "../../store/slices/category/selectors";
import { categoryType } from "../../store/slices/category/types";

import GetTree from "./getTree";
import TableProduct from "./tableProduct";

import style from "./index.module.scss";

const Management: React.FC = () => {
  const category = useSelector(selectAllCategory);
  const [activeCategory, setActiveCategory] = React.useState<categoryType>();

  React.useEffect(() => {
    if (category[0]) {
      setActiveCategory(category[0][0]);
    }
  }, [category]);

  return (
    <div className={style.root}>
      <div className={style.categories}>
        <GetTree
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>
      <div className={style.product}>
        <TableProduct activeCategory={activeCategory} />
      </div>
    </div>
  );
};

export default Management;
