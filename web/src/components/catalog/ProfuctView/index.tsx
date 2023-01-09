import React from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import {
  selectAllProducts,
  selectPages,
} from "../../../store/slices/product/selectors";
import Card from "../../product/card";
import { useWindowDimensions } from "../../../utils/getWindowSize";

import style from "./index.module.scss";

const ProfuctView: React.FC<{ setPage: React.SetStateAction<any> }> = ({
  setPage,
}) => {
  const item = useSelector(selectAllProducts);
  const pages = useSelector(selectPages);
  const { width } = useWindowDimensions();

  return (
    <div className={style.root}>
      {item.length == 0 ? (
        <div className={style.void}>Тут пусто {":("}</div>
      ) : (
        <></>
      )}
      <div className={style.product}>
        {item.map((obj) => (
          <div>
            <Card key={obj.id} card={obj} />
          </div>
        ))}
      </div>
      <div className={style.paginate_wrapper}>
        <ReactPaginate
          className={style.paginate}
          breakLabel="..."
          nextLabel=">"
          onPageChange={(e) => setPage(e.selected)}
          pageRangeDisplayed={width > 1000 ? 5 : 1}
          pageCount={pages}
          previousLabel="<"
          renderOnZeroPageCount={undefined}
        />
      </div>
    </div>
  );
};

export default ProfuctView;
