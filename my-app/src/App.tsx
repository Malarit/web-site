import React from "react";
import { Routes, Route } from "react-router-dom";
import style from "./app.module.scss";
import "./index.scss";

import Home from "./pages/home";
import Basket from "./pages/basket";

const App: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
    </div>
  );
};

export default App;
