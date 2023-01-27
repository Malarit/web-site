import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import style from "./app.module.scss";
import "./index.scss";

import { fetchUser } from "./store/slices/user/slice";
import { getAdmin } from "./utils/fetch";

import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import Basket from "./pages/Cart";
import Details from "./pages/details";
import Catalog from "./pages/catalog";
import Admin from "./pages/admin";
import Favourite from "./pages/favourite";
import OldOrders from "./pages/oldOrders";
import { Authorization } from "./components/management/account/account";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [admin, setAdmin] = React.useState<any>();
  React.useEffect(() => {
    getAdmin(setAdmin);
    dispatch<any>(fetchUser());
  }, []);

  return (
    <div className={style.wrapper}>
      {window.location.pathname !== "/admin" && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/details">
          <Route index element={<></>} />
          <Route path=":id/:title" element={<Details />} />
        </Route>
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/oldOrders" element={<OldOrders />} />
        <Route
          path="/admin"
          element={admin ? <Admin /> : <Authorization state={setAdmin} />}
        />
      </Routes>
      {window.location.pathname !== "/admin" && <Footer />}
    </div>
  );
};

export default App;
