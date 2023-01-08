import React from "react";
import { Rating } from "react-simple-star-rating";
import { useSelector } from "react-redux";

import { useWindowDimensions } from "../../utils/getWindowSize";
import { selectUser } from "../../store/slices/user/selectors";

import Button from "./card/button";
import Price from "./card/price";
import Reviews from "./reviews";
import About from "./about";
import ImgSlider from "./imgSlider";
import DUnderline from "./dUnderline";
import Feedback from "./feedback";

import { card } from "../../store/slices/product/types";

import style from "./index.module.scss";

const handleDragStart = (e: React.DragEvent<HTMLDivElement>) =>
  e.preventDefault();

const Product: React.FC<{ item: card }> = ({ item }) => {
  const [select, setSelect] = React.useState<number>(0);
  const { width } = useWindowDimensions();
  const user = useSelector(selectUser);

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
            />
            <span>({item.rating?.count || 0})</span>
          </div>
          <Price card={item} />
          <Button card={item} />
        </div>
        <div className={style.block3}></div>
      </div>
      <div className={style.block4}>
        <div className={style.block4__buttons}>
          <DUnderline state={select} styleDiv={style.underline}>
            <button onClick={() => setSelect(0)}>О товаре</button>
            <button onClick={() => setSelect(1)}>Отзывы покупателей</button>
            {user ? (
              <button onClick={() => setSelect(2)}>Оставить отзыв</button>
            ) : (
              <></>
            )}
          </DUnderline>
        </div>
        {select === 0 && <About item={item} />}
        {select === 1 && <Reviews item={item} width={width} user_id={user?.id}/>}
        {select === 2 && user && <Feedback item={item} user_id={user.id} />}
      </div>
    </div>
  );
};

export default Product;
