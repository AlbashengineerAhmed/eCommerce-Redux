import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBrand } from "../../redux/actions/brandAction";
import notify from "../../hook/useNotifaction";
import avatar from "../../images/avatar.png";

const AddBrandHook = () => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(avatar);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false); // start with false
  const [isPress, setIsPress] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false); // new flag

  // Handle name input
  const onChangeName = (event) => {
    event.persist();
    setName(event.target.value);
  };

  // Handle image upload
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
      setSelectedFile(event.target.files[0]);
    }
  };

  const res = useSelector((state) => state.allBrand.brand);

  // Submit form
  const handelSubmit = async (event) => {
    event.preventDefault();
    if (name === "" || selectedFile === null) {
      notify("من فضلك اكمل البيانات", "warn");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", selectedFile);

    setLoading(true);
    setIsPress(true);
    setHasSubmitted(true);
    await dispatch(createBrand(formData));
    setLoading(false);
  };

  useEffect(() => {
    if (!loading && hasSubmitted) {
      setImg(avatar);
      setName("");
      setSelectedFile(null);
      setTimeout(() => setIsPress(false), 1000);

      if (res?.status === 201) {
        notify("تمت عملية الاضافة بنجاح", "success");
      } else {
        notify("هناك مشكله فى عملية الاضافة", "error");
      }

      setHasSubmitted(false); // reset flag
    }
  }, [loading]);

  return [
    img,
    name,
    loading,
    isPress,
    handelSubmit,
    onImageChange,
    onChangeName,
  ];
};

export default AddBrandHook;
