import React, { useEffect, useState } from 'react'
import { useParams ,useNavigate  } from 'react-router-dom'
import { Button, Card, Container } from "react-bootstrap";
import axios  from 'axios';
function BlogDetails() {
    const {id} = useParams();
    const [BlogDetail, setBlogDetail] = new useState({});
    const navigate = useNavigate();


    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
          setBlogDetail(response.data);
          console.log(response.data)
        } catch (err) {
          console.log("Failed to add the blog. Please try again.",err);
        }
  
      };
  
      fetchBlogs();
    }, []);

const handleDelete = async() => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/blogs/${id}`);
    console.log(response.data)
    alert("deleted successfully ")
    navigate('/')
  } catch (err) {
    console.log("Failed to add the blog. Please try again.",err);
  }
  };

  const handleEdit = () => {
    navigate(`/homescreen/EditBlogDetails/${BlogDetail._id}`); // Navigate to edit form with BlogDetail ID
  };

if (!BlogDetail) {
    return <h2>Blog not found!</h2>;
  }

    return (
        <>
 <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>{BlogDetail.title}</Card.Title>
          <Card.Text>
            <strong>Category:</strong> {BlogDetail.category}
          </Card.Text>
          <Card.Text>
            <strong>Description:</strong> {BlogDetail.description}
          </Card.Text>
          <Card.Text>
            <strong>Created At:</strong> {BlogDetail.createdAt}
          </Card.Text>
          <Card.Text>
            <strong>Status:</strong> {BlogDetail.status}
          </Card.Text>
          <Card.Text>
            <strong>Slug:</strong> {BlogDetail.slug}
          </Card.Text>
          <Button variant="primary" onClick={handleEdit} className="me-2">
            Edit Blog
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Blog
          </Button>
        </Card.Body>
      </Card>
    </Container>
        </>
    )
}

export default BlogDetails
