const express = require("express");
const {
  countAllDepartmentAdmin,
  getAllDepartmentAdmin,
  getSelectedDepartmentAdmin,
  createDepartmentAdmin,
  updateDepartmentAdmin,
  deleteDepartmentAdmin,
} = require("../../controllers/admin/departmentAdminController");
const authenticate = require("../../middlewares/authenticateMiddleware");
const isAdmin = require("../../middlewares/isAdminMiddleware");
const router = express.Router();

/* Router List */

// Count All Department Admin
router.get("/count", authenticate, isAdmin, countAllDepartmentAdmin);

// Get All Department Admin
router.get("/", authenticate, isAdmin, getAllDepartmentAdmin);

// Create Department Admin
router.post("/", authenticate, isAdmin, createDepartmentAdmin);

// Update Selected Department Admin
router.put("/:id", authenticate, isAdmin, (req, res, next) => {
  const { id } = req.params; // Get request ID

  // Validation: Check ID if missing or invalid format
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Department Admin ID Format.",
    });
  }

  return updateDepartmentAdmin(req, res, next); // Call the actual get function
});

// Delete Selected Department Admin
router.delete("/:id", authenticate, isAdmin, (req, res, next) => {
  const { id } = req.params; // Get request ID

  // Validation: Check ID if missing or invalid format
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Department Admin ID Format.",
    });
  }

  return deleteDepartmentAdmin(req, res, next); // Call the actual get function
});

// Get Selected Department Admin
router.get("/:id", authenticate, isAdmin, (req, res, next) => {
  const { id } = req.params; // Get request ID

  // Validation: Check ID if missing or invalid format
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Department Admin ID Format.",
    });
  }

  return getSelectedDepartmentAdmin(req, res, next); // Call the actual get function
});

// Handle Undefined Routes Within /api/department-admins
router.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

module.exports = router;
