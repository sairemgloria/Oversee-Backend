const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const dotenv = require("dotenv").config();

/* Register */
const registerAdmin = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, name, password, type } = req.body;

    // Check if name is provided
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required.",
      });
    }

    // Check if email is provided
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    // Check if password is provided
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    // Check if type is provided
    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Account type is required.",
      });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
      type,
    });

    // Save admin
    await admin.save();

    // Send response
    res.status(201).json({
      success: true,
      admin: {
        adminId: admin._id,
        name: admin.name,
        email: admin.email,
        password: admin.password,
        type: admin.type,
      },
    });
  } catch (err) {
    // Display error message
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

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

module.exports = { registerAdmin, loginAdmin };
