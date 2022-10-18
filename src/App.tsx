import React from "react";
import { Routes, Route } from "react-router-dom";
import style from "./app.module.scss";
import "./index.scss";

import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import Basket from "./pages/basket";
import Details from "./pages/details";
import Catalog from "./pages/catalog";

const App: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/details">
          <Route index element={<></>}/>
          <Route path=":id/:title" element={<Details />}/>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
