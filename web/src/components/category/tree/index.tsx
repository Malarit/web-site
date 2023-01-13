import React from "react";
import { Link } from "react-router-dom";

import { categoryType } from "../../../store/slices/category/types";
import { drawNestedSetsTree } from "../../../utils/drawNestedSetsTree";

import style from "./index.module.scss";

const Tree: React.FC<{
  category: categoryType[][];
  getChildCategory?: (e: categoryType) => void;
  activeLi?: number;
  getActiveUl?: React.SetStateAction<any>;
  _setActiveUl?: number[];
}> = ({ category, getChildCategory, activeLi, getActiveUl, _setActiveUl }) => {
  const [activeUl, setActiveUl] = React.useState<any[]>([]);
  const parents: number[] = [];

  React.useEffect(() => {
    if (_setActiveUl) setActiveUl(_setActiveUl);
  }, [_setActiveUl]);

  const onClickLi = (item: any) => {
    if (activeUl.includes(item.id)) {
      setActiveUl(activeUl.filter((p) => p !== item.id));
    } else {
      setActiveUl((array) => [...array, item.id]);
    }
    if (getActiveUl) {
      getActiveUl(activeUl);
    }
  };

  const ListItem: React.FC<{ item: categoryType }> = ({ item }) => {
    return (
      <>
        {parents?.includes(item.id) ? (
            <li
              style={{ color: activeLi == item.id ? "#ff00d9" : "" }}
              key={item.id}
              onClick={() => {
                onClickLi(item);
                getChildCategory && getChildCategory!(item);
              }}
            >
              {item.name}
              {parents?.includes(item.id) && <span>{">"}</span>}
            </li>
        ) : (
          <Link to={`/catalog?category=${item.id}`}>
            <li
              style={{ color: activeLi == item.id ? "#ff00d9" : "" }}
              key={item.id}
              onClick={() => {
                onClickLi(item);
                getChildCategory && getChildCategory!(item);
              }}
            >
              {item.name}
              {parents?.includes(item.id) && <span>{">"}</span>}
            </li>
          </Link>
        )}
      </>
    );
  };

  const getTree = () => {
    let m: JSX.Element[][] = [];
    for (let c of category) {
      m.push(drawNestedSetsTree(c, ListItem, style, activeUl, parents));
    }
    return m;
  };
  return <div className={style.root}>{getTree()}</div>;
};

export default Tree;
