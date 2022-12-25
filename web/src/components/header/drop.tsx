import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { categoryType } from "../../store/slices/category/types";
import { selectAllCategory } from "../../store/slices/category/selectors";

import { drawNestedSetsTree } from "../../utils/drawNestedSetsTree";

import style from "./drop.module.scss";

const ListItem: React.FC<{ item: categoryType }> = ({ item }) => {
  return <li key={item.id}>{item.name}</li>;
};

const Drop: React.FC<{ active: boolean }> = ({ active }) => {
  const category = useSelector(selectAllCategory);

  const getTree = () => {
    let m: JSX.Element[][] = [];
    for (let c of category) {
      m.push(drawNestedSetsTree(c, ListItem));
    }
    return m;
  };

  return (
    <div className={cn({ [style.root]: true, [style.active]: active })}>
      <div className={style.container}>
        <div className={style.dropBlock}>{getTree()}</div>
        <div></div>
      </div>
    </div>
  );
};

export default Drop;
