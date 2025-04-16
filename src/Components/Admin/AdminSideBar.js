import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle Open Button (outside) */}
      {!isOpen && (
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
      )}

      {/* Sidebar */}
      <div className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          {/* Close Button (inside sidebar) */}
          <button className="sidebar-close-btn" onClick={toggleSidebar}>
            ✕
          </button>

          <Link to="/admin/allorders" onClick={toggleSidebar}>
            <div className="admin-side-text">اداره الطلبات</div>
          </Link>
          <Link to="/admin/allproducts" onClick={toggleSidebar}>
            <div className="admin-side-text">اداره المنتجات</div>
          </Link>
          <Link to="/admin/addbrand" onClick={toggleSidebar}>
            <div className="admin-side-text">اضف ماركه</div>
          </Link>
          <Link to="/admin/addcategory" onClick={toggleSidebar}>
            <div className="admin-side-text">اضف تصنيف</div>
          </Link>
          <Link to="/admin/addsubcategory" onClick={toggleSidebar}>
            <div className="admin-side-text">اضف تصنيف فرعي</div>
          </Link>
          <Link to="/admin/addproduct" onClick={toggleSidebar}>
            <div className="admin-side-text">اضف منتج</div>
          </Link>
          <Link to="/admin/addcoupon" onClick={toggleSidebar}>
            <div className="admin-side-text">اضف كوبون</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminSideBar;
