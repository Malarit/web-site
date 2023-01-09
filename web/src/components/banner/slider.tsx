import React from "react";
import AliceCarousel from "react-alice-carousel";
import { getBanners } from "../../utils/fetch";
import { useWindowDimensions } from "../../utils/getWindowSize";

import Button from "../carousel/button";

import style from "./slider.module.scss";

const handleDragStart = (e: React.DragEvent<HTMLImageElement>) =>
  e.preventDefault();

const Slider: React.FC = React.memo(() => {
  const { width } = useWindowDimensions();
  const [banners, setBanners] = React.useState<
    {
      id: number;
      url: string;
      name: string;
    }[]
  >([]);
  const refFlag = React.useRef<boolean>(true);

  React.useEffect(() => {
    if (refFlag.current) getBanners(setBanners);
    refFlag.current = false;
  }, []);

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
        items={banners.map((item, id) => (
          <img
            key={id}
            className={style.img}
            src={"http://127.0.0.1:5000" + item.url}
            onDragStart={handleDragStart}
            role="presentation"
          />
        ))}
      />
    </div>
  );
});

export default Slider;
