import React from "react";
import { debounce } from "lodash";
import cn from "classnames";

import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../store/slices/category/slice";
import { fetchProducts } from "../../store/slices/product/slice";
import { selectAllCategory } from "../../store/slices/category/selectors";

import { drawNestedSetsTree } from "../../utils/drawNestedSetsTree";
import { categoryType } from "../../store/slices/category/types";
import { postCategory } from "../../utils/fetch";
import { deleteCategory } from "../../utils/fetch";

import plus from "../../assets/basket/plus.svg";
import trashcan from "../../assets/trashcan.svg";

import style from "./index.module.scss";

const GetTree: React.FC<{
  setActiveCategory: any;
  activeCategory: categoryType | undefined;
}> = (props) => {
  const { setActiveCategory, activeCategory } = props;
  const [activeInput, setActiveInput] = React.useState<number>(-1);
  const refDiv = React.useRef<any>();
  const refInputSubCategory = React.useRef<any>();
  const refInputCategory = React.useRef<any>();
  const refBtn = React.useRef<any>();
  const refFlag = React.useRef<boolean>(true);
  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) =>
    e.preventDefault();
  const dispatch = useDispatch();
  const category = useSelector(selectAllCategory);

  React.useEffect(() => {
    const handleClickBody = (e: MouseEvent) => {
      const _e = e as MouseEvent & {
        path: Node[];
      };
      if (refDiv.current && !_e.path.includes(refDiv.current))
        setActiveInput(-1);
    };
    document.body.addEventListener("click", handleClickBody);

    return () => {
      document.body.removeEventListener("click", handleClickBody);
    };
  }, []);

  React.useEffect(() => {
    if (category.length > 0 && refFlag.current) {
      const item = category[0][0];
      requestProduct(item);
      setActiveCategory(item);
      refFlag.current = false;
    }
  }, [category]);

  const requestProduct = (item: categoryType) => {
    const { left, right, tree_id } = item;
    dispatch<any>(fetchProducts({ left, right, tree_id }));
    setActiveCategory(item);
  };

  const requestCategory = React.useCallback(
    debounce(() => {
      dispatch<any>(fetchCategory());
    }, 200),
    []
  );

  const PostCategory = (parent_id: number | null, ref: any) => {
    const name = ref.current.value;
    if (name !== "") postCategory(parent_id, name);
    setActiveInput(-1);
    requestCategory();
  };

  const DeleteCategory = (id: number) => {
    deleteCategory(id);
    requestCategory();
  };

  const ListItem: React.FC<{ item: categoryType }> = ({ item }) => {
    return (
      <li key={item.id}>
        <div>
          <span onClick={() => DeleteCategory(item.id)}>
            <img onDragStart={handleDragStart} src={trashcan} alt="" />
          </span>
          <div
            className={cn({ [style.active]: activeCategory?.id == item.id })}
            onClick={() => requestProduct(item)}
          >
            {item.name}
          </div>
          <span onClick={() => setActiveInput(item.id)}>
            <img onDragStart={handleDragStart} src={plus} alt="" />
          </span>
        </div>
        {activeInput === item.id && (
          <div>
            <input autoFocus type="text" ref={refInputSubCategory} />
            <button onClick={() => PostCategory(item.id, refInputSubCategory)}>
              {"->"}
            </button>
          </div>
        )}
      </li>
    );
  };

  const getTree = () => {
    let m: JSX.Element[][] = [];
    for (let c of category) {
      m.push(drawNestedSetsTree(c, ListItem));
    }
    return m;
  };

  return (
    <>
      <div ref={refDiv}>
        <div>
          Категории
          <span onClick={() => setActiveInput(0)}>
            <img onDragStart={handleDragStart} src={plus} alt="" />
          </span>
        </div>
        {activeInput === 0 && (
          <div>
            <input autoFocus type="text" ref={refInputCategory} />
            <button
              onClick={() => PostCategory(null, refInputCategory)}
              ref={refBtn}
            >
              {"->"}
            </button>
          </div>
        )}
        <ul>{getTree()}</ul>
      </div>
    </>
  );
};

export default GetTree;
