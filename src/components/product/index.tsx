import React from "react";
import ImageGallery from "react-image-gallery";
import { useWindowDimensions } from "../../utils/getWindowSize";

import { Rating } from "react-simple-star-rating";

import style from "./index.module.scss";
import "react-image-gallery/styles/scss/image-gallery.scss";

const handleDragStart = (e: React.DragEvent<HTMLDivElement>) =>
  e.preventDefault();

const Product: React.FC<{ items: any }> = ({ items }) => {
  const { width } = useWindowDimensions();
  const images = [
    {
      original: items.imgUrl,
      thumbnail: items.imgUrl,
    },
    {
      original: items.imgUrl,
      thumbnail: items.imgUrl,
    },
    {
      original: items.imgUrl,
      thumbnail: items.imgUrl,
    },
  ];
  console.log(items.rating)
  return (
    <div className={style.root}>
      <div className={style.title}>{items.title}</div>
      <div className={style.wrapper}>
        <div className={style.block1}>
          <div className={style.rating}>
            <Rating
              initialValue={items.rating?.value || 0}
              readonly
              size={width > 754 ? 20 : 15}
            /> <span>({items.rating?.count || 0})</span>
          </div>
          <div className={style.img} onDragStart={handleDragStart}>
            <ImageGallery
              showPlayButton={false}
              useBrowserFullscreen={false}
              showFullscreenButton={false}
              showNav={false}
              items={images}
            />
          </div>
        </div>
        <div className={style.block2}>
          <div>Описание Описание Описание</div>
          <div>Описание Описание Описание</div>
          <div>Описание Описание Описание</div>
          <div>Описание Описание Описание</div>
          <div>Описание Описание Описание</div>
          <div>Описание Описание Описание</div>
        </div>
        <div className={style.block3}>
          <div>Описание Описание Описание</div>
          <div>Описание Описание Описание</div>
          <div>Описание Описание Описание</div>
          <div>Описание Описание Описание</div>
          <div>Описание Описание Описание</div>
          <div>Описание Описание Описание</div>
        </div>
      </div>
    </div>
  );
};

export default Product;
