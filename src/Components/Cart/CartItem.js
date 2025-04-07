import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import mobile from "../../images/mobile.png";
import deleteicon from "../../images/delete.png";
import DeleteCartHook from "../../hook/cart/delete-cart-hook";

const CartItem = ({ item }) => {
  const [
    handelDeleteCart,
    show,
    handleClose,
    handleShow,
    handelDeleteItem,
    itemCount,
    onChangeCount,
    handeleUpdateCart,
  ] = DeleteCartHook(item);

  const imageSrc = item.product?.imageCover || mobile;

  return (
    <div className="cart-item-body my-3 px-2">
      {/* Delete Confirmation Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تأكيد الحذف</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">هل أنت متأكد من حذف المنتج من العربة؟</div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="font" variant="success" onClick={handleClose}>
            تراجع
          </Button>
          <Button className="font" variant="dark" onClick={handelDeleteItem}>
            حذف
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Cart Item Layout */}
      <Row className="g-3 py-3 flex-column flex-lg-row align-items-start">
        {/* Product Image */}
        <Col xs={12} lg={3} md={12} sm={12} className="text-center">
          <img
            src={imageSrc}
            alt="product"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = mobile;
            }}
            className="img-fluid cart-image  rounded shadow-sm"
          />
        </Col>

        {/* Product Details */}
        <Col xs={12} lg={9} md={12} sm={12}>
          <Row className="justify-content-between">
            <Col
              xs={12}
              className="d-flex justify-content-between align-items-center"
            >
              <div className="cat-text">
                {item.product?.category?.name || ""}
              </div>
              <div
                onClick={handleShow}
                className="d-flex align-items-center"
                style={{ cursor: "pointer" }}
              >
                <img src={deleteicon} alt="delete" width="20" height="24" />
                <div className="cat-text me-2">إزالة</div>
              </div>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col xs={12}>
              <div className="cat-title d-inline">
                {item.product?.title || ""}
              </div>
              <div className="cat-rate d-inline ms-2">
                {item.product?.ratingsAverage || 0}
              </div>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col xs={12}>
              <span className="cat-text">الماركة:</span>
              <span className="barnd-text ms-2">
                {item.product?.brand?.name || ""}
              </span>
            </Col>
          </Row>

          {item.color && (
            <Row className="mt-2">
              <Col xs={12}>
                <div
                  className="color border"
                  style={{
                    backgroundColor: item.color,
                    width: "25px",
                    height: "25px",
                  }}
                ></div>
              </Col>
            </Row>
          )}

          <Row className="mt-3 justify-content-between">
            <Col
              xs={12}
              className="d-flex justify-content-between align-items-center flex-wrap"
            >
              <div className="d-flex align-items-center">
                <span className="cat-text me-2">الكمية</span>
                <input
                  type="number"
                  value={itemCount}
                  onChange={onChangeCount}
                  className="text-center mx-2"
                  style={{ width: "60px", height: "40px" }}
                />
                <Button
                  onClick={handeleUpdateCart}
                  className="btn btn-dark ms-2"
                >
                  تطبيق
                </Button>
              </div>
              <div className="barnd-text mt-2 mt-lg-0">
                {item.price || 0} جنية
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CartItem;
