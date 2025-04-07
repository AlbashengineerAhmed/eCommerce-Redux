import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RegisterHook from "../../hook/auth/register-hook";
import "./Login/Login.css"; // Assuming you're using the same styling as Login

const Register = () => {
  const [
    name,
    email,
    phone,
    password,
    confirmPassword,
    loading,
    onChangeName,
    onChangeEmail,
    onChangePhone,
    onChangePassword,
    onChangeConfirmPassword,
    OnSubmit,
  ] = RegisterHook();

  return (
    <div className="register-photo">
      <div className="form-container">
        <div className="image-holder"></div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            OnSubmit();
          }}
        >
          <h2 className="text-center">
            <strong>إنشاء</strong> حساب جديد.
          </h2>

          {/* Name Field */}
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              value={name}
              onChange={onChangeName}
              placeholder="الاسم"
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={onChangeEmail}
              placeholder="البريد الإلكتروني"
            />
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <input
              className="form-control"
              type="phone"
              value={phone}
              onChange={onChangePhone}
              placeholder="رقم الهاتف"
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={onChangePassword}
              placeholder="كلمة المرور"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              value={confirmPassword}
              onChange={onChangeConfirmPassword}
              placeholder="تأكيد كلمة المرور"
            />
          </div>

          {/* Terms and Conditions */}
          <div className="form-group">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" type="checkbox" /> أوافق على
                شروط الاستخدام.
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              {loading ? "جاري التسجيل...." : "تسجيل"}
            </button>
          </div>

          {/* Already have an account */}
          <div className="form-group">
            <span className="already">
              لديك حساب بالفعل؟{" "}
              <Link to="/login" className="text-success text-decoration-none">
                تسجيل الدخول هنا
              </Link>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
