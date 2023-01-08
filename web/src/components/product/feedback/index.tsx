import React from "react";
import { Rating } from "react-simple-star-rating";

import { card } from "../../../store/slices/product/types";

import { deleteReview, getReview, postReviews } from "../../../utils/fetch";
import { reviews } from "../types";
import FeedbackCard from "../feedbackCard";

import like from "../../../assets/product/dislike.svg";

import style from "./index.module.scss";

const Feedback: React.FC<{ item: card; user_id: number }> = ({
  item,
  user_id,
}) => {
  const [rating, setRating] = React.useState(0);
  const [text, setText] = React.useState("");
  const [review, setReview] = React.useState<reviews | undefined>();
  const refFlag = React.useRef<boolean>(true);

  React.useEffect(() => {
    if (refFlag.current) getReview(setReview, item.id, user_id);
    refFlag.current = false;
  }, []);

  const postFeedBack = () => {
    postReviews(text, item.id, user_id, rating);
    getReview(setReview, item.id, user_id);
  };

  const delReview = async () => {
    await deleteReview(item.id, user_id);
    setReview(undefined)
  };

  return (
    <div className={style.root}>
      {review ? (
        <>
          <FeedbackCard
            obj={review}
            like={like}
            dislike={like}
            setAssessment={() => {}}
          />
          <button onClick={() => delReview()}>Удалить отзыв</button>
        </>
      ) : (
        <>
          <span>Отзыв</span>
          <Rating initialValue={0} size={30} onClick={(e) => setRating(e)} />
          <textarea
            onChange={(e) => setText(e.target.value)}
            cols={30}
            rows={10}
            maxLength={200}
          ></textarea>
          <button onClick={() => postFeedBack()}>Отправить</button>
        </>
      )}
    </div>
  );
};

export default Feedback;
