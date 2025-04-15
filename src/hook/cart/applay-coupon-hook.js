import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import notify from "../../hook/useNotifaction";
import { applayCoupnCart } from "../../redux/actions/cartAction";
import { useNavigate } from "react-router-dom";

const ApplayCouponHook = (cartItems) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [couponName, setCouponName] = useState("");
  const [loading, setLoading] = useState(true);
  const res = useSelector((state) => state.cartReducer.applayCoupon);

  const onChangeCoupon = (e) => {
    setCouponName(e);
  };

  const handelSubmitCoupon = async () => {
    if (couponName === "") {
      notify("من فضلك ادخل الكوبون", "warn");
      return;
    }
    setLoading(true);
    await dispatch(
      applayCoupnCart({
        couponName: couponName,
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false) {
      if (res && res.status === 200) {
        notify("تم تطبيق الكوبون بنجاح", "success");
        dispatch({ type: "UPDATE_CART", payload: res.data });
      } else {
        notify("هذا الكوبون غير صحيح او منتهى الصلاحيه", "warn");
      }
    }
  }, [loading, res, dispatch]);

  const handelCheckout = () => {
    if (cartItems.length >= 1) {
      navigate("/order/paymethoud");
    } else {
      notify("من فضلك اضف منتجات للعربة اولا", "warn");
    }
  };

  return [couponName, onChangeCoupon, handelSubmitCoupon, handelCheckout];
};

export default ApplayCouponHook;
