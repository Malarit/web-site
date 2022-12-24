import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { card, ifetchProducts } from "./types";
import axios from "axios";

export const fetchProducts = createAsyncThunk<card[], ifetchProducts>(
  "products/fetchProductsStatus",
  async (props) => {
    const { left, right, discount, tree_id } = props;
    return axios
      .get(`http://127.0.0.1:5000/api/product`, {
        params: { left, right, discount, tree_id },
      })
      .then((response) => {
        return response.data;
      });
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
