import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { user } from "./types";

export const fetchUser = createAsyncThunk<user, { token: string }>(
  "user/fetchUserStatus",
  async (token) => {
    return axios
      .get(`http://127.0.0.1:5000/api/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const {} = UserSlice.actions;

export default UserSlice.reducer;
