import React from "react";
import { Rating } from "react-simple-star-rating";

import { card } from "../../../store/slices/product/types";

import { postReviews } from "../../../utils/fetch";

import style from "./index.module.scss";

const Feedback: React.FC<{ item: card; user_id: number }> = ({
  item,
  user_id,
}) => {
  const [rating, setRating] = React.useState(0);
  const [text, setText] = React.useState("");

  const postFeedBack = () => {
    postReviews(text, item.id, user_id, rating);
  };

  return (
    <div className={style.root}>
      <span>Отзыв</span>
      <Rating initialValue={0} size={30} onClick={(e) => setRating(e)} />
      <textarea
        onChange={(e) => setText(e.target.value)}
        cols={30}
        rows={10}
        maxLength={200}
      ></textarea>
      <button onClick={() => postFeedBack()}>Отправить</button>
    </div>
  );
};

export default Feedback;
