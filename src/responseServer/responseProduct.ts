import cardImg from "../assets/product/q.webp";
import { card } from "../store/slices/product/types";

const responseProduct = () => {
  let productList: card[] = [];

  for (let i = 0; i < 100; i++) {
    const sale = {
      id: i,
      title: "Творог Простоквашино 2% 200 г",
      price: 600,
      imgUrl: cardImg,
      rating: { value: 3, count: 20 },
      discount: 30,
    };
    const notSale = {
      id: i,
      title: "Творог Простоквашино 2% 200 г",
      price: 600,
      imgUrl: cardImg,
      rating: { value: 3, count: 20 },
    };

    Math.round(Math.random()) === 1
      ? productList.push(sale)
      : productList.push(notSale);
  }
  return { data: productList };
};

export default responseProduct;
