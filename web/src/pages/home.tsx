import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchProducts } from "../store/slices/product/slice";
import {
  selectAllProducts,
  selectByDiscount,
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

import "react-alice-carousel/lib/scss/alice-carousel.scss";
import "../components/carousel/carousel.scss";
import { getBannersBetween, getTopCategories } from "../utils/fetch";

export type subCategory = {
  id: number;
  url: string;
  category_id?: number;
}[];

const Home: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const refFlag = React.useRef<boolean>(true);
  const [category, setcategory] = React.useState<subCategory>([]);
  const [banners, setBanners] = React.useState<
    {
      id: number;
      url: string[];
      category_id?: number;
    }[]
  >([]);

  React.useEffect(() => {
    if (refFlag) {
      dispatch<any>(fetchProducts({ limit: 50 }));
      getTopCategories(setcategory);
      getBannersBetween(setBanners);
    }
  }, []);
  const productSale = useSelector(selectByDiscount);
  const product = useSelector(selectAllProducts);

  return (
    <div className={appStyle.container}>
      <Slider />
      <Category title={"Топ категорий"} card={category} />
      <Offers
        title="Наши спецпредложения"
        imgUrl={OffersImg}
        card={productSale}
      />
      <Banner {...banners[0]} />
      <Offers title="Часто покупают" imgUrl={OffersImg} card={product} />
      <Banner {...banners[1]} />
      <Subscribe />
    </div>
  );
});

export default Home;
