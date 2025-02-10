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

module.exports = {
  getAllAdmin,
};
