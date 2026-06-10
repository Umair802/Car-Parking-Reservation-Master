"use client";

import { useState } from "react";

import { toast } from "react-toastify";

interface Props {
  initailLoading?: boolean;
  notify?: boolean;
}

export const useApi = ({ initailLoading, notify }: Props = {}) => {
  const [isLoading, setIsLoading] = useState(initailLoading);
  const [error, setError] = useState(null);

  const makeApiCall = async (apiCall: Function) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiCall();
      setIsLoading(false);
      setError(null);
      if (notify) {
        toast.success(
          response?.data?.message || "Request Completed Successfully."
        );
      }
      return response;
    } catch (error: any) {
      setIsLoading(false);

      if (error?.response?.status === 401) {
        toast.error(
          error?.response?.data?.message || "user session has expired"
        );
      }
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred. Please try again later";
      setError(errorMessage);

      throw error;
    }
  };

  return [isLoading, error, makeApiCall];
};
