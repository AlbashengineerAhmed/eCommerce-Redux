import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAddresses } from "../../redux/actions/userAddressesAction";

const ViewAddressesHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const get = async () => {
      await dispatch(getAllUserAddresses());
    };
    get();
  }, []);

  const res = useSelector((state) => state.userAddressesReducer.allAddresses);

  return [res];
};

export default ViewAddressesHook;
