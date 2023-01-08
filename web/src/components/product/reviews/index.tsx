import React from "react";
import { Rating } from "react-simple-star-rating";

import { card } from "../../../store/slices/product/types";
import { getReviews, postAssessment } from "../../../utils/fetch";

import style from "./index.module.scss";

import like from "../../../assets/product/dislike.svg";
import blueLike from "../../../assets/product/blue-dislike.svg";

type reviews = {
  id: number;
  product_id: number;
  user_id: 1;
  text: string;
  value: number;
  username: string;
  date: string;
  like: number;
  dislike: number;
  likeIt: boolean;
};

const handleDragStart = (e: React.DragEvent<HTMLImageElement>) =>
  e.preventDefault();

const Reviews: React.FC<{
  item: card;
  width: number;
  user_id: number | undefined;
}> = (props) => {
  const { item, user_id } = props;
  const refFlag = React.useRef<boolean>(true);
  const [reviews, setReviews] = React.useState<reviews[]>([]);

  React.useEffect(() => {
    if (refFlag.current) {
      getReviews(setReviews, item.id, user_id);
    }
    refFlag.current = false;
  }, []);

  const getRating = (i: number): JSX.Element | undefined => {
    let count = 0;
    if (i <= 5) {
      reviews.map((item) => {
        if (item.value == i) {
          count++;
        }
      });
      return (
        <>
          <Rating initialValue={i} readonly size={20} />
          <span>({count || 0}) отз.</span>
          {getRating(i + 1)}
        </>
      );
    }
  };

  const setAssessment = (likeIt: boolean, reviews_id: number) => {
    if (user_id) {
      postAssessment(likeIt, reviews_id, user_id);
      getReviews(setReviews, item.id, user_id);
    }
  };

  const getLikeImg = (obj: reviews, reverse: boolean) => {
    if (obj.likeIt != undefined) {
      if (reverse) return obj.likeIt ? like : blueLike;
      return obj.likeIt ? blueLike : like;
    }
    return like;
  };

  return (
    <div className={style.root}>
      <div className={style.sortStars}>
        <div>
          <div>Отзывы о товаре</div>
          <Rating initialValue={item.rating?.value || 0} readonly size={30} />
          <span>({item.rating?.count || 0}) отз.</span>
        </div>
        <div>
          <div>Показать по рейтингу</div>
          <div>{getRating(1)}</div>
        </div>
      </div>
      <div>
        {reviews.map((obj, id) => (

          
          <div key={id} className={style.feedback}>
            <div>
              <span>{obj.username}</span>
              <Rating initialValue={obj?.value || 0} readonly size={13} />
            </div>
            <div>{obj.text}</div>
            <div>
              <span>{reviews[0].date.split("T")[0]}</span>
              <span>
                <button onClick={() => setAssessment(true, obj.id)}>
                  <img
                    src={getLikeImg(obj, false)}
                    onDragStart={handleDragStart}
                    alt=""
                  />
                  <span>{obj.like}</span>
                </button>
                <button onClick={() => setAssessment(false, obj.id)}>
                  <img
                    src={getLikeImg(obj, true)}
                    onDragStart={handleDragStart}
                    alt=""
                  />
                  <span>{obj.dislike}</span>
                </button>
              </span>
            </div>
          </div>


        ))}
      </div>
    </div>
  );
};

export default Reviews;
