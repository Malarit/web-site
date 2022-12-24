import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchProducts } from "../store/slices/product/slice";
import { fetchCategory } from "../store/slices/category/slice";
import {
  selectByDiscount,
  selectByNotDiscount,
} from "../store/slices/product/selectors";

import Slider from "../components/banner/slider";
import Category from "../components/category";
import Offers from "../components/product/offers";
import Banner from "../components/banner";
import Subscribe from "../components/subscribe";

import appStyle from "../app.module.scss";

import OffersImg from "../assets/offers/offers.webp";
import bannerTable from "../assets/banner/b3.webp";
import bannerPhone from "../assets/banner/b3-2.webp";
import categoryImg1 from "../assets/category/milk.webp";
import categoryImg2 from "../assets/category/meat.webp";
import sliderImg from "../assets/banner/b.webp";
import sliderImg2 from "../assets/banner/b2.webp";

import "react-alice-carousel/lib/scss/alice-carousel.scss";
import "../components/carousel/carousel.scss";


import { fetchUser } from "../store/slices/user/slice";
import { RootState } from "../store/store";

const sliderList = [
  sliderImg,
  sliderImg2,
  sliderImg,
  sliderImg2,
  sliderImg,
  sliderImg2,
  sliderImg,
];

const categoryList = [
  { imgUrl: categoryImg1, title: "Молоко, сыр, яйцо" },
  { imgUrl: categoryImg2, title: "Мясо, птица, колбасы" },
  { imgUrl: categoryImg1, title: "Молоко, сыр, яйцо" },
  { imgUrl: categoryImg2, title: "Мясо, птица, колбасы" },
  { imgUrl: categoryImg1, title: "Молоко, сыр, яйцо" },
  { imgUrl: categoryImg2, title: "Мясо, птица, колбасы" },
  { imgUrl: categoryImg1, title: "Молоко, сыр, яйцо" },
  { imgUrl: categoryImg2, title: "Мясо, птица, колбасы" },
  { imgUrl: categoryImg1, title: "Молоко, сыр, яйцо" },
  { imgUrl: categoryImg2, title: "Мясо, птица, колбасы" },
];

const Home: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  let flag = React.useRef(true);
  React.useEffect(() => {
    if (flag.current) dispatch<any>(fetchProducts({ discount: 0 }));
    dispatch<any>(fetchCategory());
    // dispatch<any>(fetchUser());
    flag.current = false;
  }, []);

  const user = useSelector((state: RootState) => state.userReducer.user);
  console.log(user);

  const productSale = useSelector(selectByDiscount);
  const product = useSelector(selectByNotDiscount);

  return (
    <div className={appStyle.container}>
      <Slider imgUrl={sliderList} />
      <Category title={"Топ категорий"} card={categoryList} />
      <Offers
        title="Наши спецпредложения"
        imgUrl={OffersImg}
        card={productSale}
      />
      <Banner imgUrlTable={bannerTable} imgUrlPhone={bannerPhone} />
      <Offers title="Часто покупают" imgUrl={OffersImg} card={product} />
      <Banner imgUrlTable={bannerTable} imgUrlPhone={bannerPhone} />
      <Subscribe />
    </div>
  );
});

export default Home;
