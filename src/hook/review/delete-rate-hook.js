import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import notify from "../useNotifaction";
import {
  deleteReviewOnProduct,
  allReviewProduct,
} from "./../../redux/actions/reviewAction";

const DeleteRateHook = (review) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && review.user._id === user._id) {
      setIsUser(true);
    }
  }, [review.user._id]);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handelDelete = async () => {
    try {
      setLoading(true);
      await dispatch(deleteReviewOnProduct(review._id));
      setLoading(false);
      handleCloseDelete();
    } catch (error) {
      setLoading(false);
      handleCloseDelete();
      notify("حدث خطأ أثناء حذف التقييم", "error");
    }
  };

  const res = useSelector((state) => state.reviewReducer.deleteReview);

  useEffect(() => {
    if (loading === false) {
      if (res && res.status === 200) {
        notify("تم حذف التقييم بنجاح", "success");
        // Refresh reviews without page reload
        dispatch(allReviewProduct(review.product, 1, 5));
      } else if (res && res.status === 403) {
        notify("غير مصرح لك بحذف هذا التقييم", "error");
      } else {
        notify("هناك مشكلة في عملية الحذف", "error");
      }
    }
  }, [loading, res, dispatch, review.product]);

  return [
    isUser,
    showDelete,
    handleCloseDelete,
    handleShowDelete,
    handelDelete,
  ];
};

export default DeleteRateHook;
