import React from "react";
import AliceCarousel from "react-alice-carousel";
import { useWindowDimensions } from "../../utils/getWindowSize";
import { useSelector, useDispatch } from "react-redux";
import { selectCards } from "../../store/slices/basket/selectors";

import { card } from "../../store/slices/product/types";

import Card from "./card";
import Button from "../carousel/button";

import style from "./offers.module.scss";

const responsive = {
  0: {
    items: 4,
  },
  1200: {
    items: 4,
  },
  1300: {
    items: 6,
  },
};

type offers = {
  title: string;
  imgUrl: string;
  card: card[];
};

const Offers: React.FC<offers> = ({ title, imgUrl, card }) => {
  const { width } = useWindowDimensions();
  const slideNum: number = 3;
  const CarouselRef = React.useRef<AliceCarousel | null>();

  const cardsState = useSelector(selectCards);

  let indexItem = React.useRef<{
    item: number;
    itemsInSlide: number;
  }>({
    item: 0,
    itemsInSlide: 0,
  });

  return (
    <div className={style.root}>
      <div className={style.banner}>
        {width > 1000 ? (
          <div>{title}</div>
        ) : (
          <div>
            <a href="">
              {title}
              <span> {">"} </span>
            </a>
          </div>
        )}
        <a href="">Показать все</a>
        <img src={imgUrl} alt="" />
      </div>
      <div className={style.carousel}>
        <AliceCarousel
          mouseTracking
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          ref={(el) => (CarouselRef.current = el)}
          onSlideChanged={(e) =>
            (indexItem.current = {
              item: e.item,
              itemsInSlide: e.itemsInSlide,
            })
          }
          items={card.map((item) => (
            <Card key={item.id} card={{ ...item }} />
          ))}
        />
        <Button
          style={{ prevButton: style.buttonL }}
          onClick={() =>
            CarouselRef.current?.slideTo(indexItem.current.item - slideNum)
          }
          value={true}
        />
        <Button
          style={{ nextButton: style.buttonR }}
          onClick={() =>
            CarouselRef.current?.slideTo(indexItem.current.item + slideNum)
          }
          value={false}
        />
      </div>
    </div>
  );
};

export default Offers;
