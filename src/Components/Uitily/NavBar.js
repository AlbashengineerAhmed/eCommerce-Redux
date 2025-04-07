import React, { useEffect, useState } from 'react'
import { Navbar, Container, FormControl, Nav, NavDropdown } from 'react-bootstrap'
import logo from "../../images/logo.png";
import login from "../../images/login.png";
import cart from "../../images/cart.png";
import NavbarSearchHook from '../../hook/search/navbar-search-hook';
import GetAllUserCartHook from '../../hook/cart/get-all-user-cart-hook';
import UserSvg from './UserSvg';
const NavBar = () => {
    const [OnChangeSearch, searchWord] = NavbarSearchHook()
    let word = "";
    if (localStorage.getItem("searchWord") != null)
        word = localStorage.getItem("searchWord")

    const [user, setUser] = useState('');
    useEffect(() => {
        if (localStorage.getItem("user") != null)
            setUser(JSON.parse(localStorage.getItem("user")))
    }, [])

    const logOut = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser('')
    }

    const [itemsNum] = GetAllUserCartHook()

    return (
      <Navbar
        className="sticky-top"
        bg="light"
        data-bs-theme="light"
        expand="sm"
      >
        <Container>
          <Navbar.Brand>
            <a href="/">
              <img src={logo} alt="logo" className="logo" />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <FormControl
              value={word}
              onChange={OnChangeSearch}
              type="search"
              placeholder="ابحث..."
              className="me-2 w-100 text-center"
              aria-label="Search"
            />
            <Nav className="me-auto text-center">
              {user != "" ? (
                <NavDropdown title={user.name} id=" basic-nav-dropdown">
                  {user.role === "admin" ? (
                    <NavDropdown.Item href="/admin/allproducts">
                      لوحة التحكم
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item href="/user/profile">
                      الصفحه الشخصية
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logOut} href="/">
                    تسجيل خروج
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link
                  href="/login"
                  className="nav-text d-flex justify-content-center align-items-center"
                >
                  <UserSvg />
                  <p className="mt-2 mx-3 fs-6" style={{ color: "black" }}>
                    دخول
                  </p>
                </Nav.Link>
              )}

              <Nav.Link
                href="/cart"
                className="nav-text position-relative d-flex mt-2 justify-content-center"
                style={{ color: "black" }}
              >
                <img src={cart} className="login-img" alt="cart" />
                {/* <p style={{ color: "black" }}>العربه</p> */}
                <span class="position-absolute top-10 start-10 translate-middle badge rounded-pill bg-danger">
                  {itemsNum || 0}
                </span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default NavBar
