import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Selector helpers
export const selectAuth = (state) => state.auth;
export const selectUI = (state) => state.ui;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

// Action exports
export { logout, loginStart, loginSuccess, loginFailure, updateUser } from './slices/authSlice';
export { toggleDarkMode, toggleSidebar, setSidebar, setCurrentTab, openAddTransactionModal, closeAddTransactionModal } from './slices/uiSlice';
