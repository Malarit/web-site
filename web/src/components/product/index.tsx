import React from "react";
import ImageGallery from "react-image-gallery";
import { useWindowDimensions } from "../../utils/getWindowSize";
import { Rating } from "react-simple-star-rating";

import Button from "./card/button";
import Price from "./card/price";
import Reviews from "./reviews";
import About from "./about";
import ImgSlider from "./imgSlider";
import DUnderline from "./dUnderline";

import style from "./index.module.scss";
import "react-image-gallery/styles/scss/image-gallery.scss";

const handleDragStart = (e: React.DragEvent<HTMLDivElement>) =>
  e.preventDefault();

const Product: React.FC<{ items: any }> = ({ items }) => {
  const [select, setSelect] = React.useState<number>(0);
  const { width } = useWindowDimensions();
  const refButtons1 = React.useRef<any>();
  const refButtons2 = React.useRef<any>();

  const imgUrls = [
    items.imgUrl,
    items.imgUrl,
    items.imgUrl,
    items.imgUrl,
    items.imgUrl,
  ];

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={style.root}>
      <div className={style.wrapper}>
        <div className={style.block1}>
          <div className={style.imgSlider} onDragStart={handleDragStart}>
            <ImgSlider imgUrl={imgUrls} />
          </div>
        </div>
        <div className={style.block2}>
          <div className={style.title}>{items.title}</div>
          <div className={style.rating}>
            <Rating
              initialValue={items.rating?.value || 0}
              readonly
              size={width > 754 ? 20 : 15}
            />{" "}
            <span>({items.rating?.count || 0})</span>
          </div>
          <Price card={items} />
          <Button card={items} />
        </div>
        <div className={style.block3}></div>
      </div>
      <div className={style.block4}>
        <div className={style.block4__buttons}>
          <DUnderline state={select} refs={{ refButtons1, refButtons2 }}>
            <button ref={refButtons1} onClick={() => setSelect(0)}>
              О товаре
            </button>
            <button ref={refButtons2} onClick={() => setSelect(1)}>
              Отзывы покупателей
            </button>
          </DUnderline>
        </div>
        {select === 0 && <About />}
        {select === 1 && <Reviews items={items} width={width} />}
      </div>
    </div>
  );
};

export default Product;
