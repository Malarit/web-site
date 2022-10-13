import React from "react";

import style from "./index.module.scss";

import { useWindowDimensions } from "../../utils/getWindowSize";

const Banner: React.FC<{ imgUrlTable: string; imgUrlPhone: string }> = ({
  imgUrlTable,
  imgUrlPhone,
}) => {
  const { width } = useWindowDimensions();

  return (
    <div className={style.root}>
      <a href="">
        <img src={width > 1000 ? imgUrlTable : imgUrlPhone} alt="" />
      </a>
    </div>
  );
};

export default Banner;
