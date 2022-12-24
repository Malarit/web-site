import React from "react";
import cn from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";

import { postProduct } from "../../../utils/fetch";

import PopupCategory from "../popupCategory";

import style from "./index.module.scss";

type FormValues = {
  title: string;
  img: File[];
  price: number;
  discount?: number;
};

const AddProduct: React.FC<{ activeAdd: boolean }> = ({ activeAdd }) => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [popupCategoryId, setPopupCategoryId] = React.useState<number>(0);

  const onSubmit: SubmitHandler<FormValues> = (data: any, e: any) => {
    e.preventDefault();
    const imgs = data.img;
    let formData = new FormData();

    delete data.img;

    if (data.discount == "") data.discount = 0;

    formData.append(
      "data",
      JSON.stringify({ ...data, category_id: popupCategoryId })
    );
    for (const file of imgs) {
      formData.append("files", file);
      console.log(0);
    }

    postProduct(formData);
  };

  return (
    <div className={style.root}>
      <form
        className={cn({ [style.add]: true, [style.active]: activeAdd })}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input type="file" multiple {...register("img")} />
        </div>
        <div>
          <input type="text" {...register("title")} placeholder="Название" />
        </div>
        <div>
          <input type="text" {...register("price")} placeholder="Цена" />
        </div>
        <div>
          <input
            type="text"
            {...register("discount")}
            placeholder={`Скидка "оставьте поле пустым, если нет"`}
          />
        </div>
        <div>
          <PopupCategory setPopupCategoryId={setPopupCategoryId} />
        </div>

        <div>
          <button>Добавить</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
