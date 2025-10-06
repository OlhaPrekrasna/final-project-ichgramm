import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../api/Api.jsx';

// Лайкнуть пост
export const likePost = createAsyncThunk(
  'likes/likePost',
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      const response = await $api.post(`/likes/${postId}/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error liking the post');
    }
  }
);

// Убрать лайк с поста
export const unlikePost = createAsyncThunk(
  'likes/unlikePost',
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      const response = await $api.delete(`/likes/${postId}/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error unliking the post');
    }
  }
);

const likesSlice = createSlice({
  name: 'likes',
  initialState: {
    likes: {}, // { postId1: true, postId2: false, ... }
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Лайк поста
      .addCase(likePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
        state.likes[action.meta.arg.postId] = true;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Убрать лайк
      .addCase(unlikePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        state.loading = false;
        state.likes[action.meta.arg.postId] = false;
      })
      .addCase(unlikePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default likesSlice.reducer;
