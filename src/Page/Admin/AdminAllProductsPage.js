import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminAllProducts from '../../Components/Admin/AdminAllProducts'
import Pagination from '../../Components/Uitily/Pagination'
import ViewProductAdminHook from './../../hook/admin/view-product-admin-hook';
import { useDispatch } from "react-redux";

const AdminAllProductsPage = () => {
    const dispatch = useDispatch();
    const [items, pagination,onPress] = ViewProductAdminHook();
    if (pagination)
        var pageCount = pagination;
    else
        pageCount = 0;

   

    return (
        <Container >
            <Row className='py-3 '>
                <Col sm="2" xs="2" md="2">
                    <AdminSideBar />
                </Col>

                <Col sm="10" xs="10" md="10">
                    <AdminAllProducts products={items} />
                    {
                        pageCount > 1 ? (<Pagination pageCount={pageCount} onPress={onPress} />) : null
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAllProductsPage
