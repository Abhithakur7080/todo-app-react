import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom';
import { useUserContext } from '../todoContext';
import { BiSolidPen } from "react-icons/bi";

const Header = () => {
  const { loggedIn, handleLogout } = useUserContext();
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <BiSolidPen className='text-light fs-3'/>
          <Navbar.Brand href="#home" className='ms-2 fw-bold'>TODO</Navbar.Brand>
          <Nav className="me-auto">
            <Link className='nav-link active' to={"/"}>Home</Link>
          </Nav>
          <Nav className="ms-auto">
            {loggedIn ?
              <Button onClick={handleLogout} variant="outline-light" type="submit">
                Logout
              </Button>
              :
              <>
                <Link className='nav-link' to={"/login"}>Log In</Link>
                <Link className='nav-link' to={"/signup"}>Sign Up</Link>
              </>
            }

          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

export default Header;