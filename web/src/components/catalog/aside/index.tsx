import React from "react";
import qs from "qs";
import cn from "classnames";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getBrands } from "../../../utils/fetch";
import { categoryType } from "../../../store/slices/category/types";

import Tree from "../../category/tree";
import Slider from "./slider";

import style from "./index.module.scss";

type range = { left: number; right: number };
const initialRange = {
  left: 2000,
  right: 8000,
};

const Aside: React.FC<{
  state: React.SetStateAction<any>;
  getFilters: React.SetStateAction<any>;
  category: categoryType[][];
}> = ({ state, getFilters, category }) => {
  const navigate = useNavigate();
  const [brands, setBrands] = React.useState<{ id: number; name: string }[]>();
  const [brandId, setBrandId] = React.useState(0);
  const [onCategory, setOnCategory] = React.useState<number>(0);
  const [price, setPrice] = React.useState<range>(initialRange);
  const [urlPrice, setUrlPrice] = React.useState<range>(initialRange);
  const [activeUl, setActiveUl] = React.useState<number[]>([]);
  const [urlActiveUl, setUrlActiveUl] = React.useState<number[]>([]);

  React.useEffect(() => {
    getBrands(setBrands);
  }, []);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const _params = params as unknown as {
        category: number;
        brand: number;
        price: range;
        activeUl: string[];
      };

      setBrandId(_params.brand);
      setOnCategory(_params.category);
      setUrlPrice(_params.price);
      setUrlActiveUl(_params?.activeUl?.map((item) => Number.parseInt(item)));
      getFilters({
        category: _params.category,
        brand: _params.brand,
        price: _params.price,
      });

    }
  }, []);

  const onButton = () => {
    const data = {
      category: onCategory,
      brand: brandId,
      price: price,
    };
    const queryString = qs.stringify({ ...data, activeUl: activeUl });
    navigate("?" + queryString);
    getFilters(data);
  };

  const onTree = (e: categoryType) => {
    if (e.left + 1 == e.right) setOnCategory(e.id);
  };

  return (
    <div className={style.root}>
      <div className={style.filter}>
        Фильтр
        <div onClick={() => state(false)}>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={style.tree}>
        <Tree
          category={category}
          getChildCategory={(e) => onTree(e)}
          activeLi={onCategory}
          getActiveUl={setActiveUl}
          _setActiveUl={urlActiveUl}
        />
      </div>
      <div>Цена</div>
      <div className={style.slider}>
        <Slider
          minValue={1}
          maxValue={10000}
          getValue={(e) => setPrice(e)}
          setValue={urlPrice}
        />
      </div>
      <div>Бренд</div>
      <div className={style.brands}>
        {brands?.map((obj) => (
          <div
            className={cn({ [style.active]: obj.id == brandId })}
            onClick={() => setBrandId(obj.id)}
            key={obj.id}
          >
            {obj.name}
          </div>
        ))}
      </div>

      <button onClick={() => onButton()}>Найти</button>
    </div>
  );
};

export default Aside;
