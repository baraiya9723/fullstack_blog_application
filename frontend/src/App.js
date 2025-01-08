import './App.css';
import { useContext } from 'react';
import BlogDetails from './Blogpage/BlogDetails';
import EditBlogDetails from'./Blogpage/EditBlogDetails'
import HomeScreen from './component/HomeScrren';
import AddBlog from './Blogpage/AddBlog'
import Login from './Login';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from './contex/AuthContext';
function App() {
  const { isAuthenticated } = useContext(AuthContext);
  // const [isAuthenticated,setIsAuthenticated] = useState(true)
  return (
    <Router>
    <Routes>
      {/* Login Route */}
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/homescreen" replace /> : <Login />} 
      />

      {/* HomeScreen Route */}
      <Route 
        path="/homescreen" 
        element={isAuthenticated ? <HomeScreen /> : <Navigate to="/" />} 
      />

      {/* Blog Details Route */}
      <Route 
        path="/homescreen/BlogDetails/:id" 
        element={isAuthenticated ? <BlogDetails /> : <Navigate to="/" />} 
      />

      {/* Edit Blog Details Route */}
      <Route 
        path="/homescreen/EditBlogDetails/:id" 
        element={isAuthenticated ? <EditBlogDetails /> : <Navigate to="/" />} 
      />

      {/* Add Blog Route */}
      <Route 
        path="/addblog" 
        element={isAuthenticated ? <AddBlog /> : <Navigate to="/" />} 
      />
    </Routes>
  </Router>
  );
}

export default App;
