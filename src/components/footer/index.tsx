import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import style from "./index.module.scss";
import appStyle from "../../app.module.scss";

const Footer: React.FC = () => {
  return (
    <div className={style.root}>
      <div className={cn(style.wrapper, appStyle.container)}>
        <div>
          <h3>
            <Link to="/">О компании</Link>
          </h3>
          <ul>
            <li>
              <Link to="/">Вакансии в компании</Link>
            </li>
            <li>
              <Link to="/">Контакты</Link>
            </li>
            <li>
              <Link to="/">Новости</Link>
            </li>
            <li>
              <Link to="/">Пользовательское соглашение</Link>
            </li>
            <li>
              <Link to="/">Политика обработки персональных данных</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Покупателю</h3>
          <ul>
            <li>
              <Link to="/">Помощь покупателю</Link>
            </li>
            <li>
              <Link to="/">Доставка</Link>
            </li>
            <li>
              <Link to="/">Оплата</Link>
            </li>
            <li>
              <Link to="/">Возврат</Link>
            </li>
            <li>
              <Link to="/">Акции</Link>
            </li>
          </ul>
        </div>
        <div className={style.social}>
          <div>Заказывайте товары круглосуточно и задавайте вопросы.</div>
          <div>+7 495 555 55 55</div>
          <div>
            <Link to="/">
              <img src="" alt="" />
            </Link>
            <Link to="/">
              <img src="" alt="" />
            </Link>
            <Link to="/">
              <img src="" alt="" />
            </Link>
            <Link to="/">
              <img src="" alt="" />
            </Link>
            <Link to="/">
              <img src="" alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
