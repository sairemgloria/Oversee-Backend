const Admin = require("../models/adminModel");

const getAllAdmin = async (req, res) => {
  try {
    const admin = await Admin.find();

    /* Validation */
    if (admin.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No admin found",
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
  const { name, email, password } = req.body;

  try {
    /* Validation: Check input fields. */
    if (!name || !email || !password) {
      let missingFields = []; // Store missing fields.

      if (!name) missingFields.push("Name");
      if (!email) missingFields.push("Email");
      if (!password) missingFields.push("Password");

      return res.status(400).json({
        success: false,
        message: `${missingFields.join(", ")} ${
          missingFields.length > 1 ? "are" : "is"
        } required`,
      });
    }

    /* Business Logic */
    const admin = await Admin.create({
      name,
      email,
      password,
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
  const postBody = req.body;

  /* Validation: Check ID Format */
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Admin ID",
    });
  }

  try {
    const admin = await Admin.findById(id);

    /* Add Validation */
    if (!admin) {
      res.status(400);
      throw new Error("Admin not found");
    }

    const updateAdmin = await Admin.findByIdAndUpdate(id, postBody, {
      new: true,
    });

    res.status(200).json(updateAdmin);
  } catch (err) {
    /* Display Errors in Middleware */
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
