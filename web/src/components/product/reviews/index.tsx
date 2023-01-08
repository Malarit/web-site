import React from "react";
import { Rating } from "react-simple-star-rating";

import { card } from "../../../store/slices/product/types";
import { getReviews, postAssessment } from "../../../utils/fetch";
import { reviews } from "../types";

import FeedbackCard from "../feedbackCard";

import style from "./index.module.scss";

import like from "../../../assets/product/dislike.svg";
import blueLike from "../../../assets/product/blue-dislike.svg";

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
          <FeedbackCard
            key={id}
            obj={obj}
            like={getLikeImg(obj, false)}
            dislike={getLikeImg(obj, true)}
            setAssessment={(flag, id) => setAssessment(flag, id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
