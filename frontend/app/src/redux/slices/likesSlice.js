import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../api/Api.jsx';

// Лайкнуть пост
export const likePost = createAsyncThunk(
  'likes/likePost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await $api.post(`/posts/${postId}/likes`);
      return { postId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error liking the post');
    }
  }
);

// Убрать лайк с поста
export const unlikePost = createAsyncThunk(
  'likes/unlikePost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await $api.delete(`/posts/${postId}/likes`);
      return { postId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error unliking the post');
    }
  }
);

const likesSlice = createSlice({
  name: 'likes',
  initialState: {
    likes: {}, // { postId1: true, postId2: false, ... }
    likesCount: {}, // { postId1: 5, postId2: 3, ... }
    loading: false,
    error: null,
  },
  reducers: {
    // Для начальной установки лайков при загрузке постов
    setInitialLikes: (state, action) => {
      const { postId, isLiked, count } = action.payload;
      state.likes[postId] = isLiked;
      state.likesCount[postId] = count;
    },
  },
  extraReducers: (builder) => {
    builder
      // Лайк поста
      .addCase(likePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
        const { postId } = action.payload;
        state.likes[postId] = true;
        state.likesCount[postId] = (state.likesCount[postId] || 0) + 1;
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
        const { postId } = action.payload;
        state.likes[postId] = false;
        state.likesCount[postId] = Math.max(0, (state.likesCount[postId] || 1) - 1);
      })
      .addCase(unlikePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setInitialLikes } = likesSlice.actions;
export default likesSlice.reducer;
