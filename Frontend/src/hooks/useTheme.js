import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUI, toggleDarkMode } from '../store';

const useTheme = () => {
  const { darkMode } = useSelector(selectUI);
  const dispatch = useDispatch();

  useEffect(() => {
    // Sync document class with Redux state on mount
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  return { darkMode, toggleTheme };
};

export default useTheme;
