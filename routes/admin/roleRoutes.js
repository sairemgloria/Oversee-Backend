const express = require("express");
const {
  countAllRoles,
  getAllRoles,
  getSelectedRole,
  createRole,
  updateRole,
  deleteRole,
} = require("../../controllers/admin/roleController");
const authenticate = require("../../middlewares/authenticateMiddleware");
const isAdmin = require("../../middlewares/isAdminMiddleware");
const router = express.Router();

/* Router List */

// Count All Roles
router.get("/count", authenticate, isAdmin, countAllRoles);

//Get All Roles
router.get("/", authenticate, isAdmin, getAllRoles);

// Create New Role
router.post("/", authenticate, isAdmin, createRole);

// Update Selected Role
router.put("/:id", authenticate, isAdmin, (req, res, next) => {
  const { id } = req.params; // Get request ID

  // Validation: Check ID if missing or invalid format
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID Format.",
    });
  }

  return updateRole(req, res, next); // Call the actual get function
});

// Delete Selected Role
router.delete("/:id", authenticate, isAdmin, (req, res, next) => {
  const { id } = req.params; // Get request ID

  // Validation: Check ID if missing or invalid format
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID Format.",
    });
  }

  return deleteRole(req, res, next); // Call the actual get function
});

// Get Selected Role
router.get("/:id", authenticate, isAdmin, (req, res, next) => {
  const { id } = req.params; // Get request ID

  // Validation: Check ID if missing or invalid format
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID Format.",
    });
  }

  return getSelectedRole(req, res, next); // Call the actual get function
});

// Handle Undefined Routes Within /api/roles
router.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

module.exports = router;
