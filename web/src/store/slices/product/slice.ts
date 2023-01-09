import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { card, ifetchProducts } from "./types";
import axios from "axios";
import qs from "qs";

export const fetchProducts = createAsyncThunk<
  { item: card[]; pages: number },
  ifetchProducts
>("products/fetchProductsStatus", async (props) => {
  const {
    left,
    right,
    discount,
    tree_id,
    limit,
    page,
    price,
    brand_id,
    favourite,
  } = props;
  return axios
    .get(`http://127.0.0.1:5000/api/product`, {
      params: {
        left,
        right,
        discount,
        tree_id,
        limit,
        page,
        priceL: price?.left,
        priceR: price?.right,
        brand_id,
        favourite,
      },
      paramsSerializer: {
        indexes: null 
      }
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
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload.item;
      state.pages = action.payload.pages;
    });
  },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
