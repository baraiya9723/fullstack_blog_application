import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
const DisplayBlog = () => {
  // State to store blog posts
  const [blogs, setBlogs] = useState([]);

  // Simulated fetch for blog posts (replace with your API call)
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs",{ withCredentials: true });
        setBlogs(response.data);
        console.log(response.data)
      } catch (err) {
        console.log("Failed to add the blog. Please try again.",err);
      }

    };

    fetchBlogs();
  }, []);

  return (
    <Container className="mt-4">
      <Link to={`/addblog`}> <Button><h1 className="text-center mb-4">Add your  Blog Posts</h1></Button></Link> 
      <h1 className="text-center mb-4">All Blog Posts</h1>
      <Row>
        {blogs.map((blog) => (
            <Col md={4} sm={6} key={blog._id} className="mb-4">
         <Link to={`BlogDetails/${blog._id}`} style={{textDecoration:'none'}}>  
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>
                  <strong>Category:</strong> {blog.category}
                </Card.Text>
                <Card.Text>{blog.description}</Card.Text>
              </Card.Body>
            </Card>
          </Link> 
          </Col>
        ))}
      </Row>
     
    </Container>
  );
};

export default DisplayBlog;

