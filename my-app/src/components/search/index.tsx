import React from "react";

import style from "./index.module.scss";

const Search: React.FC<{
  icon?: string;
  text?: string;
}> = ({ icon, text }) => {
  return (
    <div className={`${style.root} `}>
      <div>
        <input type="text" />
        <button>{icon ? <img src={icon} alt="" /> : text}</button>
      </div>
    </div>
  );
};

export default Search;
