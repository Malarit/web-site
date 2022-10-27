import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

import style from "./drop.module.scss";
import appStyle from "../../app.module.scss";

const Drop: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <div className={cn({ [style.root]: true, [style.active]: active })}>
      <div className={style.container}>
        <div className={style.dropBlock}>
          <ul>
            <li><Link to="">Молочные</Link></li>
          </ul>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Drop;
