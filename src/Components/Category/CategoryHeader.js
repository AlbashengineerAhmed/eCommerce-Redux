import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AllCategoryHook from "./../../hook/category/all-category-page-hook";

const CategoryHeader = () => {
  const [category, loading, pageCount, getPage] = AllCategoryHook();

  const [items, setItems] = useState([]);
  useEffect(() => {
    if (category) setItems(category.data);
  }, [category]);
  return (
    <div className="cat-header">
      <Container>
        <Row>
          <Col className="d-flex justify-content-start py-2 flex-wrap">
            {items
              ? items.map((item) => {
                  return (
                    <Link
                      to={`/products/category/${item._id}`}
                      style={{ textDecoration: "none" }}
                      key={item._id}
                    >
                      <div className="cat-text-header">{item.name}</div>
                    </Link>
                  );
                })
              : null}
            <Link to="/allcategory" style={{ textDecoration: "none" }}>
              <div className="cat-text-header">المزيد</div>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategoryHeader;
