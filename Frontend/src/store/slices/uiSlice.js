import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: localStorage.getItem('darkMode') === 'true',
  sidebarOpen: true,
  currentTab: 'dashboard',
  isAddTransactionModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode);
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebar: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    openAddTransactionModal: (state) => {
      state.isAddTransactionModalOpen = true;
    },
    closeAddTransactionModal: (state) => {
      state.isAddTransactionModalOpen = false;
    },
  },
});

export const { toggleDarkMode, toggleSidebar, setSidebar, setCurrentTab, openAddTransactionModal, closeAddTransactionModal } = uiSlice.actions;
export default uiSlice.reducer;
