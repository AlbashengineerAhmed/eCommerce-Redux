import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneUserAddress,
  updateUserAddress,
} from "../../redux/actions/userAddressesAction";
import notify from "../useNotifaction";
import { useNavigate } from "react-router-dom";

const EditAddressHook = (id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingEdit, setLoadingEdit] = useState(true);
  const [alias, setAlias] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const onChangeAlias = (event) => {
    event.persist();
    setAlias(event.target.value);
  };

  const onChangeDetalis = (event) => {
    event.persist();
    setDetails(event.target.value);
  };

  const onChangePhone = (event) => {
    event.persist();
    setPhone(event.target.value);
  };
  const onChangeCity = (event) => {
    event.persist();
    setCity(event.target.value);
  };
  const onChangePostal = (event) => {
    event.persist();
    setPostalCode(event.target.value);
  };

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      await dispatch(getOneUserAddress(id));
      setLoading(false);
    };
    get();
  }, []);

  const resAddress = useSelector(
    (state) => state.userAddressesReducer.oneAddress
  );
  useEffect(() => {
    if (loading === false) {
      if (resAddress && resAddress.status === "success") {
        setAlias(resAddress.data.alias);
        setDetails(resAddress.data.details);
        setPhone(resAddress.data.phone);
        setCity(resAddress.data.city);
        setPostalCode(resAddress.data.postalCode);
      }
    }
  }, [loading]);

  const handelEdit = async () => {
    setLoadingEdit(true);
    await dispatch(
      updateUserAddress(id, {
        alias,
        details,
        phone,
        city,
        postalCode,
      })
    );
    setLoadingEdit(false);
  };

  const resEdit = useSelector(
    (state) => state.userAddressesReducer.updateAddress
  );
  useEffect(() => {
    if (loadingEdit === false) {
      if (resEdit && resEdit.status === 200) {
        notify("تمت عملية التعديل بنجاح", "success");
        setTimeout(() => {
          navigate("/user/addresses");
        }, 1000);
      } else {
        notify("فشل في عملية التعديل", "warn");
      }
    }
  }, [loadingEdit]);

  return [
    handelEdit,
    alias,
    details,
    phone,
    city,
    postalCode,
    onChangeAlias,
    onChangeDetalis,
    onChangePhone,
    onChangeCity,
    onChangePostal,
  ];
};

export default EditAddressHook;
