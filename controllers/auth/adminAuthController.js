const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/admin/adminModel");
const {
  isValidEmail,
  getMissingFields,
} = require("../../utils/admin/validationUtils");
const dotenv = require("dotenv").config();

/* Login */
const loginAdmin = async (req, res, next) => {
  try {
    /* Get email and password from request body */
    const { email, password } = req.body;

    /* Check for missing fields */
    const missingFields = getMissingFields({ email, password });

    /* Display missing field(s) validation */
    if (missingFields.length) {
      return res.status(400).json({
        success: false,
        message: `${missingFields.join(", ")} ${
          missingFields.length > 1 ? "are" : "is"
        } required.`,
      });
    }

    /* Validation: Check if email format is valid */
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format. Please enter a valid email.",
      });
    }

    /* Validation: Check if email is provided */
    const admin = await Admin.findOne({ email });

    /* Validation: If admin or credential is not found */
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Admin not found.",
      });
    }

    /* Compare password and check credentials */
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    /* Generate token */
    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    /* Send response */
    return res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
        password: admin.password,
        type: admin.type,
      },
      token,
    });
  } catch (err) {
    /* Display error message */
    next(err);
  }
};

module.exports = { loginAdmin };
