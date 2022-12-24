import React from "react";
import { useSelector } from "react-redux";
import cn from "classnames";

import { selectSubCategory } from "../../../store/slices/category/selectors";
import { categoryType } from "../../../store/slices/category/types";

import style from "./index.module.scss";

const PopupCategory: React.FC<{
  setPopupCategoryId: React.SetStateAction<any>;
  defValue?: {id: number, value: string};
}> = ({ setPopupCategoryId, defValue }) => {
  const [activeLi, setActiveLi] = React.useState(false);
  const [popupValue, setPopupValue] = React.useState("");
  const refpopup = React.useRef<any>();
  const subCategory = useSelector(selectSubCategory);

  React.useEffect(() => {
    if (defValue) {
      setPopupValue(defValue.value);
      setPopupCategoryId(defValue.id);
    }
  }, []);

  React.useEffect(() => {
    const handleClickBody = (e: MouseEvent) => {
      const _e = e as MouseEvent & {
        path: Node[];
      };
      if (refpopup.current && !_e.path.includes(refpopup.current))
        setActiveLi(false);
    };
    document.body.addEventListener("click", handleClickBody);

    return () => {
      document.body.removeEventListener("click", handleClickBody);
    };
  }, []);

  const onClickLi = (item: categoryType) => {
    setPopupValue(item.name);
    setPopupCategoryId(item.id);
    setActiveLi(false);
  };

  return (
    <div className={style.popup} ref={refpopup}>
      <div>
        <input
          type="text"
          name="category"
          placeholder={"Категория"}
          value={popupValue}
          onChange={(e) => setPopupValue(e.target.value)}
          onFocus={() => setActiveLi(true)}
        />
        <span>{">"}</span>
      </div>
      <div className={cn({ [style.active]: activeLi })}>
        <ul>
          {subCategory
            .filter((obj: categoryType) =>
              obj.name.toLowerCase().includes(popupValue.toLowerCase())
            )
            .map((item: categoryType) => (
              <li key={item.id} onClick={() => onClickLi(item)}>
                {item.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PopupCategory;
