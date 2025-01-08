import axios from "axios";
import React ,{useContext}from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contex/AuthContext";
function NavbarScreen() {
const { setIsAuthenticated } = useContext(AuthContext);
const {navigator} = useNavigate()
  const handlelogout=async()=>{
    try{
      const res = await axios.post("http://localhost:5000/api/auth/logout")
     setIsAuthenticated(false)
     navigator('/')
    }catch(err){
      console.log(err,"msg ")
    }
  }
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
    <Container>
      {/* Brand/Logo */}
      <Navbar.Brand as={Link} to="/">
        Blog App
      </Navbar.Brand>
      {/* Toggle Button for Mobile */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {/* Collapsible Menu */}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/" className="text-light">
            <Button onClick={handlelogout}>Logout</Button>
          </Nav.Link>
          {/* <Nav.Link as={Link} to="/about" className="text-light">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/blog" className="text-light">
            Blog Posts
          </Nav.Link>
          <Nav.Link as={Link} to="/contact" className="text-light">
            Contact
          </Nav.Link> */}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default NavbarScreen;
