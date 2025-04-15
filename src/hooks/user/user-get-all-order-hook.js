import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/actions/ordersAction";

const UserGetAllOrderHook = () => {
  const [loading, setLoading] = useState(true);
  const [results, setResult] = useState(0);
  const [paginate, setPaginate] = useState({});
  const [orderData, setOrderData] = useState([]);
  const dispatch = useDispatch();

  const resAllOrder = useSelector((state) => state.orderReducer.getAllOrders);

  const get = async () => {
    setLoading(true);
    await dispatch(getAllOrders("", 5));
    setLoading(false);
  };

  const onPress = async (page) => {
    setLoading(true);
    await dispatch(getAllOrders(page, 5));
    setLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (resAllOrder) {
        if (resAllOrder.results) setResult(resAllOrder.results);
        if (resAllOrder.paginationResult)
          setPaginate(resAllOrder.paginationResult);
        if (resAllOrder.data) setOrderData(resAllOrder.data);
      }
    }
  }, [loading, resAllOrder]);

  return [results, paginate, orderData, onPress];
};

export default UserGetAllOrderHook;
