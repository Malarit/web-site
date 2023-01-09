import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { user } from "./types";

export const fetchUser = createAsyncThunk<user>(
  "user/fetchUserStatus",
  async () => {
    return axios
      .get(`http://127.0.0.1:5000/api/me`, {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      });
  }
);

const initialState: { user: user } = {
  user: undefined,
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setFavourite: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.favourite_product.includes(action.payload)
          ? (state.user.favourite_product = state.user.favourite_product.filter(
              (item) => {
                return item != action.payload;
              }
            ))
          : state.user.favourite_product.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = undefined;
      });
  },
});

export const { setFavourite } = UserSlice.actions;

export default UserSlice.reducer;
