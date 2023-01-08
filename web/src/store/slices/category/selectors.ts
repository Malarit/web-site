import { RootState } from "../../store";

export const selectAllCategory = (state: RootState) =>
  state.categoryReducer.items;

export const selectSubCategory = (state: RootState) =>
  state.categoryReducer.items.flat().filter((obj) => obj.left + 1 == obj.right);

export const selectAllCategoryFlat = (state: RootState) =>
  state.categoryReducer.items.flat();
