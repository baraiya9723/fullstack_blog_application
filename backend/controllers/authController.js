const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Registration Controller
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        // token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Controller
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (user && (await user.matchPassword(password))) {
        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
  
        // Set token in cookies
        res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 3600000 });
  
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



  const logoutUser = (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // Expire the cookie immediately
    });
  
    res.status(200).json({ message: "Logged out successfully" });
  };
  

  const validateToken = (req, res) => {
    const token = req?.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
  
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      res.json({ message: 'Token is valid' });
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };

module.exports = { registerUser, loginUser , logoutUser ,validateToken };
