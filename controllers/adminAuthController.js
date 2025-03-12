const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const dotenv = require("dotenv").config();

/* Login */
const loginAdmin = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body;

    // Check if email is provided
    const admin = await Admin.findOne({ email });

    // If admin is not found
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Admin not found.",
      });
    }

    // Compare password and check credentials
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Generate token
    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    // Send response
    res.status(200).json({
      success: true,
      admin: {
        adminId: admin._id,
        email: admin.email,
        password: admin.password,
        role: admin.role,
      },
      token,
    });
  } catch (err) {
    // Display error message
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { loginAdmin };
