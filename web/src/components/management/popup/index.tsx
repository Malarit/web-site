import React from "react";
import cn from "classnames";

import style from "./index.module.scss";

type item = {
  id: number;
  name: string;
};

const Popup: React.FC<{
  placeholder: string;
  setPopupId: React.SetStateAction<any>;
  defValue?: { id: number; value: string };
  items: item[];
}> = ({ setPopupId, defValue, items, placeholder }) => {
  const [activeLi, setActiveLi] = React.useState(false);
  const [popupValue, setPopupValue] = React.useState("");
  const refpopup = React.useRef<any>();

  React.useEffect(() => {
    if (defValue) {
      setPopupValue(defValue.value);
      setPopupId(defValue.id);
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

  const onClickLi = (item: item) => {
    setPopupValue(item.name);
    setPopupId(item.id);
    setActiveLi(false);
  };

  return (
    <div className={style.popup} ref={refpopup}>
      <div>
        <input
          type="text"
          placeholder={placeholder}
          value={popupValue}
          onChange={(e) => setPopupValue(e.target.value)}
          onFocus={() => setActiveLi(true)}
        />
        <span>{">"}</span>
      </div>
      <div className={cn({ [style.active]: activeLi })}>
        <ul>
          {items
            .filter((obj: item) =>
              obj.name.toLowerCase().includes(popupValue.toLowerCase())
            )
            .map((item: item) => (
              <li key={item.id} onClick={() => onClickLi(item)}>
                {item.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Popup;
