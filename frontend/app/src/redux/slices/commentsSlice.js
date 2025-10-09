import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../api/Api.jsx';

// Получить комментарии для поста
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/comments/${postId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching comments');
    }
  }
);

// Добавить комментарий
export const addComment = createAsyncThunk(
  'comments/addComment',
  async (
    { postId, userId, comment_text, profile_photo },
    { rejectWithValue }
  ) => {
    try {
      const response = await $api.post(`/comments/${postId}`, {
        userId,
        comment_text,
        profile_photo,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error adding comment');
    }
  }
);

// Лайкнуть комментарий
export const likeComment = createAsyncThunk(
  'comments/likeComment',
  async ({ commentId, userId }, { rejectWithValue }) => {
    try {
      const response = await $api.post(`/comments/like/${commentId}`, {
        userId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error liking comment');
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Загрузка комментариев
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Добавление комментария
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Лайк комментария
      .addCase(likeComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.comments.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })
      .addCase(likeComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setComments } = commentsSlice.actions;

export default commentsSlice.reducer;
