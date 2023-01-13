import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { categoryType } from "../../store/slices/category/types";
import {
  selectAllCategoryFlat,
  selectAllCategory,
} from "../../store/slices/category/selectors";

import { drawNestedSetsTree } from "../../utils/drawNestedSetsTree";
import { useWindowDimensions } from "../../utils/getWindowSize";

import style from "./drop.module.scss";
import appStyle from "../../app.module.scss";
import Tree from "../category/tree";

type props = {
  active: boolean;
  setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const Drop = React.forwardRef<any, props>(({ active, setActiveMenu }, ref) => {
  const categoryFlat = useSelector(selectAllCategoryFlat);
  const category = useSelector(selectAllCategory);
  const [catalog, setCatalog] = React.useState<any>();
  const [activeCategory, setActiveCategory] = React.useState<number>(0);
  const linkTo = "/catalog?category=";

  const ListItem: React.FC<{ item: categoryType }> = ({ item }) => {
    return (
      <Link onClick={() => setActiveMenu(false)} to={linkTo + `${item.id}`}>
        <li key={item.id}>{item.name}</li>
      </Link>
    );
  };

  const getCatalog = (
    left: number,
    right: number,
    tree_id: number,
    level: number
  ) => {
    return (
      <>
        {categoryFlat
          .filter(
            (obj) =>
              obj.left > left &&
              obj.right < right &&
              obj.tree_id == tree_id &&
              obj.level == level + 1
          )
          .map((obj) => (
            <div key={obj.id}>
              <>
                <Link
                  onClick={() => setActiveMenu(false)}
                  to={linkTo + `${obj.id}`}
                >
                  {obj.name}
                </Link>
                {getCatalog(obj.left, obj.right, obj.tree_id, obj.level)}
              </>
            </div>
          ))}
      </>
    );
  };

  const getTreeCatalog = () => {
    let m: JSX.Element[][] = [];
    for (let c of category) {
      m.push(drawNestedSetsTree(c, ListItem));
    }
    return m;
  };

  const { width } = useWindowDimensions();

  return (
    <div
      ref={ref}
      className={cn({ [style.root]: true, [style.active]: active })}
    >
      <div className={appStyle.container}>
        <div className={style.dropBlock}>
          {width < 1000 ? (
            <>{<Tree category={category} />}</>
          ) : (
            <>
              <div>
                {categoryFlat
                  .filter((obj) => obj.parent_id == null)
                  .map((obj) => (
                    <Link
                      key={obj.id}
                      onClick={() => setActiveMenu(false)}
                      to={linkTo + `${obj.id}`}
                    >
                      <div
                        className={cn({
                          [style.active]: obj.id == activeCategory,
                        })}
                        onMouseEnter={() => {
                          setCatalog(
                            getCatalog(
                              obj.left,
                              obj.right,
                              obj.tree_id,
                              obj.level
                            )
                          );
                          setActiveCategory(obj.id);
                        }}
                      >
                        {obj.name}
                      </div>
                    </Link>
                  ))}
              </div>
              <div>{catalog}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default Drop;
