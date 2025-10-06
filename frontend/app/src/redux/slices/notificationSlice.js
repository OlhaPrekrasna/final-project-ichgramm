import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../api/Api.jsx';

// Получить уведомления пользователя
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/notifications/${userId}/actions`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Ошибка при загрузке уведомлений'
      );
    }
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    actions: [], // Список уведомлений
    loading: false, // Статус загрузки
    error: null, // Ошибки
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Начало загрузки уведомлений
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Успешная загрузка уведомлений
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.actions = action.payload.slice(0, 10); // Берем только последние 10 уведомлений
      })
      // Ошибка при загрузке уведомлений
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default notificationsSlice.reducer;
