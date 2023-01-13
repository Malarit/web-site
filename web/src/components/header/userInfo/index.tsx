import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser } from "../../../store/slices/user/slice";

import { user } from "../../../store/slices/user/types";
import { logout } from "../../../utils/fetch";

import style from "./index.module.scss";

const UserInfo: React.FC<{ user: user; state: React.SetStateAction<any> }> = ({
  user,
  state,
}) => {
  const dispatch = useDispatch();
  return (
    <div className={style.root}>
      <div>Пользователь: {user?.username}</div>
      <Link to="/oldOrders" onClick={() => state(false)}>История покупок</Link>
      <Link to="/favourite" onClick={() => state(false)}>Избранное</Link>
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
