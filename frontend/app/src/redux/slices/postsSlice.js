import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { $api } from '../../api/Api.jsx';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

// Получить все посты (включая приватные)
export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
  const response = await $api.get('/posts');
  return response.data;
});

// Получить только публичные посты
export const getAllPublicPosts = createAsyncThunk(
  'posts/getAllPublicPosts',
  async () => {
    const response = await $api.get('/posts');
    return response.data;
  }
);

// Получить посты другого пользователя
export const getOtherUserPosts = createAsyncThunk(
  'posts/getOtherUserPosts',
  async (user_id) => {
    const response = await $api.get(`/posts/${user_id}`);
    return response.data;
  }
);

// Лайкнуть пост
export const likePost = createAsyncThunk(
  'posts/likePost',
  async ({ postId, userId }) => {
    const response = await $api.post(`/posts/${postId}/like`, { userId });
    return { postId, likes_count: response.data.likes_count };
  }
);

// Обновить пост (редактирование)
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ postId, updatedData }) => {
    const response = await $api.put(`/posts/${postId}`, updatedData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обновление поста
      .addCase(updatePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const postIndex = state.posts.findIndex(
          (post) => post._id === updatedPost._id
        );

        if (postIndex !== -1) {
          state.posts[postIndex] = {
            ...state.posts[postIndex],
            ...updatedPost,
          };
        }
      })

      // Получение всех постов
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading posts';
      })

      // Получение публичных постов
      .addCase(getAllPublicPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPublicPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getAllPublicPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading posts';
      })

      // Получение постов другого пользователя
      .addCase(getOtherUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOtherUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getOtherUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading posts';
      })

      // Лайк поста
      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, likes_count } = action.payload;
        const post = state.posts.find((p) => p._id === postId);
        if (post) {
          post.likes_count = likes_count;
        }
      });
  },
});

export default postsSlice.reducer;
