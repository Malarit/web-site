import React from "react";
import cn from "classnames";

import { useWindowDimensions } from "../../../utils/getWindowSize";

import style from "./index.module.scss";

const ImgSlider: React.FC<{ imgUrl: string[] }> = ({ imgUrl }) => {
  const { width } = useWindowDimensions();
  const refOriginal = React.useRef<any>();
  const refThumbnail = React.useRef<any>();
  const slide = React.useRef<any>();
  const [slideValue, setSlideValue] = React.useState<number>(0);
  let [SValThumbnail, setSValThumbnail] = React.useState<number>(0);
  const [activeThumbnail, setActiveThumbnail] = React.useState<number>(0);
  const [active, setActive] = React.useState(false);

  const onClickThumbnail = (index: number) => {
    setSlideValue(refOriginal.current?.offsetWidth * -index);
    setActiveThumbnail(index);
  };

  const onClickSpan = (flag: boolean) => {
    if (flag) {
      SValThumbnail + refThumbnail.current?.offsetHeight > 0
        ? setSValThumbnail(0)
        : setSValThumbnail(
            (SValThumbnail += refThumbnail.current?.offsetHeight)
          );
    } else {
      SValThumbnail - refThumbnail.current?.offsetHeight <
      -refThumbnail.current?.offsetHeight * (imgUrl.length - 3)
        ? setSValThumbnail(
            -refThumbnail.current?.offsetHeight * (imgUrl.length - 3)
          )
        : setSValThumbnail(
            (SValThumbnail -= refThumbnail.current?.offsetHeight)
          );
    }
  };

  return (
    <>
      <div className={cn({ [style.thumbnail]: true, [style.active]: active })}>
        <span onClick={() => onClickSpan(true)}>Вверх</span>
        <span onClick={() => onClickSpan(false)}>Вниз</span>
        <div
          style={{
            transform: `translateY(${SValThumbnail}px`,
          }}
        >
          {imgUrl.map((item, index) => (
            <div
              key={index}
              onClick={() => onClickThumbnail(index)}
              ref={refThumbnail}
              className={cn({ [style.active]: index === activeThumbnail })}
            >
              <img src={item} alt="" />
            </div>
          ))}
        </div>
      </div>
      <div className={style.original}>
        {width < 574 && (
          <span
            className={cn({ [style.active]: active })}
            onClick={() => setActive(!active)}
          >
            {"-->"}
          </span>
        )}
        <div
          ref={slide}
          style={{
            transform: `translateX(${slideValue}px`,
          }}
        >
          {imgUrl.map((item, index) => (
            <div key={index} ref={refOriginal}>
              <img src={item} alt="" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImgSlider;
