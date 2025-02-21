const departmentAdmin = require("../models/departmentAdminModel");

const getAllDepartmentAdmin = async (req, res) => {
  try {
    const deptAdmin = await departmentAdmin.find();

    /* Validation */
    if (deptAdmin.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No department admin found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: deptAdmin,
    });
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

module.exports = {
  getAllDepartmentAdmin,
};
