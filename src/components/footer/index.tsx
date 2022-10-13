import React from "react";

import cn from "classnames";

import style from "./index.module.scss";
import appStyle from "../../app.module.scss";

const Footer: React.FC = () => {
  return (
    <div className={style.root}>
      <div className={cn(style.wrapper, appStyle.container)}>
        <div>
          <h3>
            <a href="">О компании</a>
          </h3>
          <ul>
            <li>
              <a href="">Вакансии в компании</a>
            </li>
            <li>
              <a href="">Контакты</a>
            </li>
            <li>
              <a href="">Новости</a>
            </li>
            <li>
              <a href="">Пользовательское соглашение</a>
            </li>
            <li>
              <a href="">Политика обработки персональных данных</a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Покупателю</h3>
          <ul>
            <li>
              <a href="">Помощь покупателю</a>
            </li>
            <li>
              <a href="">Доставка</a>
            </li>
            <li>
              <a href="">Оплата</a>
            </li>
            <li>
              <a href="">Возврат</a>
            </li>
            <li>
              <a href="">Акции</a>
            </li>
          </ul>
        </div>
        <div className={style.social}>
          <div>Заказывайте товары круглосуточно и задавайте вопросы.</div>
          <div>+7 495 555 55 55</div>
          <div>
            <a href="">
              <img src="" alt="" />
            </a>
            <a href="">
              <img src="" alt="" />
            </a>
            <a href="">
              <img src="" alt="" />
            </a>
            <a href="">
              <img src="" alt="" />
            </a>
            <a href="">
              <img src="" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
