import React from 'react'
import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const BrandCard = ({ img, id }) => {
  return (
    <Col
      xs="12"
      sm="6"
      md="4"
      lg="2"
      className="my-2 d-flex justify-content-center"
    >
      <Card
        className="my-1"
        style={{
          width: "170px",
          height: "170px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Link to={`/products/brand/${id}`} style={{ textDecoration: "none" }}>
          <Card.Img
            style={{ width: "100%", height: "170px", borderRadius: "50%" }}
            src={img}
          />
        </Link>
      </Card>
    </Col>
  );
}

export default BrandCard
