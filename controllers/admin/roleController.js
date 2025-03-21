const Role = require("../../models/admin/roleModel");

const countAllRoles = async (req, res, next) => {
  try {
    const count = await Role.countDocuments();

    return res.status(200).json({
      success: true,
      message: "Role count retrieved successfully!",
      count,
    });
  } catch (err) {
    next(err);
  }
};

const getAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.find();

    if (roles.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No role record found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { countAllRoles, getAllRoles };
