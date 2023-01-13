import React from "react";
import { useDispatch, useSelector } from "react-redux";

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
  putCategory,
  deleteCategory,
  getBrands,
  postBrands,
  adminLogout,
} from "../../utils/fetch";

import {
  selectAllCategory,
  selectSubCategory,
} from "../../store/slices/category/selectors";
import { categoryType } from "../../store/slices/category/types";

import GetTree from "./getTree";
import TableProduct from "./tableProduct";
import Banners from "./banners";

import style from "./index.module.scss";
import { fetchCategory } from "../../store/slices/category/slice";
import { Registration } from "./account/account";

const Management: React.FC = () => {
  const category = useSelector(selectAllCategory);
  const subCategory = useSelector(selectSubCategory);
  const [activeCategory, setActiveCategory] = React.useState<categoryType>();
  const [brands, setBrands] = React.useState<{ id: number; name: string }[]>(
    []
  );
  const [active, setActive] = React.useState(0);
  const refFlag = React.useRef<boolean>(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (category[0]) {
      setActiveCategory(category[0][0]);
    }
  }, [category]);

  React.useEffect(() => {
    if (refFlag.current) getBrands(setBrands);
    refFlag.current = false;
  }, []);

  const postBrand = async (e: React.FormEvent) => {
    const target = e.target as EventTarget & {
      [key: string]: HTMLInputElement;
    };
    e.preventDefault();

    postBrands(target.name.value);
    getBrands(setBrands);
  };

  return (
    <div className={style.root}>
      <button onClick={() => adminLogout()}>Выйти</button>
      <button onClick={() => setActive(-1)}>
        Зарегестрировать нового администратора  
      </button>
      <button onClick={() => setActive(0)}>Продукты</button>
      <button onClick={() => setActive(1)}>Карусель баннеров</button>
      <button onClick={() => setActive(2)}>Топ категорий</button>
      <button onClick={() => setActive(3)}>Баннеры</button>
      <button onClick={() => setActive(4)}>Изображение категории</button>
      <button onClick={() => setActive(5)}>Бренды</button>
      {active === 0 && (
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
      {active === -1 && (
        <div>
          <Registration />
        </div>
      )}
      {active === 1 && (
        <div>
          <Banners
            title="Карусель баннеров"
            getBanners={(e) => getBanners(e)}
            postBanners={async (formData) => postBanners(formData)}
            deleteBanners={(e) => deleteBanners(e)}
          />
        </div>
      )}
      {active === 2 && (
        <div>
          <Banners
            title="Карусель баннеров"
            getBanners={(e) => getTopCategories(e)}
            postBanners={async (formData) => postTopCategories(formData)}
            deleteBanners={async (e) => deleteTopCategories(e)}
            category
          />
        </div>
      )}
      {active === 3 && (
        <div>
          <Banners
            title="Баннеры"
            getBanners={(e) => getBannersBetween(e)}
            postBanners={async (formData) => postBannersBetween(formData)}
            deleteBanners={async (e) => deleteBannersBetween(e)}
            category
            files
          />
        </div>
      )}
      {active === 4 && (
        <div>
          <Banners
            title="Изображение категории"
            getBanners={(e) => {
              e(subCategory.flat());
              dispatch<any>(fetchCategory());
            }}
            postBanners={async (formData) => putCategory(formData)}
            deleteBanners={async (e) => deleteCategory(e)}
            category
            checkImgCategory
          />
        </div>
      )}
      {active === 5 && (
        <form className={style.brand} action="" onSubmit={(e) => postBrand(e)}>
          <div>
            <input type="text" name="name" />
            <button>Отправить</button>
          </div>
          <div>
            {brands.map((item) => (
              <div>
                {item.name} <button>Удалить</button>{" "}
              </div>
            ))}
          </div>
        </form>
      )}
    </div>
  );
};

export default Management;
