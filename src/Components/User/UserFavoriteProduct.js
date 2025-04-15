import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import ProductCard from "./../Products/ProductCard";
import Pagination from "../Uitily/Pagination";
import CardProductsContainer from "./../Products/CardProductsContainer";
import { useDispatch, useSelector } from "react-redux";
import { getProductWishList } from "../../redux/actions/wishListAction";

const UserFavoriteProduct = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const res = useSelector((state) => state.addToWishListReducer.allWishList);
  const removeRes = useSelector(
    (state) => state.addToWishListReducer.removeWishList
  );

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      await dispatch(getProductWishList());
      setLoading(false);
    };
    get();
  }, [dispatch]);

  useEffect(() => {
    if (loading === false) {
      if (res) setItems(res.data);
    }
  }, [loading, res]);

  // Refresh wishlist when a product is removed
  useEffect(() => {
    if (removeRes && removeRes.status === "success") {
      dispatch(getProductWishList());
    }
  }, [removeRes, dispatch]);

  return (
    <div>
      <div className="admin-content-text pb-4">قائمة المفضلة</div>
      <Row className="justify-content-start">
        {items.length <= 0 ? (
          <h6>لا يوجد منتدات مفضله حاليا</h6>
        ) : (
          <CardProductsContainer products={items} title="" btntitle="" />
        )}
      </Row>
    </div>
  );
};

export default UserFavoriteProduct;
