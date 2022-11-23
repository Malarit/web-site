import React from "react";

import style from "./index.module.scss";
import axios from "axios";

const Management: React.FC = () => {
  React.useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/admin/category").then((response) => {
      console.log(response.data);
    });
  }, []);

  const [categoryValue, setCategoryValue] = React.useState<string>("");

  const postCategory = (name: string, id?: number) => {
    axios.post("http://127.0.0.1:5000/api/admin/category", {
      name: name,
      parent_id: id,
    });
  };

  return (
    <div className={style.root}>
      <div className={style.categories}>
        <ul>
          Категории
          <li>
            scss
            <ul>
              <li>50</li>
            </ul>
          </li>
          <li>scss</li>
        </ul>

        <div>
          <input
            type="text"
            value={categoryValue}
            onChange={(e) => setCategoryValue(e.target.value)}
          />
          <input type="text" />
          <button
            onClick={() => {
              postCategory(categoryValue);
            }}
          ></button>
        </div>

      </div>
      <div className={style.product}>Продукты</div>
    </div>
  );
};

export default Management;
