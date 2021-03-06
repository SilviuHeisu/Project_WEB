import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
const Navigation = () => {
  let isLoggedIn = sessionStorage.getItem("isLoggedIn");
  function reset() {
    sessionStorage.clear();
    localStorage.clear();
  }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Nav.Link href="/home">Home</Nav.Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/registerProf">Teacher Registration </Nav.Link>

            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/partialDeliverable">PartialDeliverable</Nav.Link>
            <Nav.Link href="/login" onClick={reset}>
              Log out
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
};

export default Navigation;
