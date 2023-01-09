import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { useWindowDimensions } from "../../utils/getWindowSize";
import { selectSubCategory } from "../../store/slices/category/selectors";

import style from "./index.module.scss";

const Banner: React.FC<{
  id: number;
  url: string[];
  category_id?: number;
}> = ({ id, url, category_id }) => {
  const { width } = useWindowDimensions();

  const getImg = () => {
    if (!Array.isArray(url)) return "";

    return width > 1000
      ? "http://127.0.0.1:5000" + (url[0] || "")
      : "http://127.0.0.1:5000" + (url[1] || "");
  };

  return (
    <div className={style.root}>
      <Link to={`/catalog?category=${category_id}`}>
        <img src={getImg()} alt="" />
      </Link>
    </div>
  );
};

export default Banner;
