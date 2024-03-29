import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { basketState } from "./types";
import { card } from "../product/types";
import { calcTotalPrice } from "../../../utils/calcTotalPrice";

const initialState: basketState = {
  totalPrice: 0,
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<card>) => {
      const findProduct = state.items.find(
        (obj) => obj.id === action.payload.id
      );

      findProduct
        ? findProduct.count!++
        : state.items.push({
            ...action.payload,
            count: 1,
          });

      state.totalPrice = calcTotalPrice(state);
    },
    removeItem: (state, action: PayloadAction<card>) => {
      const findProduct = state.items.find(
        (obj) => obj.id === action.payload.id
      );

      findProduct && findProduct.count === 1
        ? (state.items = state.items.filter((obj) => obj.id !== findProduct.id))
        : findProduct!.count!--;

      state.totalPrice = calcTotalPrice(state);
    },
    removeAll: (state) => {
      state.items = []
      state.totalPrice = 0
    },
  },
});

export const { addItem, removeItem, removeAll } = basketSlice.actions;

export default basketSlice.reducer;
