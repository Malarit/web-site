import React from "react";
import { useWindowDimensions } from "../../utils/getWindowSize";
import { Rating } from "react-simple-star-rating";

import Button from "./card/button";
import Price from "./card/price";
import Reviews from "./reviews";
import About from "./about";
import ImgSlider from "./imgSlider";
import DUnderline from "./dUnderline";

import { card } from "../../store/slices/product/types";

import style from "./index.module.scss";

const handleDragStart = (e: React.DragEvent<HTMLDivElement>) =>
  e.preventDefault();

const Product: React.FC<{ item: card }> = ({ item }) => {
  const [select, setSelect] = React.useState<number>(0);
  const { width } = useWindowDimensions();
  const refButtons1 = React.useRef<any>();
  const refButtons2 = React.useRef<any>();

  const imgUrls = item.imgUrl.map((obj) => `http://127.0.0.1:5000` + obj.url);

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
          <div className={style.title}>{item.title}</div>
          <div className={style.rating}>
            <Rating
              initialValue={item.rating?.value || 0}
              readonly
              size={width > 754 ? 20 : 15}
            />{" "}
            <span>({item.rating?.count || 0})</span>
          </div>
          <Price card={item} />
          <Button card={item} />
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
        {select === 0 && <About item={item}/>}
        {select === 1 && <Reviews items={item} width={width} />}
      </div>
    </div>
  );
};

export default Product;
