const departmentAdmin = require("../models/departmentAdminModel");

const getAllDepartmentAdmin = async (req, res) => {
  try {
    const deptAdmin = await departmentAdmin.find();

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
    const deptAdmin = await departmentAdmin.findById(id);

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
    const existingDepartmentAdmin = await departmentAdmin.findOne({ email });
    if (existingDepartmentAdmin) {
      return res.status(409).json({
        success: false,
        message:
          "Department Admin with this email is already exist. Please provide another.",
      });
    }

    /* Business Logic */
    const deptAdmin = await departmentAdmin.create({
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

module.exports = {
  getAllDepartmentAdmin,
  getSelectedDepartmentAdmin,
  createDepartmentAdmin,
};
