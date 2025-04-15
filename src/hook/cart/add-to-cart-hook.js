import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import notify from "../../hook/useNotifaction";
import {
  addProductToCart,
  getAllUserCartItems,
} from "./../../redux/actions/cartAction";

const AddToCartHook = (prdID, item) => {
  const dispatch = useDispatch();

  const [indexColor, setIndexColor] = useState("");
  const [colorText, setColorText] = useState("");
  const [loading, setLoading] = useState(true);
  const colorClick = (index, color) => {
    setIndexColor(index);
    setColorText(color);
  };

  //add product to cart
  const addToCartHandel = async () => {
    if (item.availableColors?.length >= 1) {
      if (colorText === "") {
        notify("من فضلك اختر لون اولا للمنتج", "warn");
        return;
      }
    } else {
      setColorText("");
    }
    setLoading(true);
    try {
      const response = await dispatch(
        addProductToCart({
          productId: prdID,
          color: colorText,
        })
      );

      if (response && response.status === 200) {
        notify("تمت اضافة المنتج للعربه بنجاح", "success");
      }
    } catch (error) {
      notify(error.message || "حدث خطأ أثناء إضافة المنتج", "error");
    } finally {
      setLoading(false);
    }
  };

  return [colorClick, indexColor, addToCartHandel];
};

export default AddToCartHook;
