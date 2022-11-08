import React from "react";
import { Rating } from "react-simple-star-rating";
import { card } from "../../../store/slices/product/types";

import style from "./index.module.scss";

import like from "../../../assets/product/dislike-svgrepo-com.svg";

const Reviews: React.FC<{ items: card; width: number }> = (props) => {
  const { items, width } = props;
  return (
    <div className={style.root}>
      <div className={style.sortStars}>
        <div>
          <div>Отзывы о товаре</div>
          <Rating
            initialValue={items.rating?.value || 0}
            readonly
            size={30}
          />{" "}
          <span>({items.rating?.count || 0}) отз.</span>
        </div>
        <div>
          <div>Показать по рейтингу</div>
          <div>
            <Rating
              initialValue={items.rating?.value || 0}
              readonly
              size={20}
            />{" "}
            <span>({items.rating?.count || 0}) отз.</span>{" "}
            <Rating
              initialValue={items.rating?.value || 0}
              readonly
              size={20}
            />{" "}
            <span>({items.rating?.count || 0}) отз.</span>{" "}
            <Rating
              initialValue={items.rating?.value || 0}
              readonly
              size={20}
            />{" "}
            <span>({items.rating?.count || 0}) отз.</span>{" "}
            <Rating
              initialValue={items.rating?.value || 0}
              readonly
              size={20}
            />{" "}
            <span>({items.rating?.count || 0}) отз.</span>
          </div>
        </div>
      </div>
      <div className={style.feedback}>
        <div>
          <span>Елена</span>
          <Rating initialValue={items.rating?.value || 0} readonly size={13} />
        </div>
        <div>
          gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
        </div>
        <div>
          <span>26 июл. 2022 г.</span>
          <span>
            <button><img src={like} alt="" /><span>0</span></button>
            <button><img src={like} alt="" /><span>0</span></button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
