import React, { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
const EditBlogDetails= ()=>{
    const {id} = useParams()
    const navigate = useNavigate()
    const[blog,setBlog] = useState({});

    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
          setBlog(response.data);
          console.log(response.data)
        } catch (err) {
          console.log("Failed to add the blog. Please try again.",err);
        }
  
      };
  
      fetchBlogs();
    }, []);
    // const [blog, setBlog] = useState({
    //     title: blog.title,
    //     description: blog.description,
    //     category: blog.category,
    //     status: blog.status,
    //     slug: blog.slug,
    //   });  


      const handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validation for required fields
        if (!blog.title.trim() || !blog.category.trim()) {
          alert("Title and Category are required!");
          return;
        }
        const fetchBlogs = async () => {
          try {
            const response = await axios.put(`http://localhost:5000/api/blogs/${id}`,{
              ...blog,
            });
            setBlog(response.data);
            console.log(response.data)
          } catch (err) {
            console.log("Failed to add the blog. Please try again.",err);
          }
    
        };
    
        fetchBlogs();
        alert("Blog updated successfully!");
        navigate(`/homescreen`); // Redirect back to the blog details
      };







      return (
        <Container className="mt-4">
          <h2>Edit Blog</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={blog.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={blog.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={blog.category}
                onChange={handleChange}
                required
              />
            </Form.Group>
    
            {/* <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={blog.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </Form.Select>
            </Form.Group> */}
    
            <Form.Group className="mb-3" controlId="formSlug">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type="text"
                name="slug"
                value={blog.slug}
                onChange={handleChange}
                disabled
              />
              <Form.Text className="text-muted">
                Slug is auto-generated based on the title and category.
              </Form.Text>
            </Form.Group>
    
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Container>
      );
}
export default EditBlogDetails;