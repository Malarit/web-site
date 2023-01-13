import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { subCategory } from "../../pages/home";
import { selectSubCategory } from "../../store/slices/category/selectors";

import style from "./index.module.scss";

const Category: React.FC<{ title: string; card: subCategory }> = React.memo(
  ({ title, card }) => {
    const category = useSelector(selectSubCategory);

    return (
      <div className={style.wrapper}>
        <div className={style.title}>{title}</div>
        <div className={style.root}>
          {card.map((item, id) => (
            <div key={id} className={style.card}>
              <Link to={`/catalog?category=${item.category_id}`}>
                <span>
                  {category.find((obj) => obj.id === item.category_id)?.name}
                </span>
                <img src={"http://127.0.0.1:5000" + item.url} alt="" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default Category;
