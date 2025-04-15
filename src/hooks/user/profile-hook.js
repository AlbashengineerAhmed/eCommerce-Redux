import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserPassword,
  updateUserProfileData,
} from "../../redux/actions/authAction";
import notify from "../useNotifaction";

const ProfileHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const user = useSelector((state) => state.authReducer.currentUser);

  useEffect(() => {
    if (user) {
      if (user.data) {
        setName(user.data.name);
        setEmail(user.data.email);
        setPhone(user.data.phone);
      }
    }
  }, [user]);

  const handelSubmit = async () => {
    if (name === "") {
      notify("من فضلك ادخل اسم المستخدم", "warn");
      return;
    }
    if (phone.length <= 10) {
      notify("من فضلك ادخل رقم هاتف صحيح", "warn");
      return;
    }

    setLoading(true);
    await dispatch(
      updateUserProfileData({
        name,
        phone,
        email,
      })
    );
    setLoading(false);
    setShow(false);
  };

  const res = useSelector((state) => state.authReducer.userProfile);

  useEffect(() => {
    if (loading === false) {
      if (res && res.status === 200) {
        notify("تم تحديث البيانات بنجاح", "success");
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      } else {
        notify("فشل تحديث البيانات", "warn");
      }
    }
  }, [loading]);

  const [loadingPass, setLoadingPass] = useState(true);

  const changePassword = async () => {
    if (oldPassword === "") {
      notify("من فضلك ادخل كلمة المرور القديمة", "warn");
      return;
    }
    if (newPassword === "") {
      notify("من فضلك ادخل كلمة المرور الجديدة", "warn");
      return;
    }
    if (confirmNewPassword === "") {
      notify("من فضلك تاكيد كلمة المرور", "warn");
      return;
    }
    if (confirmNewPassword != newPassword) {
      notify("كلمة السر غير متطابقه مع التاكيد", "warn");
      return;
    }
    setLoadingPass(true);
    await dispatch(
      updateUserPassword({
        currentPassword: oldPassword,
        password: newPassword,
        passwordConfirm: confirmNewPassword,
      })
    );
    setLoadingPass(false);
  };

  const resPass = useSelector((state) => state.authReducer.userChangePassword);

  useEffect(() => {
    if (loadingPass === false) {
      if (resPass && resPass.status === 200) {
        notify("تم تغير كلمة المرور بنجاح", "success");
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      } else {
        notify("فشل تغير كلمة المرور", "warn");
      }
    }
  }, [loadingPass]);

  return [
    user,
    show,
    handleClose,
    handleShow,
    handelSubmit,
    name,
    email,
    phone,
    changePassword,
    oldPassword,
    newPassword,
    confirmNewPassword,
    setOldPassword,
    setNewPassword,
    setConfirmNewPassword,
    setName,
    setEmail,
    setPhone,
    loading,
  ];
};

export default ProfileHook;
