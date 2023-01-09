import React from "react";

import style from "./index.module.scss" 

const TopСategories: React.FC = () => {
  return (
    <div>
      <div>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Изображениe</th>
              <th>Название</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {/* {banners.map((obj) => (
              <tr key={obj.id}>
                <td>
                  <img src={"http://127.0.0.1:5000" + obj.url} alt="" />
                </td>
                <td>{obj.name}</td>
                <td>
                  <button onClick={() => onDelete(obj.id)}>Удалить</button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopСategories;
