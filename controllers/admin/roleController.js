const Role = require("../../models/admin/roleModel");
const { getMissingFields } = require("../../utils/admin/validationUtils");

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

const getSelectedRole = async (req, res, next) => {
  try {
    const { id } = req.params; // Get request ID

    const role = await Role.findById(id);

    /* Validation: Check if role exists. */
    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    /* Business Logic */
    return res.status(200).json({
      success: true,
      data: role,
    });
  } catch (err) {
    next(err);
  }
};

const createRole = async (req, res, next) => {
  try {
    /* Get all input fields based on the Role model */
    const { name, codeId, departmentDesignation } = req.body;

    /* Validation: Check if required fields are missing */
    const missingFields = getMissingFields({
      name,
      codeId,
      departmentDesignation,
    });
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing fields: ${missingFields.join(", ")}`,
      });
    }

    /* Validation: Check if role name is existing */
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({
        success: false,
        message: "Role name already exists. Please provide another.",
      });
    }

    /* Create new role */
    const newRole = new Role({
      name,
      codeId,
      departmentDesignation,
    });

    /* Save new role */
    const role = await newRole.save();

    return res.status(201).json({
      success: true,
      message: "Role created successfully!",
      data: role,
    });
  } catch (err) {
    next(err);
  }
};

const updateRole = async (req, res, next) => {
  try {
    /* Get the ID for the request parameter */
    const { id } = req.params;

    /* Validation: Check if role id is existing */
    const existingIdRole = await Role.findById(id);
    if (!existingIdRole) {
      return res.status(404).json({
        success: false,
        message: "Role ID not found",
      });
    }

    /* Get all request from input fields based on model */
    const { name, codeId, departmentDesignation } = req.body;

    /* Validation: Check if required fields are missing */
    const missingFields = getMissingFields({
      name,
      codeId,
      departmentDesignation,
    });
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing fields: ${missingFields.join(", ")}`,
      });
    }

    /* Validation: Check if role name is already existing */
    const existingRoleName = await Role.findOne({ name });
    if (existingRoleName) {
      return res.status(400).json({
        success: false,
        message: "Role name already exists. Please provide another.",
      });
    }

    let updateData = {}; // Create an empty object to store updated data

    // Update fields only if provided
    if (name) updateData.name = name;
    if (codeId) updateData.codeId = codeId;
    if (departmentDesignation)
      updateData.departmentDesignation = departmentDesignation;

    /* Find the selected role id and update its data */
    const updatedRole = await Role.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    /* Return success response */
    return res.status(200).json({
      success: true,
      message: "Role updated successfully!",
      data: updatedRole,
    });
  } catch (err) {
    /* Display error from middleware */
    next(err);
  }
};

const deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params; // Get request ID
    const role = await Role.findById(id);

    /* Validation: Check if role exists */
    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    /* Delete role */
    await role.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Role deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  countAllRoles,
  getAllRoles,
  getSelectedRole,
  createRole,
  updateRole,
  deleteRole,
};
