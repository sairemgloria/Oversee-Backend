const express = require("express");
const {
  countAllDepartments,
  getAllDepartments,
  getSelectedDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../../controllers/admin/departmentController");
const authenticate = require("../../middlewares/authenticateMiddleware");
const isAdmin = require("../../middlewares/isAdminMiddleware");
const router = express.Router();

/* Router List */

// Count All Departments
router.get("/count", authenticate, isAdmin, countAllDepartments);

// Get All Departments
router.get("/", authenticate, isAdmin, getAllDepartments);

// Create New Department
router.post("/", authenticate, isAdmin, createDepartment);

// Update Selected Department
router.put("/:id", authenticate, isAdmin, (req, res, next) => {
  const { id } = req.params; // Get request ID

  // Validation: Check ID if missing or invalid format
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Department ID Format.",
    });
  }

  return updateDepartment(req, res, next); // Call the actual get function
});

// Delete Selected Department
router.delete("/:id", authenticate, isAdmin, (req, res, next) => {
  const { id } = req.params; // Get request ID

  // Validation: Check ID if missing or invalid format
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Department ID Format.",
    });
  }

  return deleteDepartment(req, res, next); // Call the actual get function
});

// Get Selected Department
router.get("/:id", authenticate, isAdmin, (req, res, next) => {
  const { id } = req.params; // Get request ID

  // Validation: Check ID if missing or invalid format
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Department ID Format.",
    });
  }

  /* Call the actual get function */
  return getSelectedDepartment(req, res, next); // Call the actual get function
});

// Handle Undefined Routes Within /api/departments
router.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

module.exports = router;
