import React from "react";
import cn from "classnames";

import style from "./index.module.scss";
/**
  * @param check changes the backlight
  * @param reset param for useEffect, clears the value
*/

const Input: React.FC<{
  lable: string;
  name: string;
  check?: boolean;
  type?: string;
  onChange?: (e: HTMLInputElement) => void;
  reset?: any[];
}> = ({ lable, name, check, onChange, type, reset }) => {
  const [active, setActive] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  const refLabel = React.useRef<any>();
  const refRoot = React.useRef<any>();

  React.useEffect(() => {
    setValue("");
  }, reset);

  const getStyle = (active: boolean, value?: string) => {
    const def = {
      width: refLabel.current?.offsetWidth,
      left: refLabel.current?.offsetLeft,
    };

    if (active || value)
      return {
        ...def,
        transform: ` translateY(${-refRoot.current.offsetHeight / 2}px)`,
      };
    return { ...def, transform: "translateY(-0px)" };
  };

  return (
    <div
      className={cn({ [style.root]: true, [style.active]: check })}
      ref={refRoot}
    >
      <label
        ref={refLabel}
        style={
          active || value
            ? {
                transform: ` translateY(${
                  -refRoot.current.offsetHeight / 2
                }px)`,
              }
            : {}
        }
        htmlFor=""
      >
        {lable}
      </label>
      <div style={getStyle(active, value)}></div>
      <input
        type={type ? type : "text"}
        name={name}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange && onChange(e.target);
        }}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      />
    </div>
  );
};

export default Input;
