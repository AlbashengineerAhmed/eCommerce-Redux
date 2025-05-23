import React, { useEffect } from 'react'
import { Container, Row, Spinner } from 'react-bootstrap';
import SubTiltle from './../../Uitily/SubTiltle';
import HomeCategoryHook from './../../../hook/category/home-category-hook';
import CategoryCard from './../../Category/CategoryCard';

const HomeCategory = () => {

    const [category, loading, colors] = HomeCategoryHook();
console.log(category);

    return (
        <Container>
            <SubTiltle title="التصنيفات" btntitle="المزيد" pathText="/allcategory" />
            <Row className='my-2 d-flex justify-content-between'>
                {
                    loading === false ? (
                        category ? (
                            category.data.slice(1, 6).map((item, index) => {
                                return (<CategoryCard key={index} id={item._id} title={item.name} img={item.image} background={colors[index]} />)
                            })
                        ) : <h4>لا يوجد تصنيفات</h4>
                    ) : <Spinner animation="border" variant="primary" />

                }

            </Row>
        </Container>
    )
}

export default HomeCategory
