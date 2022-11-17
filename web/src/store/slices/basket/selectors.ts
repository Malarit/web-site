import { RootState } from "../../store";

export const selectCountCard = (id: number) => (state: RootState) =>
  state.basketReducer.items.find((obj) => obj.id === id)?.count;

export const selectTotalPrice = (state: RootState) =>
  state.basketReducer.totalPrice;

export const selectCards = (state: RootState) => state.basketReducer.items;

export const selectAllCard = (state: RootState) =>
  state.basketReducer.items.reduce((sum, obj) => {
    return (obj.count || 0) + sum;
  }, 0);

