import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "../../api/Api.jsx";

const initialState = {
  follower: null,
  following: null,
};

export const getFollowMe = createAsyncThunk(
  "user/getFollow",
  async (userId) => {
    const response = await $api.get(`/follow/${userId}/followers`);
    return response.data;
  }
);

export const getFollowingMe = createAsyncThunk(
  "user/getFollowing",
  async (userId) => {
    const response = await $api.get(`/follow/${userId}/following`);
    return response.data;
  }
);

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFollowMe.fulfilled, (state, { payload }) => {
      state.following = payload.map((item) => item.user_id._id);
    });
    builder.addCase(getFollowingMe.fulfilled, (state, { payload }) => {
      state.follower = payload.map((item) => item.user_id._id);
    });
  },
});

export default followSlice.reducer;
