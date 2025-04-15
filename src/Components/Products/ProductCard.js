import React from "react";
import { Card, Col } from "react-bootstrap";
import rate from "../../images/rate.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProductCardHook from "./../../hook/products/product-card-hook";

const ProductCard = ({ item, favProd }) => {
  const [removeToWishListData, addToWishListData, handelFav, favImg] =
    ProductCardHook(item, favProd);
  const navigate = useNavigate();

  const handleProductClick = (e) => {
    e.preventDefault();
    navigate(`/products/${item._id}`, { state: { from: "product-card" } });
  };

  return (
    <Col xs="12" sm="12" md="4" lg="4" xl="4" className="d-flex">
      <Card
        className="my-2 product-card"
        style={{
          width: "100%",
          height: "470px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 2px 0 rgba(151,151,151,0.5)",
          transition: "all 0.3s ease",
        }}
      >
        <Link
          to={`/products/${item._id}`}
          style={{ textDecoration: "none" }}
          onClick={handleProductClick}
        >
          <Card.Img
            style={{ height: "350px", width: "100%" }}
            src={item.imageCover}
          />
        </Link>
        <div className="d-flex justify-content-end mx-2">
          <img
            src={favImg}
            alt=""
            onClick={handelFav}
            className="text-center"
            style={{
              height: "24px",
              width: "26px",
              cursor: "pointer",
            }}
          />
        </div>
        <Card.Body>
          <Card.Title>
            <div className="card-title">{item.title}</div>
          </Card.Title>
          <div className="card-text">
            <div className="d-flex justify-content-between ">
              <div className="d-flex">
                <img
                  className=""
                  src={rate}
                  alt=""
                  height="16px"
                  width="16px"
                />
                <div className="card-rate mx-2">{item.ratingsAverage || 0}</div>
              </div>
              <div className="d-flex">
                <div className="card-price">
                  {item.priceAfterDiscount >= 1 ? (
                    <div>
                      <span style={{ textDecorationLine: "line-through" }}>
                        {item.price}
                      </span>{" "}
                      {item.priceAfterDiscount}
                    </div>
                  ) : (
                    item.price
                  )}
                </div>
                <div className="card-currency mx-1">جنيه</div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      <ToastContainer />
    </Col>
  );
};

export default ProductCard;
