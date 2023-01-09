import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";

import { selectSubCategory } from "../../../store/slices/category/selectors";
import { card } from "../../../store/slices/product/types";

import {
  deleteProductImg,
  getBrands,
  postProduct,
  putProduct,
} from "../../../utils/fetch";

import Popup from "../popup";

import style from "./index.module.scss";

type FormValues = {
  title: string;
  price: number;
  discount?: number;
  description: string;
  packaging: string;
  brand_id: number;
  weight: string;
};

const ViewProduct: React.FC<{
  item: card | undefined;
  setViewProductActive: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: () => void;
}> = (props) => {
  const { item, setViewProductActive, dispatch } = props;
  const [addFile, setAddFile] = React.useState<File[]>([]);
  const [popupCategoryId, setPopupCategoryId] = React.useState<number>(0);
  const [popupBrandId, setPopupBrandId] = React.useState<number>(0);
  const [brand, setBrand] = React.useState([]);
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const subCategory = useSelector(selectSubCategory);
  const categoryItem = subCategory.find(
    (obg) => obg.id == item?.category_id
  )?.name;

  React.useEffect(() => {
    getBrands(setBrand);
  }, []);

  const resetAsyncForm = React.useCallback(async () => {
    reset();
  }, [reset]);

  React.useEffect(() => {
    setAddFile([]);
    setPopupCategoryId(item?.category_id || 0);
    resetAsyncForm();
  }, [item, reset]);

  const onLoadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setAddFile((current) => [...current, file]);
    e.target.value = "";
  };

  const onSubmit: SubmitHandler<FormValues> = (data: any, e: any) => {
    e.preventDefault();
    let formData = new FormData();

    if (item)
      for (let key in data) {
        if (data[key as keyof card] === "")
          data[key as keyof card] = item[key as keyof card];
      }

    formData.append(
      "data",
      JSON.stringify({
        ...data,
        category_id: popupCategoryId,
        id: item?.id,
        brand_id: popupBrandId,
      })
    );

    for (const file of addFile) {
      formData.append("files", file);
    }

    item ? putProduct(formData) : postProduct(formData);
    dispatch();
  };

  const deleteImg = (obj: { id: number; url: string }) => {
    deleteProductImg(obj.id);
    dispatch();
  };

  const deleteImgState = (obj: File) => {
    setAddFile((current) => current.filter((item) => item !== obj));
  };
  return (
    <div className={style.root}>
      <div className={style.img}>
        {item?.imgUrl.map((obj) => (
          <div key={obj.id}>
            <img src={`http://127.0.0.1:5000` + obj.url} alt="" />
            <span onClick={() => deleteImg(obj)}>Удалить</span>
          </div>
        ))}
        {addFile.map((obj, id) => (
          <div key={id}>
            <img src={URL.createObjectURL(obj)} alt="" />
            <span onClick={() => deleteImgState(obj)}>Удалить</span>
          </div>
        ))}
        <input type="file" onChange={(e) => onLoadFile(e)} />
      </div>

      <form
        className={style.data}
        onSubmit={handleSubmit(onSubmit)}
        key={item?.id}
      >
        <div>
          <label htmlFor="title">Имя</label>
          <input type="text" {...register("title")} placeholder={item?.title} />
        </div>
        <div>
          <label htmlFor="price">Цена</label>
          <input
            type="text"
            {...register("price")}
            placeholder={item?.price.toString()}
          />
        </div>
        <div>
          <label htmlFor="discount">Скидка</label>
          <input
            type="text"
            {...register("discount")}
            placeholder={item?.discount?.toString()}
          />
        </div>
        <div>
          <label htmlFor="description">Описание</label>
          <textarea
            {...register("description")}
            placeholder={item?.description}
          />
        </div>
        <div>
          <label htmlFor="packaging">Упаковка</label>
          <input
            type="text"
            {...register("packaging")}
            placeholder={item?.packaging}
          />
        </div>
        <div>
          <label htmlFor="brand_id">Бренд</label>
          <Popup
            placeholder="Бренд"
            items={brand}
            setPopupId={setPopupBrandId}
            defValue={{
              id: item?.brand.id || 0,
              value: item?.brand.name || "",
            }}
          />
        </div>
        <div>
          <label htmlFor="weight">Категория</label>
          <Popup
            placeholder="Категория"
            items={subCategory}
            setPopupId={setPopupCategoryId}
            defValue={{
              id: item?.category_id || 0,
              value: categoryItem || "",
            }}
          />
        </div>
        <div>
          <label htmlFor="weight">Вес</label>
          <input
            type="text"
            {...register("weight")}
            placeholder={item?.weight}
          />
        </div>
        <div>
          <label htmlFor="weight">&nbsp;</label>
          <div>
            <button>{item ? "Обновить" : "Добавить"}</button>
            <input
              type="button"
              value="Закрыть"
              onClick={() => setViewProductActive(false)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ViewProduct;
