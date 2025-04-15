import { DELETE_PRODUCT, UPDATE_PRODUCT } from "../type";
import useDeleteData from "../../hooks/useDeleteData";
import { useInsUpdateData } from "../../hooks/useUpdateData";

// Delete a product by ID
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/products/${id}`);
    dispatch({
      type: DELETE_PRODUCT,
      payload: response,
    });
    return response;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Update a product by ID
export const updateProduct = (id, data) => async (dispatch) => {
  try {
    const response = await useInsUpdateData(`/api/v1/products/${id}`, data);
    dispatch({
      type: UPDATE_PRODUCT,
      payload: response,
    });
    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
