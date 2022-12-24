import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useSelector} from "react-redux";



import { useWindowDimensions } from "../../utils/getWindowSize";
import { selectAllCard } from "../../store/slices/basket/selectors";

import Search from "../search";
import Drop from "./drop";
import Authorization from "./authorization";

import appStyle from "../../app.module.scss";
import style from "./header.module.scss";

import heart from "../../assets/header/img/heart.svg";
import basket from "../../assets/header/img/basket.svg";
import search from "../../assets/header/img/search.svg";
import whiteSearch from "../../assets/header/img/whiteSearch.svg";
import authorization from "../../assets/header/img/account.svg";

const Header: React.FC = () => {
  const [activeMenu, setActiveMenu] = React.useState<boolean>(false);
  const [activeSearch, setActiveSearch] = React.useState<boolean>(false);
  const [activeAuthorization, setActiveAuthorization] =
    React.useState<boolean>(false);

  const CountCard = useSelector(selectAllCard);

  const { width } = useWindowDimensions();
  
  return (
    <header className={style.root}>
      <div className={cn(style.wrapper, appStyle.container)}>
        <div className={style.logo}>
          <Link to="/">oooood</Link>
        </div>
        <div
          onClick={() => setActiveMenu(!activeMenu)}
          className={`${style.button} ${activeMenu ? style.active : ""}`}
        >
          <div></div>
          <div></div>
          <div></div>
          {width > 1000 ? <span>Каталог</span> : ""}
        </div>
        <Drop active={activeMenu} />
        <div className={style.search}>
          <Search icon={whiteSearch} />
        </div>

        <div className={style.icons}>
          <div>
            <Link to="/basket">
              <img src={heart} alt="" />
            </Link>
          </div>
          <div>
            <img
              onClick={() => setActiveAuthorization(!activeAuthorization)}
              src={authorization}
              alt=""
            />
          </div>
          <div>
            <Link to="/basket">
              <img src={basket} alt="" />
              <span>{CountCard}</span>
            </Link>
          </div>
          {width > 1000 ? (
            <></>
          ) : (
            <div onClick={() => setActiveSearch(!activeSearch)}>
              <img src={search} alt="" />
            </div>
          )}
        </div>
        {activeAuthorization && <Authorization />}
      </div>
    </header>
  );
};

export default Header;
