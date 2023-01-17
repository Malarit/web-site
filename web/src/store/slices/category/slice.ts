import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { categoryType } from "./types";

export const fetchCategory = createAsyncThunk(
  "products/fetchCategoryStatus",
  async () => {
    return axios
      .get("/api/category")
      .then((response) => {
        return response.data;
      });
  }
);

const initialState: { items: categoryType[][] } = {
  items: [],
};

export const categorySlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
