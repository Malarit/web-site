import React from 'react'
import { Rating } from "react-simple-star-rating";

import { reviews } from "../types";

import style from "./index.module.scss" 

const handleDragStart = (e: React.DragEvent<HTMLImageElement>) =>
  e.preventDefault();

const FeedbackCard: React.FC<{
  obj: reviews;
  like: string;
  dislike: string;
  setAssessment: (flag: boolean, id: number) => void;
}> = ({ obj, like, dislike, setAssessment }) => {
  return (
    <div className={style.feedback}>
      <div>
        <span>{obj.username}</span>
        <Rating initialValue={obj?.value || 0} readonly size={13} />
      </div>
      <div>{obj.text}</div>
      <div>
        <span>{obj.date.split("T")[0]}</span>
        <span>
          <button onClick={() => setAssessment(true, obj.id)}>
            <img src={like} onDragStart={handleDragStart} alt="" />
            <span>{obj.like}</span>
          </button>
          <button onClick={() => setAssessment(false, obj.id)}>
            <img src={dislike} onDragStart={handleDragStart} alt="" />
            <span>{obj.dislike}</span>
          </button>
        </span>
      </div>
    </div>
  );
};

export default FeedbackCard;
