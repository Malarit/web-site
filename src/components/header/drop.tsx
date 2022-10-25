import React from "react";
import cn from "classnames";

import style from "./drop.module.scss";
import appStyle from "../../app.module.scss";


const Drop: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <div className={cn({ [style.root]: true, [style.active]: active })}>
      <div className={cn(appStyle.container, style.container)}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Drop;
