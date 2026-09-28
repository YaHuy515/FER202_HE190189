import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * useContext: Quản lý Theme (Dark/Light Mode) toàn cục
 */
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Sử dụng Custom Hook useLocalStorage để lưu giữ trạng thái theme
  const [theme, setTheme] = useLocalStorage('demo_theme', 'light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook tiện ích để dùng ThemeContext nhanh chóng
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme phải được sử dụng bên trong ThemeProvider');
  }
  return context;
}
