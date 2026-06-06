"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useLocalStorage = (key: string): any => {
  const [value, setValue] = useState<any>(null);

  useEffect(() => {
    const cookieValue = Cookies.get(key);
    if (cookieValue) {
      try {
        setValue(JSON.parse(cookieValue));
      } catch {
        setValue(cookieValue);
      }
    }
  }, [key]);

  return value;
};

export default useLocalStorage;