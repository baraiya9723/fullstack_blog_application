import React, { useState,useContext } from "react";
import { Container, Form, Button, Tab, Tabs } from "react-bootstrap";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { AuthContext } from './contex/AuthContext';
const Login = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const {navigator} = useNavigate()
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [registerDetails, setRegisterDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login Details:", loginDetails);
      const fetchBlogs = async () => {
        try {
          const response = await axios.post("http://localhost:5000/api/auth/login",{
            ...loginDetails
          });
          setIsAuthenticated(true)
          console.log(response.data)
          alert("loging successfully ")
          navigator('/')
        } catch (err) {
          console.log("Failed to add the blog. Please try again.",err.message);
        }
  
      };
  
      fetchBlogs();
    // Add your login API call logic here
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerDetails.password !== registerDetails.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Registration Details:", registerDetails);
    // api logic 
    const fetchBlogs = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/register",{
          ...registerDetails
        });
        console.log(response.data)
        alert("Registration successfully ")
      } catch (err) {
        console.log("Failed to add the blog. Please try again.",err);
      }

    };

    fetchBlogs();
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">Login / Registration</h1>
      <Tabs defaultActiveKey="login" className="mb-3">
        {/* Login Tab */}
        <Tab eventKey="login" title="Login">
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group controlId="loginEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={loginDetails.email}
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, email: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="loginPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={loginDetails.password}
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, password: e.target.value })
                }
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Tab>

        {/* Registration Tab */}
        <Tab eventKey="register" title="Register">
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group controlId="registerName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={registerDetails.name}
                onChange={(e) =>
                  setRegisterDetails({ ...registerDetails, name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="registerEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={registerDetails.email}
                onChange={(e) =>
                  setRegisterDetails({ ...registerDetails, email: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="registerPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={registerDetails.password}
                onChange={(e) =>
                  setRegisterDetails({ ...registerDetails, password: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={registerDetails.confirmPassword}
                onChange={(e) =>
                  setRegisterDetails({
                    ...registerDetails,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Register
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Login;
