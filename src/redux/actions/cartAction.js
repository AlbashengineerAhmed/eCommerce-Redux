import {
  ADD_TO_CART,
  APPALY_COUPON_CART,
  GET_ALL_USER_CART,
  UPDATE_ITEM_FROMCART,
  DELETE_ITEM_FROMCART,
  CLEAR_ALL_USER_CART,
  CART_CHANGE,
} from "../type";
import { useGetData, useGetDataToken } from "../../hooks/useGetData";
import { useInsertData } from "../../hooks/useInsertData";
import useDeleteData from "./../../hooks/useDeleteData";
import { useInsUpdateData } from "./../../hooks/useUpdateData";
//add to cart
export const addProductToCart = (body) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/cart`, body);

    if (response && response.status === 200) {
      // First update the cart data
      await dispatch(getAllUserCartItems());

      // Then dispatch the success action
      dispatch({
        type: ADD_TO_CART,
        payload: response,
      });

      // Finally trigger cart change to update UI
      dispatch({
        type: CART_CHANGE,
      });

      return response;
    } else {
      throw new Error("Failed to add product to cart");
    }
  } catch (e) {
    let errorMessage = "حدث خطأ أثناء إضافة المنتج";
    if (e.response) {
      if (e.response.status === 401) {
        errorMessage = "قم بتسجيل الدخول اولا";
      } else if (e.response.status === 404) {
        errorMessage = "المنتج غير موجود";
      } else if (e.response.data && e.response.data.message) {
        errorMessage = e.response.data.message;
      }
    }
    dispatch({
      type: ADD_TO_CART,
      payload: { ...e.response, errorMessage },
    });
    throw new Error(errorMessage);
  }
};

//get all cart items
export const getAllUserCartItems = () => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/cart`);
    dispatch({
      type: GET_ALL_USER_CART,
      payload: response,
    });
    return response;
  } catch (e) {
    dispatch({
      type: GET_ALL_USER_CART,
      payload: e.response,
    });
    throw e;
  }
};

//clearAll cart Item
export const clearAllCartItem = () => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/cart`);
    dispatch({
      type: CLEAR_ALL_USER_CART,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: CLEAR_ALL_USER_CART,
      payload: e.response,
    });
  }
};
//delete cart Item
export const deleteCartItem = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/cart/${id}`);

    dispatch({
      type: DELETE_ITEM_FROMCART,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: DELETE_ITEM_FROMCART,
      payload: e.response,
    });
  }
};

//update cart Item
export const updateCartItem = (id, body) => async (dispatch) => {
  try {
    const response = await useInsUpdateData(`/api/v1/cart/${id}`, body);
    //  console.log(response)
    dispatch({
      type: UPDATE_ITEM_FROMCART,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_ITEM_FROMCART,
      payload: e.response,
    });
  }
};

//update cart Item
export const applayCoupnCart = (body) => async (dispatch) => {
  try {
    const response = await useInsUpdateData(`/api/v1/cart/applyCoupon`, body);
    // console.log(response)
    dispatch({
      type: APPALY_COUPON_CART,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: APPALY_COUPON_CART,
      payload: e.response,
    });
  }
};
