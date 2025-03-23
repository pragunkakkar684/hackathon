const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
    try {
      console.log("📥 Signup Request:", req.body);
  
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        console.log("🚨 Missing Fields");
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const lowerCaseEmail = email.toLowerCase();
      const existingUser = await User.findOne({ email: lowerCaseEmail });
  
      if (existingUser) {
        console.log("⚠️ User already exists:", email);
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email: lowerCaseEmail, password: hashedPassword });
  
      await user.save();
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      console.log("✅ Signup Successful:", user);
      res.status(201).json({ token, user });
    } catch (error) {
      console.error("❌ Signup Error:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  });
  

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📥 Login Request:", email, password);

    const lowerCaseEmail = email.toLowerCase();
    const user = await User.findOne({ email: lowerCaseEmail });

    if (!user) {
      console.log("🚨 User not found!");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("🔍 User Found:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔑 Password Match:", isMatch);

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
