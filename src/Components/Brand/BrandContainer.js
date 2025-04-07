import React from 'react'
import BrandCard from './BrandCard'
import brand1 from "../../images/brand1.png";
import brand2 from "../../images/brand2.png";
import brand3 from "../../images/brand3.png";
import { Container, Row, Spinner } from 'react-bootstrap';
import NoItems from '../Uitily/NoItems';
import Loading from '../Uitily/Loading';

const BrandContainer = ({ data,loading }) => {
   
    return (
      <Container>
        <div className="admin-content-text mt-2 ">كل الماركات</div>
        <Row className="my-1 d-flex justify-content-between">
          {loading === false ? (
            data ? (
              data.map((item, index) => {
                return <BrandCard id={item._id} key={index} img={item.image} />;
              })
            ) : (
              <div className="text-center">
                <NoItems />
                <h4>لا يوجد ماركات</h4>
              </div>
            )
          ) : (
            <Loading/>
          )}
        </Row>
      </Container>
    );
}

export default BrandContainer
