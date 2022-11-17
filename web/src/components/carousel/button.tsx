import React from "react";
import styleButton from "./button.module.scss" 

const Button: React.FC<{
  value: boolean;
  onClick?: any;
  style: { prevButton?: string; nextButton?: string };
  hoverActive?: string;
}> = ({ value, onClick, style, hoverActive }) => {
  return (
    <div
      onClick={() => onClick()}
      className={`${styleButton.button} ${
        value ? style.prevButton : style.nextButton
      } ${hoverActive}`}
    >
      {value ? "<" : ">"}
    </div>
  );
};

export default Button;
