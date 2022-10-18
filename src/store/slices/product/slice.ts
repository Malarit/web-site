import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { card } from "./types";
import responseProduct from "../../../responseServer/responseProduct";

export const fetchProducts = createAsyncThunk(
  "products/fetchProductsStatus",
  async () => {
    const response = responseProduct();
    return response.data;
  }
);

const initialState: { items: card[] } = {
  items: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
