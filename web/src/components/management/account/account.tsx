import React from "react";
import {
  getAdmin,
  postAdmin,
  postAdminRegistration,
} from "../../../utils/fetch";

import style from "./index.module.scss";

const postData = async (
  e: React.FormEvent,
  flag: string,
  state?: React.SetStateAction<any>
) => {
  const target = e.target as EventTarget & {
    [key: string]: HTMLInputElement;
  };
  e.preventDefault();

  if (flag.includes("authorization")) {
    const data = {
      email: target.email.value,
      password: target.password.value,
    };

    await postAdmin(data);
    await getAdmin(state);
  }
  if (flag.includes("registration")) {
    const data = {
      username: target.username.value,
      email: target.email.value,
      password: target.password.value,
      isAdmin: true,
    };

    await postAdminRegistration(data);
  }
};

export const Authorization: React.FC<{ state?: React.SetStateAction<any> }> = ({
  state,
}) => {
  return (
    <div
      className={style.root}
      onSubmit={(e) => postData(e, "authorization", state)}
    >
      <form action="">
        <label htmlFor="email">Почта</label>
        <input type="text" name="email" />
        <label htmlFor="email">Пароль</label>
        <input type="password" name="password" />
        <div>
          <button>Войти</button>
        </div>
      </form>
    </div>
  );
};

export const Registration: React.FC = () => {
  return (
    <div className={style.root}>
      <form onSubmit={(e) => postData(e, "registration")}>
        <label htmlFor="email">Логин</label>
        <input type="text" name="username" />
        <label htmlFor="email">Почта</label>
        <input type="text" name="email" />
        <label htmlFor="email">Пароль</label>
        <input type="text" name="password" />
        <div>
          <button>Войти</button>
        </div>
      </form>
    </div>
  );
};
