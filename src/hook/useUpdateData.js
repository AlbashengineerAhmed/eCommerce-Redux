import { useState } from "react";
import axios from "axios";
import { baseURL } from "../Api/baseURL";

export const useUpdateData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateData = async (url, params) => {
    try {
      const { data } = await axios.put(baseURL + url, params, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoading(false);
      return { data };
    } catch (error) {
      setError(error);
      setLoading(false);
      return { error };
    }
  };

  return { updateData, loading, error };
};
