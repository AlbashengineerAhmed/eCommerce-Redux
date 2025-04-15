import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import notify from "../useNotifaction";
import {
  createReview,
  allReviewProduct,
} from "./../../redux/actions/reviewAction";

const AddRateHook = (id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rateText, setRateText] = useState("");
  const [rateValue, setRateValue] = useState(0);
  const [loading, setLoading] = useState(true);

  const OnChangeRateText = (e) => {
    setRateText(e.target.value);
  };

  const OnChangeRateValue = (val) => {
    setRateValue(val);
  };

  var user = "";
  if (localStorage.getItem("user") != null)
    user = JSON.parse(localStorage.getItem("user"));

  const onSubmit = async () => {
    if (!user) {
      notify("يجب تسجيل الدخول لإضافة تقييم", "error");
      return;
    }

    if (rateValue === 0) {
      notify("من فضلك قم بتقييم المنتج", "error");
      return;
    }

    if (rateText === "") {
      notify("من فضلك اكتب تعليقك", "error");
      return;
    }

    if (rateText.length < 6) {
      notify("يجب أن يكون التعليق أكثر من 10 أحرف", "error");
      return;
    }

    setLoading(true);
    await dispatch(
      createReview(id, {
        review: rateText,
        rating: rateValue,
      })
    );
    setLoading(false);
  };

  const res = useSelector((state) => state.reviewReducer.createView);

  useEffect(() => {
    if (loading === false) {
      if (res) {
        if (res.status && res.status === 403) {
          notify("غير مسموح للادمن بالتقييم", "error");
        } else if (
          res.data.errors &&
          res.data.errors[0].msg === "You already added review on this product"
        ) {
          notify("لقد قمت باضافة تقييم لهذا المنتج مسبقاً", "error");
        } else if (res.status && res.status === 201) {
          notify("تمت إضافة التقييم بنجاح", "success");
          dispatch(allReviewProduct(id, 1, 5));
          setRateText("");
          setRateValue(0);
        } else {
          notify("حدث خطأ أثناء إضافة التقييم", "error");
        }
      }
    }
  }, [loading, res, dispatch, id]);

  return [
    OnChangeRateText,
    OnChangeRateValue,
    rateText,
    rateValue,
    user,
    onSubmit,
  ];
};

export default AddRateHook;
