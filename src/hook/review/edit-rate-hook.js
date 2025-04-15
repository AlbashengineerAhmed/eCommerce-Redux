import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import notify from '../useNotifaction';
import { updateReviewOnProduct, allReviewProduct } from './../../redux/actions/reviewAction';

const EditRateHook = (review) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [newRateText, setNewRateText] = useState(review.review);
    const [newRateValue, setNewRateValue] = useState(review.rating);
    const [showEdit, setShowEdit] = useState(false);
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && review.user._id === user._id) {
            setIsUser(true);
        }
    }, [review.user._id]);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const onChangeRateText = (e) => {
        setNewRateText(e.target.value)
    }
    const OnChangeRateValue = (val) => {
        setNewRateValue(val)
    }

    const handelEdit = async () => {
        setLoading(true)
        await dispatch(updateReviewOnProduct(review._id, {
            review: newRateText,
            rating: newRateValue
        }))
        setLoading(false)
        handleCloseEdit();
    }

    const res = useSelector(state => state.reviewReducer.updateReview)

    useEffect(() => {
        if (loading === false) {
            if (res.status && res.status === 200) {
                notify("تم تعديل التقييم بنجاح", "success")
                // Refresh reviews without page reload
                dispatch(allReviewProduct(review.product, 1, 5))
            } else {
                notify("هناك مشكله فى عملية التعديل", "error")
            }
        }
    }, [loading, res, dispatch, review.product])

    return [isUser, showEdit, handleCloseEdit, handleShowEdit, handelEdit, onChangeRateText, newRateText, OnChangeRateValue, newRateValue]
}

export default EditRateHook;