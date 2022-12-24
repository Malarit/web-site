import React from "react";

import style from "./index.module.scss";

const DUnderline: React.FC<{ children: any; refs: any; state: number }> = ({
  children,
  refs,
  state,
}) => {

  return (
    <div className={style.root}>
      {children}
      <span
        style={{
          transform: `translateX(${
            state === 0
              ? refs.refButtons1.current?.offsetLeft
              : refs.refButtons2.current?.offsetLeft
          }px`,
          width: `${
            state === 0
              ? refs.refButtons1.current?.offsetWidth
              : refs.refButtons2.current?.offsetWidth
          }px`,
          transition: "all 0.5s",
        }}
        className={style.underline}
      ></span>
    </div>
  );
};

export default DUnderline;
