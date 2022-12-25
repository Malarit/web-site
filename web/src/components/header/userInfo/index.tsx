import React from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../../store/slices/user/slice";

import { user } from "../../../store/slices/user/types";
import { logout } from "../../../utils/fetch";

import style from "./index.module.scss";

const UserInfo: React.FC<{ user: user }> = ({ user }) => {
  const dispatch = useDispatch();

  return (
    <div className={style.root}>
      <div>Пользователь: {user?.username}</div>
      <div>История покупок</div>
      <div>Избранное</div>
      <div
        onClick={async () => {
          await logout();
          await dispatch<any>(fetchUser());
        }}
      >
        Выйти
      </div>
    </div>
  );
};

export default UserInfo;
