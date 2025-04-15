import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUserAddress } from "../../redux/actions/userAddressesAction";
import { useNavigate } from "react-router-dom";

const DeleteAddressHook = (id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelDelete = async () => {
    setLoading(true);
    await dispatch(deleteUserAddress(id));
    setLoading(false);
    setShow(false);
  };

  return [loading, handelDelete, show, handleClose, handleShow];
};

export default DeleteAddressHook;
