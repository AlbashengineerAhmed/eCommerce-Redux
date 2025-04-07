import React, { useState } from "react";
import { Row } from "react-bootstrap";
import SidebarSearchHook from "../../hook/search/sidebar-search-hook";
import { FaBars, FaTimes } from "react-icons/fa"; // Add FaTimes for close icon
import "./SideFilter.css";

const SideFilter = () => {
  const [category, brand, clickCategory, clickBrand, priceFrom, priceTo] =
    SidebarSearchHook();
  const [isOpen, setIsOpen] = useState(false);

  const handleCategory = (e) => {
    clickCategory(e);
    setIsOpen(false);
  };

  const handleBrand = (e) => {
    clickBrand(e);
    setIsOpen(false);
  };

  const handlePriceFrom = (e) => {
    priceFrom(e);
    setIsOpen(false);
  };

  const handlePriceTo = (e) => {
    priceTo(e);
    setIsOpen(false);
  };

  let localFrom = localStorage.getItem("priceFrom");
  let localTo = localStorage.getItem("priceTo");

  return (
    <div>
      {/* Toggle button */}
      <button className="sidebarr-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <FaBars size={24} />
      </button>

      {/* Sidebarr */}
      <div className={`sidebarr ${isOpen ? "open" : ""}`}>
        {/* Close button (only shows on small/medium screens) */}
        <div
          className="sidebarr-close-btn d-lg-none"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes />
        </div>

        <Row>
          <div className="d-flex flex-column mt-2">
            <div className="filter-title">الفئة</div>
            <div className="d-flex mt-3">
              <input onChange={handleCategory} type="checkbox" value="0" />
              <div className="filter-sub me-2 ">الكل</div>
            </div>
            {category ? (
              category.map((item, index) => (
                <div key={index} className="d-flex mt-3">
                  <input
                    onChange={handleCategory}
                    type="checkbox"
                    value={item._id}
                  />
                  <div className="filter-sub me-2 ">{item.name}</div>
                </div>
              ))
            ) : (
              <h6>لا يوجد تصنيفات</h6>
            )}
          </div>

          <div className="d-flex flex-column mt-2">
            <div className="filter-title mt-3">الماركة</div>
            <div className="d-flex mt-3">
              <input onChange={handleBrand} type="checkbox" value="0" />
              <div className="filter-sub me-2 ">الكل</div>
            </div>
            {brand ? (
              brand.map((item, index) => (
                <div key={index} className="d-flex mt-3">
                  <input
                    onChange={handleBrand}
                    type="checkbox"
                    value={item._id}
                  />
                  <div className="filter-sub me-2 ">{item.name}</div>
                </div>
              ))
            ) : (
              <h6>لا يوجد ماركات</h6>
            )}
          </div>

          <div className="filter-title my-3">السعر</div>
          <div className="d-flex">
            <p className="filter-sub my-2">من:</p>
            <input
              value={localFrom}
              onChange={handlePriceFrom}
              className="m-2 text-center"
              type="number"
              style={{ width: "50px", height: "25px" }}
            />
          </div>
          <div className="d-flex">
            <p className="filter-sub my-2">الي:</p>
            <input
              onChange={handlePriceTo}
              value={localTo}
              className="m-2 text-center"
              type="number"
              style={{ width: "50px", height: "25px" }}
            />
          </div>
        </Row>
      </div>
    </div>
  );
};

export default SideFilter;
