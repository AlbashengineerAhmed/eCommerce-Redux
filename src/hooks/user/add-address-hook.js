import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserAddress } from "../../redux/actions/userAddressesAction";
import notify from "../useNotifaction";
import { useNavigate } from "react-router-dom";

const AddAddressHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alias, setAlias] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [loading, setLoading] = useState(true);

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

  const onSubmit = async () => {
    if (
      alias === "" ||
      details === "" ||
      phone === "" ||
      city === "" ||
      postalCode === ""
    ) {
      notify("من فضلك اكمل البيانات", "warn");
      return;
    }

    setLoading(true);
    await dispatch(
      addUserAddress({
        alias,
        details,
        phone,
        city,
        postalCode,
      })
    );
    setLoading(false);
  };

  const res = useSelector((state) => state.userAddressesReducer.addUserAddress);

  useEffect(() => {
    if (loading === false) {
      if (res && res.status === 200) {
        notify("تمت اضافة العنوان بنجاح", "success");
        setTimeout(() => {
          navigate("/user/addresses");
        }, 1000);
      } else {
        notify("هناك مشكله فى عملية الاضافة ", "warn");
      }
    }
  }, [loading]);

  return [
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
    onSubmit,
  ];
};

export default AddAddressHook;
