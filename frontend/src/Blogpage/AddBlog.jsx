import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Web Development",
    status: "Pending",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate the slug dynamically based on title and category
    const slug = `${formData.title.toLowerCase().replace(/\s+/g, "-")}-${formData.category.toLowerCase().replace(/\s+/g, "-")}`;
    const createdAt = new Date().toISOString().slice(0, 10); // Current date in YYYY-MM-DD format

    try {
      const response = await axios.post("http://localhost:5000/api/blogs", {
        ...formData,
        slug,
        createdAt,
      },
      { withCredentials: true }
    );
      setMessage("Blog added successfully!");
      setFormData({
        title: "",
        description: "",
        category: "Web Development",
        status: "Pending",
      });
      // navigate(`/homescreen`);
    } catch (err) {
      setError("Failed to add the blog. Please try again.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h2>Add a New Blog</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter blog title"
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter blog description"
                required
              />
            </Form.Group>

            <Form.Group controlId="formCategory" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="Web Development">Web Development</option>
                <option value="Programming">Programming</option>
                <option value="Database">Database</option>
                <option value="Web Design">Web Design</option>
                <option value="Backend Development">Backend Development</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formStatus" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Blog
            </Button>
            <Link to={'/homescreen'}>
            <Button variant="primary" style={{marginLeft:'30px'}}>
              back
            </Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddBlog;
