const Admin = require("../models/adminModel");

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
  const { id } = req.params;

  /* Validate: Check ID Format */
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Admin ID",
    });
  }

  try {
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
  const { name, email, password, type } = req.body;

  try {
    /* Validation: Check input fields. */
    if (!name || !email || !password || !type) {
      let missingFields = []; // Store missing fields.

      if (!name) missingFields.push("Name");
      if (!email) missingFields.push("Email");
      if (!password) missingFields.push("Password");
      if (!type) missingFields.push("Type");

      return res.status(400).json({
        success: false,
        message: `${missingFields.join(", ")} ${
          missingFields.length > 1 ? "are" : "is"
        } required`,
      });
    }

    /* Check if Admin Existing (Email) */
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message:
          "Admin with this email is already exist. Please provide another.",
      });
    }

    /* Business Logic */
    const admin = await Admin.create({
      name,
      email,
      password,
      type,
    });

    /* Create Condition */
    if (admin) {
      return res.status(201).json({
        success: true,
        message: "Admin created successfully",
        data: admin,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Admin not created",
      });
    }
  } catch (err) {
    /* Display Errors in Middleware */
    next(err);
  }
};

const updateAdmin = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, oldPassword, newPassword, type } = req.body;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Admin ID",
    });
  }

  try {
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    let updateData = { name, email, type };

    // ✅ Require Old Password if a New Password is Provided
    if (newPassword) {
      if (!oldPassword) {
        return res.status(400).json({
          success: false,
          message: "Old password is required to set a new password.",
        });
      }

      // ✅ Check if the old password matches the stored password
      if (admin.password !== oldPassword) {
        return res.status(400).json({
          success: false,
          message: "Old password is incorrect.",
        });
      }

      // ✅ Validate New Password Length
      if (newPassword.trim().length < 6) {
        return res.status(400).json({
          success: false,
          message: "New password must be at least 6 characters long.",
        });
      }

      // ✅ Set New Password
      updateData.password = newPassword;
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-password"); // 👈 Exclude password from response

    res.status(200).json({
      success: true,
      message: "Admin profile updated successfully!",
      data: updatedAdmin,
    });
  } catch (err) {
    next(err);
  }
};

const deleteAdmin = async (req, res, next) => {
  /* Get Request ID */
  const { id } = req.params;

  /* Validation: Check ID Format */
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Admin ID",
    });
  }

  try {
    const admin = await Admin.findByIdAndDelete(id);

    /* Validation: Check if admin exists. */
    if (!admin) {
      res.status(400);
      throw new Error("Admin not found");
    }

    res.status(200).json({
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
