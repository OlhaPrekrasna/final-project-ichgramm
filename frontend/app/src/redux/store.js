import { configureStore } from '@reduxjs/toolkit';

// from Google
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    // from Google
    auth: authReducer,
  },
});

export default store;
