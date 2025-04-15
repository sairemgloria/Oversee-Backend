const moment = require("moment-timezone");
const Department = require("../../models/admin/departmentModel");
const { getMissingFields } = require("../../utils/admin/validationUtils");

const countAllDepartments = async (req, res, next) => {
  try {
    const count = await Department.countDocuments();

    return res.status(200).json({
      success: true,
      message: "Department count retrieved successfully!",
      count,
    });
  } catch (err) {
    next(err);
  }
};

const getAllDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find();

    if (departments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No department record found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: departments,
    });
  } catch (err) {
    next(err);
  }
};

const getSelectedDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);

    /* Validation: Check if department is existing */
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    /* Business Logic */
    return res.status(200).json({
      success: true,
      data: department,
    });
  } catch (err) {
    next(err);
  }
};

const createDepartment = async (req, res, next) => {
  try {
    /* Get all request from input fields based on model */
    const { name, codeId, timeIn, timeOut, overtime } = req.body;

    /* Validation: Check if required fields are missing */
    const missingFields = getMissingFields({
      name,
      codeId,
      timeIn,
      timeOut,
      overtime,
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing fields: ${missingFields.join(", ")}`,
      });
    }

    /* Validation: Check if department name is existings */
    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment) {
      return res.status(400).json({
        success: false,
        message: "Department name already exists",
      });
    }

    /* Convert time fields to valid Date objects with today's date */
    const convertToDateTime = (time) => {
      if (!time) return null;
      const todayDate = moment().format("YYYY-MM-DD"); // Get today's date
      return moment
        .tz(`${todayDate} ${time}`, "YYYY-MM-DD HH:mm:ss", "Asia/Manila")
        .toDate();
    };

    /* Create new department */
    const department = await Department.create({
      name,
      codeId,
      timeIn: convertToDateTime(timeIn),
      timeOut: convertToDateTime(timeOut),
      overtime: convertToDateTime(overtime),
    });

    /* Return success response */
    return res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: department,
    });
  } catch (err) {
    /* Display error from middleware */
    next(err);
  }
};

const updateDepartment = async (req, res, next) => {
  try {
    /* Get the ID for the request parameter */
    const { id } = req.params;

    /* Validation: Check if department id is existing */
    const existingIdDepartment = await Department.findById(id);
    if (!existingIdDepartment) {
      return res.status(400).json({
        success: false,
        message: "Department ID not found.",
      });
    }

    /* Get all request from input fields based on model */
    const { name, codeId, timeIn, timeOut, overtime } = req.body;

    /* Validation: Check if required fields are missing */
    const missingFields = getMissingFields({
      name,
      codeId,
      timeIn,
      timeOut,
      overtime,
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing fields: ${missingFields.join(", ")}`,
      });
    }

    /* Validation: Check if department name already exists (excluding the current department) */
    const existingDepartmentName = await Department.findOne({
      name,
      _id: { $ne: id }, // Exclude the current department from the check
    });

    if (existingDepartmentName) {
      return res.status(400).json({
        success: false,
        message: "Department name already exists.",
      });
    }

    /* Convert time fields to valid Date objects with today's date */
    const convertToDateTime = (time) => {
      if (!time) return null; // Allow optional time updates
      const todayDate = moment().format("YYYY-MM-DD"); // Get today's date
      return moment
        .tz(`${todayDate} ${time}`, "YYYY-MM-DD HH:mm:ss", "Asia/Manila")
        .toDate();
    };

    let updateData = {}; // Create an empty object to store updated data

    // Update fields only if provided
    if (name) updateData.name = name;
    if (codeId) updateData.codeId = codeId;
    if (timeIn) updateData.timeIn = convertToDateTime(timeIn);
    if (timeOut) updateData.timeOut = convertToDateTime(timeOut);
    if (overtime) updateData.overtime = convertToDateTime(overtime);

    /* Find the selected department id and update its data */
    const updateDepartment = await Department.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    /* Return success response */
    return res.status(200).json({
      success: true,
      message: "Department updated successfully",
      data: updateDepartment,
    });
  } catch (err) {
    /* Display error from middleware */
    next(err);
  }
};

const deleteDepartment = async (req, res, next) => {
  try {
    /* Get the ID for the request parameter */
    const { id } = req.params;

    /* Validation: Check if department id is existing */
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department ID not found.",
      });
    }

    /* Delete department */
    await Department.findByIdAndDelete(id);

    /* Return success response */
    return res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (err) {
    /* Display error from middleware */
    next(err);
  }
};

module.exports = {
  countAllDepartments,
  getAllDepartments,
  getSelectedDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
