import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import notify from "../../hook/useNotifaction";
import {
  clearAllCartItem,
  deleteCartItem,
  updateCartItem,
} from "./../../redux/actions/cartAction";

const DeleteCartHook = (item) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [itemCount, setItemCount] = useState(0);

  const handelDeleteCart = async () => {
    setLoading(true);
    await dispatch(clearAllCartItem());
    setLoading(false);
  };

  const onChangeCount = (e) => {
    setItemCount(e.target.value);
  };

  useEffect(() => {
    if (item) setItemCount(item.count);
  }, [item]);

  const res = useSelector((state) => state.cartReducer.clearCart);

  useEffect(() => {
    if (loading === false) {
      if (res === "") {
        notify("تم الحذف بنجاح", "success");
        dispatch({ type: "CART_CHANGE" });
      }
    }
  }, [loading, res, dispatch]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelDeleteItem = async () => {
    setLoading(true);
    await dispatch(deleteCartItem(item._id));
    setLoading(false);
    setShow(false);
    notify("تم حذف المنتج بنجاح", "success");
    dispatch({ type: "CART_CHANGE" });
  };

  const handeleUpdateCart = async () => {
    setLoading(true);
    await dispatch(
      updateCartItem(item._id, {
        count: itemCount,
      })
    );
    setLoading(false);
    notify("تم تحديث الكمية بنجاح", "success");
    dispatch({ type: "CART_CHANGE" });
  };

  return [
    handelDeleteCart,
    show,
    handleClose,
    handleShow,
    handelDeleteItem,
    itemCount,
    onChangeCount,
    handeleUpdateCart,
  ];
};

export default DeleteCartHook;
