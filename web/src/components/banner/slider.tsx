import React from "react";
import AliceCarousel from "react-alice-carousel";
import { useWindowDimensions } from "../../utils/getWindowSize";

import Button from "../carousel/button";

import style from "./slider.module.scss";

const handleDragStart = (e: React.DragEvent<HTMLImageElement>) =>
  e.preventDefault();

const Slider: React.FC<{ imgUrl: string[] }> = React.memo(({ imgUrl }) => {
  const { width } = useWindowDimensions();

  return (
    <div className={` ${style.root}`}>
      <AliceCarousel
        mouseTracking={true}
        autoPlay={true}
        autoPlayInterval={3000}
        disableDotsControls={width > 1000 ? true : false}
        infinite={true}
        autoPlayStrategy={"default"}
        renderPrevButton={() => (
          <Button value={true} style={{ prevButton: style.buttonL }} />
        )}
        renderNextButton={() => (
          <Button value={false} style={{ nextButton: style.buttonR }} />
        )}
        items={imgUrl.map((item, id) => (
          <img
            key={id}
            className={style.img}
            src={item}
            onDragStart={handleDragStart}
            role="presentation"
          />
        ))}
      />
    </div>
  );
});

export default Slider;
