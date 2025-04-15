import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneProduct,
  getProductLike,
} from "../../redux/actions/productsAction";
import mobile from "../../images/mobile.png";
import { getOneCategory } from "../../redux/actions/categoryAction";
import { getOneBrand } from "../../redux/actions/brandAction";

const ViewProductsDetalisHook = (prodID) => {
  const dispatch = useDispatch();

  // Memoize selectors to prevent unnecessary re-renders
  const oneProducts = useSelector((state) => state.allproducts.oneProduct);
  const oneCategory = useSelector((state) => state.allCategory.oneCategory);
  const oneBrand = useSelector((state) => state.allBrand.oneBrand);
  const productLike = useSelector((state) => state.allproducts.productLike);

  // Fetch product details when ID changes
  useEffect(() => {
    if (prodID) {
      dispatch(getOneProduct(prodID));
    }
  }, [prodID, dispatch]);

  // Memoize product data to prevent unnecessary recalculations
  const item = useMemo(() => {
    return oneProducts?.data || [];
  }, [oneProducts]);

  // Fetch category and brand data when product data is available
  useEffect(() => {
    if (item.category) {
      // Fetch category and related products in parallel
      Promise.all([
        dispatch(getOneCategory(item.category)),
        dispatch(getProductLike(item.category)),
      ]);
    }
    if (item.brand) {
      dispatch(getOneBrand(item.brand));
    }
  }, [item.category, item.brand, dispatch]);

  // Memoize image gallery data
  const images = useMemo(() => {
    if (item.images) {
      return item.images.map((img) => ({ original: img }));
    }
    return [{ original: mobile }];
  }, [item.images]);

  // Memoize category and brand data
  const cat = useMemo(() => oneCategory.data || [], [oneCategory.data]);
  const brand = useMemo(() => oneBrand.data || [], [oneBrand.data]);
  const prod = useMemo(() => productLike?.data || [], [productLike?.data]);

  return [item, images, cat, brand, prod];
};

export default ViewProductsDetalisHook;
