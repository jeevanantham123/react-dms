"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export const useApplianceList = (
  query = "",
  downloadStatus,
  deviceStatus,
  limit,
  page
) => {
  const [response, setResponse] = useState({
    isLoading: false,
    applianceData: undefined,
    serverError: null,
  });

  const fetchData = async () => {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v2/appliances`,
        {
          cache: "no-store",
        }
      ).then((data) => data.json());
      setResponse({
        serverError: null,
        applianceData: data || null,
        isLoading: false,
      });
    } catch (error) {
      setResponse({
        applianceData: null,
        serverError: error,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    setResponse({
      ...response,
      isLoading: true,
    });
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return { ...response };
};

const useDebounce = () => {
  const timeout = useRef();

  const debounce =
    (func, wait) =>
    (...args) => {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => func(...args), wait);
    };

  useEffect(() => {
    return () => {
      if (!timeout.current) return;
      clearTimeout(timeout.current);
    };
  }, []);

  return { debounce };
};

export default useDebounce;
