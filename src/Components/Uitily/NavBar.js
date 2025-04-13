import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Form,
  FormControl,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import logo from "../../images/logo.png";
import cart from "../../images/cart.png";
import NavbarSearchHook from "../../hook/search/navbar-search-hook";
import GetAllUserCartHook from "../../hook/cart/get-all-user-cart-hook";
import UserSvg from "./UserSvg";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [OnChangeSearch, searchWord] = NavbarSearchHook();
  let word = "";
  if (localStorage.getItem("searchWord") != null)
    word = localStorage.getItem("searchWord");

  const [user, setUser] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user") != null)
      setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser("");
  };

  const [itemsNum] = GetAllUserCartHook();

  return (
    <Navbar className="sticky-top" bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="logo" className="logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex w-100 my-2 my-lg-0">
            <FormControl
              value={word}
              onChange={OnChangeSearch}
              type="search"
              placeholder="ابحث..."
              className="me-2 text-center"
              aria-label="Search"
            />
          </Form>

          <Nav className="ms-auto flex-row justify-content-evenly flex-lg-row text-center align-items-start align-items-lg-center">
            {user ? (
              <NavDropdown title={user.name} id="basic-nav-dropdown">
                {user.role === "admin" ? (
                  <NavDropdown.Item as={Link} to="/admin/allproducts">
                    لوحة التحكم
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item as={Link} to="/user/profile">
                    الصفحة الشخصية
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/" onClick={logOut}>
                  تسجيل خروج
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                className="d-flex align-items-center"
              >
                <UserSvg />
                <span className="mx-2">دخول</span>
              </Nav.Link>
            )}

            <Nav.Link
              as={Link}
              to="/cart"
              className="position-relative mt-2 mt-lg-0"
            >
              <img src={cart} className="login-img" alt="cart" />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {itemsNum || 0}
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
