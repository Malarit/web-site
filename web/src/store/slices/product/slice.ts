import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { card, ifetchProducts } from "./types";
import axios from "axios";

export const fetchProducts = createAsyncThunk<
  { item: card[]; pages: number },
  ifetchProducts
>("products/fetchProductsStatus", async (props) => {
  return axios
    .get(`http://127.0.0.1:5000/api/product`, {
      params: {
        ...props,
        priceL: props.price?.left,
        priceR: props.price?.right,
      },
      paramsSerializer: {
        indexes: null,
      },
    })
    .then((response) => {
      return response.data;
    });
});

const initialState: { items: card[]; pages: number } = {
  items: [],
  pages: 0,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.items = [];
        state.pages = 0;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload.item;
        state.pages = action.payload.pages;
      });
  },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
