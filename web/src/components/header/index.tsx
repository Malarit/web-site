import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import { useWindowDimensions } from "../../utils/getWindowSize";
import { selectAllCard } from "../../store/slices/basket/selectors";
import { selectUser } from "../../store/slices/user/selectors";
import { fetchCategory } from "../../store/slices/category/slice";
import { getProduct } from "../../utils/fetch";
import { card } from "../../store/slices/product/types";

import Search from "../search";
import Drop from "./drop";
import Authorization from "./authorization";

import appStyle from "../../app.module.scss";
import style from "./header.module.scss";

import heart from "../../assets/header/img/heart.svg";
import basket from "../../assets/header/img/basket.svg";
import whiteSearch from "../../assets/header/img/whiteSearch.svg";
import authorization from "../../assets/header/img/account.svg";
import UserInfo from "./userInfo";

const Header: React.FC = () => {
  const [activeMenu, setActiveMenu] = React.useState<boolean>(false);
  const [activeAuthorization, setActiveAuthorization] =
    React.useState<boolean>(false);
  const refMenu = React.useRef<any>();
  const refMenuDrop = React.useRef<any>();
  const refAuthorization = React.useRef<any>();
  const refImgAuthorization = React.useRef<any>();
  const CountCard = useSelector(selectAllCard);
  const user = useSelector(selectUser);
  const { width } = useWindowDimensions();

  const [product, setProduct] = React.useState<{
    item: card[];
    pages: number;
  }>();

  const dispatch = useDispatch();
  const refFlag = React.useRef<boolean>(true);
  React.useEffect(() => {
    if (refFlag.current) dispatch<any>(fetchCategory());
    refFlag.current = false;
  }, []);

  React.useEffect(() => {
    const handleClickBody = (e: MouseEvent) => {
      const _e = e as MouseEvent & {
        path: Node[];
      };
      if (
        refMenu.current &&
        !_e.path.includes(refMenu.current) &&
        refMenuDrop.current &&
        !_e.path.includes(refMenuDrop.current)
      )
        setActiveMenu(false);
      if (
        refAuthorization.current &&
        !_e.path.includes(refAuthorization.current) &&
        refImgAuthorization.current &&
        !_e.path.includes(refImgAuthorization.current)
      )
        setActiveAuthorization(false);
    };
    document.body.addEventListener("click", handleClickBody);

    return () => {
      document.body.removeEventListener("click", handleClickBody);
    };
  });

  const _getProduct = React.useCallback(
    debounce((event) => {
      getProduct(setProduct, { text: event });
    }, 200),
    []
  );

  return (
    <header className={style.root}>
      <div className={cn(style.wrapper, appStyle.container)}>
        <div className={style.logo}>
          <Link to="/">oSite</Link>
        </div>
        <div
          onClick={() => setActiveMenu(!activeMenu)}
          className={`${style.button} ${activeMenu ? style.active : ""}`}
          ref={refMenu}
        >
          <div></div>
          <div></div>
          <div></div>
          {width > 1000 ? <span>Каталог</span> : ""}
        </div>
        <div className={style.search}>
          <Search
            icon={whiteSearch}
            getText={(e) => {
              _getProduct(e);
            }}
            dropValue={product?.item}
            drop
          />
        </div>

        <div className={style.icons}>
          <div>
            <Link to="/favourite">
              <img src={heart} alt="" />
            </Link>
          </div>
          <div>
            <img
              ref={refImgAuthorization}
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
        </div>
        {activeAuthorization && (
          <div className={style.user} ref={refAuthorization}>
            {user ? (
              <UserInfo user={user} state={setActiveAuthorization} />
            ) : (
              <Authorization />
            )}
          </div>
        )}
      </div>
      <Drop
        ref={refMenuDrop}
        active={activeMenu}
        setActiveMenu={setActiveMenu}
      />
    </header>
  );
};

export default Header;
