import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminAddCoupon from '../../Components/Admin/AdminAddCoupon'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
const AdminAddCouponPage = () => {
    return (
      <Container>
        <Row className="py-3">
          <Col sm="2" xs="2" md="2">
            <AdminSideBar />
          </Col>

          <Col sm="10" xs="10" md="10">
            <AdminAddCoupon />
          </Col>
        </Row>
      </Container>
    );
}

export default AdminAddCouponPage