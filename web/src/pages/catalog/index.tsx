import React from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../store/slices/product/slice";
import { useWindowDimensions } from "../../utils/getWindowSize";
import { selectAllCategory } from "../../store/slices/category/selectors";

import Aside from "../../components/catalog/aside";
import ProfuctView from "../../components/catalog/ProfuctView";

import style from "./index.module.scss";
import appStyle from "../../app.module.scss";

const Catalog: React.FC = () => {
  const dispatch = useDispatch();
  const category = useSelector(selectAllCategory);
  const { width } = useWindowDimensions();
  const [activeFilter, setActiveFilter] = React.useState(false);
  const [allFilter, setAllFilter] = React.useState<{
    category: number;
    brand: number;
    price: {
      left: number;
      right: number;
    };
  }>();
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    const ca = category.flat().find((obj) => obj.id == allFilter?.category);
    dispatch<any>(
      fetchProducts({
        discount: 0,
        page: page,
        limit: 10,
        price: allFilter?.price,
        brand_id: allFilter?.brand,
        left: ca?.left,
        right: ca?.right,
        tree_id: ca?.tree_id,
      })
    );
  }, [page, allFilter, category]);

  return (
    <div className={appStyle.container}>
      <div className={style.wrapper}>
        {width < 1000 && (
          <button onClick={() => setActiveFilter(!activeFilter)}>Фильтр</button>
        )}
        <div
          className={cn({ [style.aside]: true, [style.active]: activeFilter })}
        >
          <Aside
            state={setActiveFilter}
            getFilters={setAllFilter}
            category={category}
          />
        </div>
        <ProfuctView setPage={setPage} />
      </div>
    </div>
  );
};

export default Catalog;
