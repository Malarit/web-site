import React from "react";

import style from "./index.module.scss";

const About: React.FC = () => {
  return (
    <div className={style.root}>
      <div className={style.title}>Характеристики</div>
      <div className={style.specifications}>
        <div>В упаковке</div>
        <div>230x150x15 мм (ДxШxВ)</div>
        <div>Бренд</div>
        <div>Черкизово премиум</div>
        <div>Вес товара</div>
        <div>116 кг</div>
        <div>Вид мяса</div>
        <div>Свинина</div>
        <div>Описание</div>
        <div>
          Колбаса сырокопченая сальчичон от бренда черкизово премиум в нарезке –
          натуральный продукт из отборной свинины с добавлением измельченного
          шпика, черного перца и горчицы. Кусочки этого деликатеса прекрасно
          сочетаются с нежными оливками, свежим хлебом и овощами. Они являются
          великолепной основой для сытных сэндвичей и украшением праздничной
          мясной тарелки.
        </div>
      </div>
    </div>
  );
};

export default About;
