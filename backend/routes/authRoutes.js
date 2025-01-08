const express = require("express");
const { registerUser, loginUser ,logoutUser, validateToken} = require("../controllers/authController");

const router = express.Router();

// Registration Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

router.post("/logout", logoutUser);
 
router.post("/validateToken", validateToken);
module.exports = router;
