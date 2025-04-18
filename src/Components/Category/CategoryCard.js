import React from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CategoryCard = ({ background, img, title, id }) => {
    return (
        <Col
            xs="12"
            sm="6"
            md="4"
            lg="2"
            className="my-5 d-flex justify-content-around ">
            <div className="allCard mb-3 ">
                <div
                    className="categoty-card "
                    style={{ backgroundColor: `${background}` }}></div>{" "}
                <Link to={`/products/category/${id}`} style={{ textDecoration: 'none' }}>
                    <img alt="category" src={img} className="categoty-card-img" />
                    <p className="categoty-card-text my-2">{title}</p>
                </Link>
            </div>
        </Col>
    )
}

export default CategoryCard
