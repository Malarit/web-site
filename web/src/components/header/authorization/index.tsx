import React from "react";
import cn from "classnames";

import {
  postAuthorization,
  postRegistration,
} from "../../../utils/fetch";
import { validateEmail } from "../../../utils/validateEmail";
import { setCookiesToken } from "../../../utils/cookies";

import { password, checkServer, validation, check } from "./types";

import Input from "../input";

import style from "./index.module.scss";

const initialPassword = {
  symbols: false,
  number: false,
  length: false,
  firstValue: "",
  secondValue: "",
};

const initialValidation = {
  login: false,
  email: false,
  firstPassword: false,
  secondPassword: false,
};

const initialCheckServer = { login: false, email: false };

const Authorization: React.FC = () => {
  const [active, setActive] = React.useState<boolean>(true);
  const [checkAuthorization, setCheckAuthorization] =
    React.useState<boolean>(false);
  const [checkServer, setCheckServer] =
    React.useState<checkServer>(initialCheckServer); //Registration
  const [password, setPassword] = React.useState<password>(initialPassword);
  const [validation, setValidation] =
    React.useState<validation>(initialValidation);

  function checkObj(obj: { [key: string]: any }, check_val: any) {
    return Object.values(obj).includes(check_val);
  }

  const onSubmitAuthorization = async (e: React.FormEvent) => {
    const target = e.target as EventTarget & {
      [key: string]: HTMLInputElement;
    };
    e.preventDefault();

    const data = {
      username: target.login.value,
      password: target.password.value,
    };

    let result: any;
    await postAuthorization(data).then((response: any) => (result = response));

    if (!result.access_token) setCheckAuthorization(true);
    else {
      // setCookiesToken(result.access_token, result.refresh_token);
    }
  };

  const onSubmitRegistration = async (e: React.FormEvent) => {
    const target = e.target as EventTarget & {
      [key: string]: HTMLInputElement;
    };
    e.preventDefault();

    const data = {
      username: target.login.value,
      email: target.email.value,
      password: target.firstPassword.value,
      secondPassword: target.secondPassword.value,
    };

    if (!checkObj(data, "") && !checkObj(validation, true)) {
      let result: any;

      await postRegistration(data).then((r) => (result = r));

      setCheckServer({
        ...checkServer,
        login: result?.response?.data.detail?.login,
        email: result?.response?.data.detail?.email,
      });

      if (!(checkServer.email && checkServer.login)) {
        const data = {
          username: target.login.value,
          password: target.firstPassword.value,
        };
        await postAuthorization(data).then(
          (response: any) => (result = response)
        );
        // setCookiesToken(result.access_token, result.refresh_token);
      }
    } else {
      let tuple: any = {};
      for (let key in validation) {
        tuple[key] = true;
      }
      setValidation(tuple);
    }
  };

  const formValidation = (e: HTMLInputElement) => {
    const check: check = (flag, key, add) => {
      if (flag) setValidation({ ...validation, [key]: false, ...add });
      else setValidation({ ...validation, [key]: true, ...add });
    };

    switch (e.name) {
      case "login":
        const firstNumber = e.value[0]?.search(/\d/) == -1;
        const lengthLogin = e.value.length < 32;
        const characters = /^[a-zA-Z0-9]+$/.test(e.value);

        setCheckServer({ ...checkServer, login: false });
        check(firstNumber && lengthLogin && characters, e.name);

        break;
      case "email":
        setCheckServer({ ...checkServer, email: false });
        check(validateEmail(e.value) != null, e.name);

        break;
      case "firstPassword":
        const number = e.value.search(/\d/) != -1;
        const length = e.value.length >= 8 && e.value.length < 128;
        const symbols = e.value.search(/[a-zA-Z]/) != -1;

        setPassword({
          ...password,
          number,
          length,
          symbols,
          firstValue: e.value,
        });

        check(number && length && symbols, e.name, {
          secondPassword: e.value !== password.secondValue,
        });

        break;
      case "secondPassword":
        check(e.value === password.firstValue, e.name);
        setPassword({ ...password, secondValue: e.value });

        break;
    }
  };

  return (
    <div className={style.root}>
      {active ? (
        <form action="" onSubmit={(e) => onSubmitAuthorization(e)}>
          <span>Авторизация</span>
          <div>
            <Input
              lable="Логин"
              name="login"
              reset={[active]}
              check={checkAuthorization}
              onChange={() => setCheckAuthorization(false)}
            />
          </div>
          <div>
            <Input
              lable="Пароль"
              type="password"
              name="password"
              reset={[active]}
              check={checkAuthorization}
              onChange={() => setCheckAuthorization(false)}
            />
            {checkAuthorization && <span>Неверный логин или пароль</span>}
          </div>
          <button onClick={() => setActive(false)}>Нет аккаунта?</button>
          <button>Войти</button>
        </form>
      ) : (
        <form action="" onSubmit={(e) => onSubmitRegistration(e)}>
          <span>Регистрация</span>
          <div>
            <Input
              lable="Логин"
              name="login"
              check={validation.login || checkServer.login}
              onChange={(e) => formValidation(e)}
              reset={[active]}
            />
            {validation.login && (
              <span>
                Логин не должен начинаться с цифры и содержать специальные
                символы {"['\"&*#$!^%]"}{" "}
              </span>
            )}
            {checkServer.login && (
              <span>Такой пользователь уже существует</span>
            )}
          </div>
          <div>
            <Input
              lable="Email"
              name="email"
              check={validation.email || checkServer.email}
              onChange={(e) => formValidation(e)}
              reset={[active]}
            />
            {checkServer.email && <span>Эта почта уже зарегистрирована</span>}
          </div>
          <div>
            <Input
              lable="Пароль"
              name="firstPassword"
              type="password"
              check={validation.firstPassword}
              onChange={(e) => formValidation(e)}
              reset={[active]}
            />
            {validation.firstPassword && (
              <span>
                Пароль должен:
                <ul>
                  <li className={cn({ [style.active]: password.symbols })}>
                    Содержать латинские символы
                  </li>
                  <li className={cn({ [style.active]: password.number })}>
                    Содержать хотя бы одну цифру
                  </li>
                  <li className={cn({ [style.active]: password.length })}>
                    Содержать не менее 8 символов
                  </li>
                </ul>
              </span>
            )}
          </div>
          <div>
            <Input
              lable="Повторите пароль"
              name="secondPassword"
              type="password"
              check={validation.secondPassword}
              onChange={(e) => formValidation(e)}
              reset={[active]}
            />
            {validation.secondPassword && <span>Пароли не совпадают</span>}
          </div>
          <button
            onClick={() => {
              setActive(true);
            }}
          >
            Есть аккаунт?
          </button>
          <button>Войти</button>
        </form>
      )}
    </div>
  );
};

export default Authorization;
