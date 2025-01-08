import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
function FooterScrren() {
    return (
        <footer className="bg-dark text-light py-4">
        <Container>
          <Row>
            {/* About Section */}
            <Col md={4}>
              <h5>About Us</h5>
              <p>
                Welcome to our blog! We share insights, tips, and stories on a wide range of topics. Stay connected to learn and grow with us.
              </p>
            </Col>
  
            {/* Quick Links */}
            <Col md={4}>
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-light text-decoration-none">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light text-decoration-none">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light text-decoration-none">
                    Blog Posts
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light text-decoration-none">
                    Contact
                  </a>
                </li>
              </ul>
            </Col>
  
            {/* Contact Information */}
            <Col md={4}>
              <h5>Contact Us</h5>
              <p>
                <i className="bi bi-envelope"></i> Email: contact@blog.com
              </p>
              <p>
                <i className="bi bi-phone"></i> Phone: +123-456-7890
              </p>
              <p>
                <i className="bi bi-geo-alt"></i> Address: 123 Blog St., Blogger City
              </p>
            </Col>
          </Row>
          <hr className="bg-light" />
          <Row>
            <Col className="text-center">
              <p>&copy; {new Date().getFullYear()} Blog Post Application. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    )
}

export default FooterScrren




