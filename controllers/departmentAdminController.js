const bcrypt = require("bcryptjs");
const department_admin = require("../models/departmentAdminModel");

const countAllDepartmentAdmin = async (req, res, next) => {
  try {
    const count = await department_admin.countDocuments(); // this counts all entry data from db

    return res.status(200).json({
      success: true,
      message: "Department admin count retrieved successfully!",
      count,
    });
  } catch (err) {
    next(err);
  }
};

const getAllDepartmentAdmin = async (req, res) => {
  try {
    const deptAdmin = await department_admin.find();

    /* Validation */
    if (deptAdmin.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No department admin record found.",
      });
    }

    /* Business Logic */
    return res.status(200).json({
      success: true,
      data: deptAdmin,
    });
  } catch (err) {
    /* Display Error Message */
    console.error(`Error: ${err}`);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

const getSelectedDepartmentAdmin = async (req, res) => {
  try {
    const { id } = req.params; // Get request ID
    const deptAdmin = await department_admin.findById(id);

    /* Validaiton: Check if department admin exists */
    if (!deptAdmin) {
      return res.status(404).json({
        success: false,
        message: "Department Admin not found",
      });
    }

    /* Business Logic */
    return res.status(200).json({
      success: true,
      data: deptAdmin,
    });
  } catch (err) {
    /* Display Error Message */
    console.error(`Error: ${err}`);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

const createDepartmentAdmin = async (req, res) => {
  /* Get all input fields based on model and on frontend form */
  const { name, email, password, type } = req.body;

  try {
    /* Validation: Check input fields */
    if (!name || !email || !password || !type) {
      let missingFields = []; // Store to an empty array all the missing fields.

      /* Push this message to the backend api to get which field(s) is empty. */
      if (!name) missingFields.push("Name");
      if (!email) missingFields.push("Email");
      if (!password) missingFields.push("Password");
      if (!type) missingFields.push("Type");

      /* Return this message for the validation of input field(s) */
      return res.status(400).json({
        success: false,
        message: `${missingFields.join(", ")} ${
          missingFields.length > 1 ? "are" : "is"
        } required`,
      });
    }

    /* Validation: Check if Department Admin existing (Email) */
    const existingDepartmentAdmin = await department_admin.findOne({ email });
    if (existingDepartmentAdmin) {
      return res.status(409).json({
        success: false,
        message:
          "Department Admin with this email is already exist. Please provide another.",
      });
    }

    /* Business Logic */
    const deptAdmin = await department_admin.create({
      name,
      email,
      password,
      type,
    });

    /* Create Condition */
    if (deptAdmin) {
      return res.status(201).json({
        success: true,
        message: "Department Admin created successfully",
        data: deptAdmin,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Department Admin not created",
      });
    }
  } catch (error) {
    /* Display Error Message */
    if (error.name === "ValidationError") {
      return res.status(400).json({
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    console.error("Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateDepartmentAdmin = async (req, res, next) => {
  /* Get all input field(s) */
  const { name, email, oldPassword, newPassword, type } = req.body;

  try {
    /* Get Request ID */
    const { id } = req.params;

    const deptAdmin = await department_admin.findById(id);

    if (!deptAdmin) {
      return res.status(404).json({
        success: false,
        message: "Department Admin not found",
      });
    }

    let updateData = {}; // object to store updated data

    // ✅ Update fields only if provided
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (type) updateData.type = type;

    // ✅ Require Old Password if a New Password is Provided
    if (newPassword) {
      if (!oldPassword) {
        return res.status(400).json({
          success: false,
          message: "Old password is required to set a new password.",
        });
      }

      // ✅ Compare old password with hashed password in DB
      const isMatch = await bcrypt.compare(oldPassword, deptAdmin.password);
      if (!isMatch) {
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

      // ✅ Hash the new password before updating
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedDeptAdmin = await department_admin
      .findByIdAndUpdate(id, updateData, { new: true })
      .select("-password"); // 👈 Exclude password from response

    return res.status(200).json({
      success: true,
      message: "Department Admin updated successfully!",
      data: updatedDeptAdmin,
    });
  } catch (err) {
    next(err);
  }
};

const deleteDepartmentAdmin = async (req, res, next) => {
  try {
    /* Get Request ID */
    const { id } = req.params;

    const deptAdmin = await department_admin.findByIdAndDelete(id);

    /* Validation: Check if admin exists. */
    if (!deptAdmin) {
      res.status(400);
      throw new Error("Department Admin not found.");
    }

    /* Success deletion of data */
    return res.status(200).json({
      success: true,
      messsage: "Department Admin deleted successfully.",
    });
  } catch (err) {
    /* Display Errors in Middleware */
    next(err);
  }
};

module.exports = {
  countAllDepartmentAdmin,
  getAllDepartmentAdmin,
  getSelectedDepartmentAdmin,
  createDepartmentAdmin,
  updateDepartmentAdmin,
  deleteDepartmentAdmin,
};
