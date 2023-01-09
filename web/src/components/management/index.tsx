import React from "react";
import { useSelector } from "react-redux";

import {
  getBanners,
  postBanners,
  deleteBanners,
  postTopCategories,
  getTopCategories,
  deleteTopCategories,
  getBannersBetween,
  postBannersBetween,
  deleteBannersBetween,
} from "../../utils/fetch";

import { selectAllCategory } from "../../store/slices/category/selectors";
import { categoryType } from "../../store/slices/category/types";

import GetTree from "./getTree";
import TableProduct from "./tableProduct";
import Banners from "./banners";

import style from "./index.module.scss";

const Management: React.FC = () => {
  const category = useSelector(selectAllCategory);
  const [activeCategory, setActiveCategory] = React.useState<categoryType>();
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    if (category[0]) {
      setActiveCategory(category[0][0]);
    }
  }, [category]);

  return (
    <div className={style.root}>
      <button onClick={() => setActive(0)}>Продукты</button>
      <button onClick={() => setActive(1)}>Карусель баннеров</button>
      <button onClick={() => setActive(2)}>Топ категорий</button>
      <button onClick={() => setActive(3)}>Баннеры</button>
      {active == 0 && (
        <div>
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
      )}
      {active == 1 && (
        <div>
          <Banners
            title="Карусель баннеров"
            getBanners={(e) => getBanners(e)}
            postBanners={async (formData) => postBanners(formData)}
            deleteBanners={(e) => deleteBanners(e)}
          />
        </div>
      )}
      {active == 2 && (
        <div>
          <Banners
            title="Карусель баннеров"
            getBanners={(e) => getTopCategories(e)}
            postBanners={async (formData) => postTopCategories(formData)}
            deleteBanners={async (e) => deleteTopCategories(e)}
            category={activeCategory}
          />
        </div>
      )}
      {active == 3 && (
        <div>
          <Banners
            title="Баннеры"
            getBanners={(e) => getBannersBetween(e)}
            postBanners={async (formData) => postBannersBetween(formData)}
            deleteBanners={async (e) => deleteBannersBetween(e)}
            category={activeCategory}
            files
          />
        </div>
      )}
    </div>
  );
};

export default Management;
