import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../../store/slices/product/slice";
import { selectAllProducts } from "../../../store/slices/product/selectors";
import { deleteProduct } from "../../../utils/fetch";

import { categoryType } from "../../../store/slices/category/types";
import { card } from "../../../store/slices/product/types";

import ViewProduct from "../viewProduct";

import style from "./index.module.scss";

const TableProduct: React.FC<{ activeCategory: categoryType | undefined }> = ({
  activeCategory,
}) => {
  const products = useSelector(selectAllProducts);
  const dispatch = useDispatch();
  const [viewProductActive, setViewProductActive] = React.useState(false);
  const [viewProduct, setViewProduct] = React.useState<card>();

  const headersTable = [
    "id",
    "Название",
    "Цена",
    "Скидка",
    "Отзывы",
    "Описание",
    "Действия",
  ];

  const onClickView = (item: card) => {
    setViewProductActive(true);
    setViewProduct(item);
  };

  const updateProduct = () => {
    if (activeCategory) {
      const { left, right, tree_id } = activeCategory;
      dispatch<any>(fetchProducts({ left, right, tree_id }));
    }
  };

  const DeleteProduct = (row: card) => {
    if (activeCategory) {
      const { left, right, tree_id } = activeCategory;
      deleteProduct(row.id);
      dispatch<any>(fetchProducts({ left, right, tree_id }));
    }
  };

  return (
    <>
      {viewProductActive ? (
        <ViewProduct
          item={viewProduct}
          setViewProductActive={setViewProductActive}
          dispatch={updateProduct}
        />
      ) : (
        <></>
      )}

      <div className={style.root}>
        <div>
          <button
            onClick={() => {
              setViewProductActive(true);
              setViewProduct(undefined);
            }}
          >
            Добавить продукт
          </button>
        </div>
        <table className={style.table}>
          <thead>
            <tr>
              {headersTable.map((obj, id) => (
                <th
                  key={id}
                  rowSpan={obj == "Отзывы" || obj == "Действия" ? 1 : 2}
                  colSpan={obj == "Отзывы" || obj == "Действия" ? 2 : 1}
                >
                  {obj}
                </th>
              ))}
            </tr>
            <tr>
              <th>Оценка</th>
              <th>Количество</th>
              <th>Удалить</th>
              <th>Просмотреть</th>
            </tr>
          </thead>
          <tbody>
            {products.map((row, id) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td className={style.long}>{row.title}</td>
                <td>{row.price} р</td>
                <td>{row.discount}%</td>
                <td>{(row.rating.value / row.rating.count) | 0}</td>
                <td>{row.rating.count}</td>
                <td className={style.long}>{row.title}</td>
                <td>
                  <button onClick={() => DeleteProduct(row)}>rem</button>
                </td>
                <td>
                  <button onClick={() => onClickView(row)}>view</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableProduct;
