import {
  ADD_TO_CART,
  APPALY_COUPON_CART,
  UPDATE_ITEM_FROMCART,
  GET_ALL_USER_CART,
  DELETE_ITEM_FROMCART,
  CLEAR_ALL_USER_CART,
  UPDATE_CART,
  CART_CHANGE,
} from "../type";

const inital = {
  addToCart: [],
  getAllUserCart: [],
  clearCart: [],
  deleteItem: [],
  updateItem: [],
  applayCoupon: [],
  cartChange: false,
};

const cartReducer = (state = inital, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        addToCart: action.payload,
        cartChange: !state.cartChange,
      };
    case GET_ALL_USER_CART:
      return {
        ...state,
        getAllUserCart: action.payload,
      };
    case CLEAR_ALL_USER_CART:
      return {
        ...state,
        clearCart: action.payload,
        getAllUserCart: {
          data: { products: [], totalCartPrice: 0 },
          status: "success",
        },
        cartChange: !state.cartChange,
      };
    case DELETE_ITEM_FROMCART:
      return {
        ...state,
        deleteItem: action.payload,
        cartChange: !state.cartChange,
      };
    case UPDATE_ITEM_FROMCART:
      return {
        ...state,
        updateItem: action.payload,
        cartChange: !state.cartChange,
      };
    case APPALY_COUPON_CART:
      return {
        ...state,
        applayCoupon: action.payload,
      };
    case UPDATE_CART:
      return {
        ...state,
        getAllUserCart: {
          ...state.getAllUserCart,
          data: action.payload,
          status: "success",
        },
      };
    case CART_CHANGE:
      return {
        ...state,
        cartChange: !state.cartChange,
      };
    default:
      return state;
  }
};

export default cartReducer;
