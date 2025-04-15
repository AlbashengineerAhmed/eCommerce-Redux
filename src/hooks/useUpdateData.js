import baseUrl from "../Api/baseURL";

const useInUpdateDataWithImage = async (url, parmas) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await baseUrl.put(url, parmas, config);
    return res;
  } catch (error) {
    console.error("Error in useInUpdateDataWithImage:", error);
    if (error.response) {
      throw error.response;
    }
    throw error;
  }
};

const useInsUpdateData = async (url, parmas) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const res = await baseUrl.put(url, parmas, config);
    return res;
  } catch (error) {
    console.error("Error in useInsUpdateData:", error);
    if (error.response) {
      throw error.response;
    }
    throw error;
  }
};

export { useInUpdateDataWithImage, useInsUpdateData };
