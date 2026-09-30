import { useCallback, useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);
      if (savedValue) {
        return JSON.parse(savedValue);
      }
    } catch (e) {
      console.error("Error reading localStorage:", e);
    }
    return initialValue;
  });

  const saveValue = useCallback(
    (newValue) => {
      setValue(newValue);
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (e) {
        console.error("Error writing to localStorage:", e);
      }
    },
    [key]
  );

  return [value, saveValue];
}

export default useLocalStorage;
