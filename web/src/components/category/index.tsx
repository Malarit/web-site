import React from "react";

import Card, { card } from "./card";

import style from "./index.module.scss";

type category = {
  title: string;
  card: card[];
};

const Category: React.FC<category> = React.memo(({ title, card }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>{title}</div>
      <div className={style.root}>
        {card.map((item, id) => (
          <Card key={id} {...item} />
        ))}
      </div>
    </div>
  );
});

export default Category;
