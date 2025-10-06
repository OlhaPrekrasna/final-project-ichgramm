import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,

  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Экшен для установки пользователя
    setUser: (state, action) => {
      // action.payload = { token, user }
      state.token = action.payload.token;
      state.user = action.payload.user;

      // Сохраняем данные в localStorage (чтобы при перезагрузке не терялись)
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.token = null;
      state.user = null;

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      localStorage.removeItem('likedPosts');
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
