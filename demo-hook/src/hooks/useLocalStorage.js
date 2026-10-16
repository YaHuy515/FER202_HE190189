import { useState, useEffect } from 'react';

/**
 * Custom Hook: useLocalStorage
 * Tái sử dụng logic đọc và ghi dữ liệu với localStorage.
 * - Sử dụng useState với lazy initialization để đọc dữ liệu ban đầu.
 * - Sử dụng useEffect để tự động lưu dữ liệu vào localStorage khi có thay đổi.
 *
 * @param {string} key - Khóa lưu trữ trong localStorage
 * @param {any} initialValue - Giá trị mặc định nếu chưa có trong localStorage
 * @returns {[any, Function]} - [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Lỗi khi đọc từ localStorage cho key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Lỗi khi ghi vào localStorage cho key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
