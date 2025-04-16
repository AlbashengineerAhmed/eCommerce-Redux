import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUserCartItems } from "../../redux/actions/cartAction";

const GetAllUserCartHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [itemsNum, setItemsNum] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [couponNameRes, setCouponName] = useState("");
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartID, setCartID] = useState("0");
  const [totalCartPriceAfterDiscount, setTotalCartPriceAfterDiscount] =
    useState(0);

  const res = useSelector((state) => state.cartReducer.getAllUserCart);
  const cartChange = useSelector((state) => state.cartReducer.cartChange);

  // Get cart data on mount and when cart changes
  useEffect(() => {
    let isMounted = true;

    const get = async () => {
      if (isMounted) {
        setLoading(true);
        try {
          await dispatch(getAllUserCartItems());
        } catch (error) {
          console.error("Error fetching cart items:", error);
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      }
    };

    get();

    return () => {
      isMounted = false;
    };
  }, [cartChange, dispatch]);

  useEffect(() => {
    if (loading === false) {
      if (res && res.status === "success") {
        setItemsNum(res.numOfCartItems);
        setCartItems(res.data?.products || []);
        setTotalCartPrice(res.data?.totalCartPrice || 0);
        setCartID(res.data?._id || "0");
        if (res.data?.coupon) {
          setCouponName(res.data.coupon);
        } else {
          setCouponName("");
        }
        if (res.data?.totalAfterDiscount) {
          setTotalCartPriceAfterDiscount(res.data.totalAfterDiscount);
        } else {
          setTotalCartPriceAfterDiscount("");
        }
      } else {
        setCartID("0");
        setCouponName("");
        setTotalCartPriceAfterDiscount("");
        setItemsNum(0);
        setCartItems([]);
        setTotalCartPrice(0);
      }
    }
  }, [loading, res]);

  return [
    itemsNum,
    cartItems,
    totalCartPrice,
    couponNameRes,
    totalCartPriceAfterDiscount,
    cartID,
  ];
};

export default GetAllUserCartHook;
