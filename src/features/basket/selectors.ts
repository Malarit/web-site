import { RootState } from "../../app/store";

export const selectCountCard = (id: number) => (state: RootState) =>
  state.basketReducer.items.find((obj) => obj.id === id)?.count;

export const selectAllCard = (state: RootState) =>
  state.basketReducer.items.reduce((sum, obj) => {
    return (obj.count || 0) + sum;
  }, 0);
