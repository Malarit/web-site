import { RootState } from "../../store";

export const selectByDiscount = (state: RootState) =>
  state.productsReducer.items.filter((obj) => obj.discount);

export const selectByNotDiscount = (state: RootState) =>
  state.productsReducer.items.filter((obj) => !obj.discount);

export const selectById = (id: number) => (state: RootState) =>
  state.productsReducer.items.find((obj) => obj.id == id);
