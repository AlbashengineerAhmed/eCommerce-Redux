import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import SubTiltle from '../Uitily/SubTiltle'
import ProductCard from './ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import { getProductWishList } from '../../redux/actions/wishListAction';
import CardContainerHook from './../../hook/products/card-container-hook';
import NoItems from './../Uitily/NoItems';

const CardProductsContainer = ({ title, btntitle, pathText, products }) => {

    const [favProd] = CardContainerHook()
console.log(products);

    return (
      <Container>
        {products ? (
          <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />
        ) : null}
        <Row className="my-2 d-flex justify-content-between">
          {products && products.length > 0 ? (
            products.map((item, index) => (
              <ProductCard favProd={favProd} key={index} item={item} />
            ))
          ) : (
            <div className="text-center">
              <NoItems />
              <h4>لا يوجد منتجات</h4>
            </div>
          )}
        </Row>
      </Container>
    );
}

export default CardProductsContainer
