import React from "react";
import { useSelector } from "react-redux";
import { selectSubCategory } from "../../../store/slices/category/selectors";
import { categoryType } from "../../../store/slices/category/types";

import Popup from "../popup";

import style from "./index.module.scss";

const Banners: React.FC<{
  title: string;
  getBanners: (state: React.SetStateAction<any>) => {};
  postBanners: (formData: any) => {};
  deleteBanners: (id: number) => {};
  files?: boolean;
  category?: categoryType;
}> = ({ getBanners, postBanners, deleteBanners, title, category, files }) => {
  const [active, setActive] = React.useState(false);
  const refFlag = React.useRef<boolean>(true);
  const [topCategory, setTopCategory] = React.useState(0);
  const [filesState, setFilesState] = React.useState<any>([]);
  const [banners, setBanners] = React.useState<
    {
      id: number;
      url: string | string[];
      name?: string;
      category_id?: number;
    }[]
  >([]);
  const subCategory = useSelector(selectSubCategory);

  React.useEffect(() => {
    if (refFlag.current) getBanners(setBanners);
    refFlag.current = false;
  }, []);

  const onSumbit = async (e: React.FormEvent) => {
    const target = e.target as EventTarget & {
      [key: string]: HTMLInputElement;
    };
    e.preventDefault();

    let formData = new FormData();

    if (files) {
      formData.append("files", target.img.files![0]);
      formData.append("files", target.img2.files![0]);
    } else {
      formData.append("file", target.img.files![0]);
    }

    category
      ? formData.append("category_id", topCategory + "")
      : formData.append("name", target.name.value);

    postBanners(formData);
    getBanners(setBanners);
  };

  const onDelete = async (id: number) => {
    await deleteBanners(id);
    await getBanners(setBanners);
  };

  return (
    <div className={style.root}>
      {title}
      <button onClick={() => setActive(!active)}>Добавить</button>
      {active && (
        <div className={style.add} onSubmit={(e) => onSumbit(e)}>
          <form action="">
            <input type="file" name="img" />
            {files && <input type="file" name="img2" />}
            {category ? (
              <div>
                <Popup
                  placeholder="Категории"
                  setPopupId={setTopCategory}
                  items={subCategory}
                />
              </div>
            ) : (
              <input type="text" name="name" />
            )}

            <button>Отправить</button>
          </form>
        </div>
      )}
      <div>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Изображения</th>
              <th>Название</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {banners &&
              banners.map((obj) => (
                <tr key={obj.id}>
                  <td>
                    {Array.isArray(obj.url) ? (
                      obj.url.map((url) => (
                        <img src={"http://127.0.0.1:5000" + url} alt="" />
                      ))
                    ) : (
                      <img src={"http://127.0.0.1:5000" + obj.url} alt="" />
                    )}
                  </td>
                  <td>
                    {obj.name ||
                      subCategory.find((item) => item.id == obj.category_id)
                        ?.name}
                  </td>
                  <td>
                    <button onClick={() => onDelete(obj.id)}>Удалить</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Banners;
