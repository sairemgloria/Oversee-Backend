const department_admin = require("../models/departmentAdminModel");

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
  const { id } = req.params;

  /* Validate: Check ID Format */
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Department Admin ID",
    });
  }

  try {
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
  /* Get Request ID */
  const { id } = req.params;

  /* Get all input field(s) */
  const { name, email, oldPassword, newPassword, type } = req.body;

  /* Check if ID is missing in parameter */
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "No Department Admin ID provided.",
    });
  }

  /* Validate: Check ID Format */
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Department Admin ID",
    });
  }

  try {
    const deptAdmin = await department_admin.findById(id);

    if (!deptAdmin) {
      return res.status(404).json({
        success: false,
        message: "Department Admin not found",
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
      if (deptAdmin.password !== oldPassword) {
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

    const updatedDeptAdmin = await department_admin
      .findByIdAndUpdate(id, updateData, { new: true })
      .select("-password"); // 👈 Exclude password from response

    res.status(200).json({
      success: true,
      message: "Department Admin updated successfully!",
      data: updatedDeptAdmin,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllDepartmentAdmin,
  getSelectedDepartmentAdmin,
  createDepartmentAdmin,
  updateDepartmentAdmin,
};
