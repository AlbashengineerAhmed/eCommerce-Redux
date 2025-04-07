import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import LoginHook from "../../../hook/auth/login-hook";

export default function Login() {
  const [
    email,
    password,
    loading,
    onChangeEmail,
    onChangePassword,
    onSubmit,
    isPress,
  ] = LoginHook();

  return (
    <div className="register-photo">
      <div className="form-container">
        <div className="image-holder"></div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <h2 className="text-center">
            <strong>تسجيل الدخول</strong> الآن.
          </h2>

          {/* Email Input Field */}
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={onChangeEmail}
            />
          </div>

          {/* Password Input Field */}
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={onChangePassword}
            />
          </div>

          {/* Login Button */}
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              {loading ? "جاري التحميل..." : "تسجيل الدخول"}
            </button>
          </div>

          {/* Loading Spinner */}
          {isPress && loading && (
            <div className="text-center">
              <Spinner animation="border" role="status" />
            </div>
          )}

          {/* Link to Register */}
          <div className="form-group">
            <Link to="/register" className="text-danger text-decoration-none">
              ليس لديك حساب؟ اضغط هنا
            </Link>
          </div>

          {/* Link to Forgot Password */}
          <div className="form-group">
            <Link
              to="/user/forget-password"
              className="text-danger text-decoration-none"
            >
              هل نسيت كلمة المرور؟
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
