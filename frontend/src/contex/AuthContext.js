import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the AuthContext
export const AuthContext = createContext();

// AuthContext Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
console.log(isAuthenticated)
  const checkAuth = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/validateToken", { withCredentials: true })

      if (response?.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error validating token:', error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    // checkAuth()
  }, []);

  return (
    <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};
