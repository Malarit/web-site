import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { card, ifetchProducts } from "./types";
import axios from "axios";

export const fetchProducts = createAsyncThunk<
  { item: card[]; pages: number },
  ifetchProducts
>("products/fetchProductsStatus", async (props) => {
  const {
    left,
    right,
    tree_id,
    discount,
    limit,
    page,
    price,
    brand_id,
    favourite,
    product_id,
    text,
    product_id_list,
  } = props;

  return axios
    .get(`/api/product`, {
      params: {
        left,
        right,
        tree_id,
        discount,
        limit,
        page,
        priceL: price?.left,
        priceR: price?.right,
        brand_id,
        favourite,
        product_id,
        text,
        product_id_list,
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
