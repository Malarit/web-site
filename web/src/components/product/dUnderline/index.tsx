import React from "react";
import cn from "classnames";
import style from "./index.module.scss";

const DUnderline: React.FC<{
  children: JSX.Element[];
  state: number;
  styleDiv?: string;
}> = ({ children, state, styleDiv }) => {
  let ref = React.useRef<any[]>([]);
  const [spanStyle, setSpanStyle] = React.useState<{
    [key: string]: string | number;
  }>();

  const getStyleSpan = () => {
    for (let i = 0; i < ref.current.length; i++) {
      if (state == i) {
        setSpanStyle({
          transform: `translateX(${ref.current[i]?.offsetLeft}px)`,
          width: `${ref.current[i]?.offsetWidth}px`,
          transition: "all 0.5s",
        });
      }
    }
  };

  React.useEffect(() => {
    getStyleSpan();
  }, [ref.current, state]);

  return (
    <div className={style.root}>
      {children.map((child, id) => (
        <div
          key={id}
          className={cn(style.wrapper, styleDiv)}
          ref={(dom) => (ref.current[id] = dom)}
        >
          {child}
        </div>
      ))}
      <span style={spanStyle} className={style.underline}></span>
    </div>
  );
};

export default DUnderline;
