import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserByIdApi } from '../../api/UserApi.jsx';
import { $api } from '../../api/Api.jsx';

const initialState = {
  user: [], // Список пользователей
  currentUser: null, // Текущий выбранный пользователь
  loading: false, // Статус загрузки
  error: null, // Ошибки
};

// Получить данные пользователя по ID
export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (userId) => {
    const data = await getUserByIdApi(userId);
    return data;
  }
);

// Получить всех пользователей
export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
  const response = await $api.get('/user');
  return response.data;
});

// Получить подписчиков пользователя
export const getFollow = createAsyncThunk('user/getFollow', async (userId) => {
  const response = await $api.get(`/follow/${userId}/followers`);
  return response.data;
});

// Получить подписки пользователя
export const getFollowing = createAsyncThunk(
  'user/getFollowing',
  async (userId) => {
    const response = await $api.get(`/follow/${userId}/following`);
    return response.data;
  }
);

// Получить пользователей с которыми есть переписка
export const getUsersWithChats = createAsyncThunk(
  'user/getUsersWithChats',
  async () => {
    const response = await $api.get('/messages/chats');
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Обновить время последнего сообщения у пользователя
    changeTimeInLastMessage: (state, { payload }) => {
      state.user = state.user.map((user) => {
        if (user._id === payload.userId) {
          return { ...user, lastMessage: payload.lastMessage };
        }
        return user;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Получение пользователя по ID
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentUser = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload || null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading user';
      })

      // Получение всех пользователей
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading users';
      })

      // Получение подписчиков
      .addCase(getFollow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFollow.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (state.currentUser) {
          state.currentUser.followers_count = payload.length;
        }
      })
      .addCase(getFollow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading followers';
      })

      // Получение подписок
      .addCase(getFollowing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFollowing.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (state.currentUser) {
          state.currentUser.following_count = payload.length;
        }
      })
      .addCase(getFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading following';
      })

      // Получение пользователей с перепиской
      .addCase(getUsersWithChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersWithChats.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUsersWithChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading users with chats';
      });
  },
});

export const { changeTimeInLastMessage } = userSlice.actions;
export default userSlice.reducer;
