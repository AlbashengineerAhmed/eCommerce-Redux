import React, { useEffect } from 'react'
import { Container, Row, Spinner } from 'react-bootstrap'
import CategoryCard from './../Category/CategoryCard';
import Loading from '../Uitily/Loading';
import image from '../../images/no-items-removebg.png'
import NoItems from '../Uitily/NoItems';

const CategoryContainer = ({ data, loading }) => {
console.log(data);

    const colors = ["#FFD3E8", "#F4DBA5", "#55CFDF", "#FF6262", "#0034FF", "#FFD3E8"]
    return (
      <Container>
        <div className="admin-content-text mt-2 ">كل التصنيفات</div>
        <Row className="my-2 d-flex justify-content-between">
          {loading === false ? (
            data ? (
              data.map((item, index) => {
                return (
                  <CategoryCard
                    key={index}
                    id={item._id}
                    title={item.name}
                    img={item.image}
                    background={colors[Math.floor(Math.random() * 5) + 1]}
                  />
                );
              })
            ) : (
              <div className='text-center'>
                <NoItems/>
                <h4>لا يوجد تصنيفات</h4>
              </div>
            )
          ) : (
            /* <Spinner animation="border" variant="primary" />*/ <Loading />
          )}
        </Row>
      </Container>
    );
}

export default CategoryContainer
