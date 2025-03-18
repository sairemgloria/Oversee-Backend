const bcrypt = require("bcryptjs");
const Admin = require("../../models/admin/adminModel");
const {
  isValidEmail,
  getMissingFields,
} = require("../../utils/admin/validationUtils");

const getAllAdmin = async (req, res) => {
  try {
    const admin = await Admin.find();

    /* Validation */
    if (admin.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No admin record found.",
      });
    }

    /* Business Logic */
    return res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (err) {
    /* Display Error Message */
    console.log(`Error: ${err}`);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

const getSelectedAdmin = async (req, res) => {
  try {
    const { id } = req.params; // Get request ID
    const admin = await Admin.findById(id);

    /* Validation: Check if admin exists. */
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    /* Business Logic */
    return res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (err) {
    /* Display Error Message */
    console.log(`Error: ${err}`);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

const createAdmin = async (req, res, next) => {
  try {
    /* Get all input fields based on model and on frontend form */
    const { name, email, password, type } = req.body;

    /* Check for missing fields */
    const missingFields = getMissingFields({ name, email, password, type });

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

    /* Validation: Check if admin email already exists */
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message:
          "Admin with this email is already exist. Please provide another.",
      });
    }

    /* Create new Admin */
    const admin = await Admin.create({
      name,
      email,
      password,
      type,
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: admin,
    });
  } catch (err) {
    /* Display error in middleware */
    next(err);
  }
};

const updateAdmin = async (req, res, next) => {
  /* Get all input field(s) */
  const { name, email, oldPassword, newPassword, type } = req.body;

  try {
    const { id } = req.params; // Get Admin ID from request params

    // ✅ Find Admin
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    let updateData = {}; // object to store updated data

    // ✅ Update fields only if provided
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (type) updateData.type = type;

    // ✅ If New Password is Provided, Validate and Hash it
    if (newPassword) {
      if (!oldPassword) {
        return res.status(400).json({
          success: false,
          message: "Old password is required to set a new password.",
        });
      }

      // ✅ Compare old password with hashed password in DB
      const isMatch = await bcrypt.compare(oldPassword, admin.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Old password is incorrect.",
        });
      }

      // ✅ Validate new password length
      if (newPassword.trim().length < 6) {
        return res.status(400).json({
          success: false,
          message: "New password must be at least 6 characters long.",
        });
      }

      // ✅ Hash the new password before updating
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    // ✅ Update the admin
    const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-password"); // 👈 Exclude password from response

    return res.status(200).json({
      success: true,
      message: "Admin profile updated successfully!",
      data: updatedAdmin,
    });
  } catch (err) {
    next(err);
  }
};

const deleteAdmin = async (req, res, next) => {
  try {
    /* Get Request ID */
    const { id } = req.params;

    const admin = await Admin.findByIdAndDelete(id);

    /* Validation: Check if admin exists. */
    if (!admin) {
      res.status(400);
      throw new Error("Admin not found");
    }

    /* Success deletion of data */
    return res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (err) {
    /* Display Errors in Middleware */
    next(err);
  }
};

module.exports = {
  getAllAdmin,
  getSelectedAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
