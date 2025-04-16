import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminAddProducts from '../../Components/Admin/AdminAddProducts'
const AdminAddProductsPage = () => {
    return (
      <Container>
        <Row className="py-3">
          <Col sm="2" xs="2" md="2">
            <AdminSideBar />
          </Col>

          <Col sm="10" xs="10" md="10">
            <AdminAddProducts />
          </Col>
        </Row>
      </Container>
    );
}

export default AdminAddProductsPage
