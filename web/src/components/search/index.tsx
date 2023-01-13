import React from "react";
import { card } from "../../store/slices/product/types";
import { useNavigate } from "react-router-dom";

import style from "./index.module.scss";

const Search: React.FC<{
  icon?: string;
  text?: string;
  drop?: boolean;
  getText?: (e: string) => void;
  setText?: string;
  dropValue?: card[];
}> = ({ icon, getText, setText, text, drop, dropValue }) => {
  const [active, setActive] = React.useState<boolean>(false);
  const refInput = React.useRef<any>();
  const refDrop = React.useRef<any>();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleClickBody = (e: MouseEvent) => {
      const _e = e as MouseEvent & {
        path: Node[];
      };
      if (
        refInput.current &&
        !_e.path.includes(refInput.current) &&
        refDrop.current &&
        !_e.path.includes(refDrop.current)
      )
        setActive(false);
    };
    document.body.addEventListener("click", handleClickBody);

    return () => {
      document.body.removeEventListener("click", handleClickBody);
    };
  }, []);

  const replace = (item: card) => {
    return item.title.replace(/[\ \%\* ]/g, (item) => {
      if (item === " ") return "-";
      else if (item === "%") return "";
      else return item;
    });
  };

  return (
    <div className={`${style.root} `}>
      <div>
        <input
          type="text"
          onChange={(e) => {
            drop && setActive(true);
            getText && getText(e.target.value);
          }}
          onClick={() =>
            drop && dropValue && dropValue!.length > 0 && setActive(true)
          }
          ref={refInput}
        />
        <button>{icon ? <img src={icon} alt="" /> : text}</button>
      </div>
      {drop && active && (
        <div ref={refDrop}>
          {dropValue?.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                navigate(`/catalog/details/${item.id}/${replace(item)}`, {
                  replace: true,
                });
                setActive(false);
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
