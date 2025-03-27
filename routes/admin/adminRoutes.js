const express = require("express");
const {
  getAllAdmin,
  getSelectedAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../../controllers/admin/adminController");
const authenticate = require("../../middlewares/authenticateMiddleware");
const isAdmin = require("../../middlewares/isAdminMiddleware");
const router = express.Router();

/* Router List */

// Get All Admin
router.get("/", authenticate, isAdmin, getAllAdmin);

// Create Admin
router.post("/", authenticate, isAdmin, createAdmin);
// router.post("/", createAdmin); // test only for no token authentication purpose please remove this later :)

// Update Selected Admin
router.put("/:id", authenticate, isAdmin, (req, res, next) => {
  const { id } = req.params; // Get request ID

  // Validation: Check ID if missing or invalid format
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID Format.",
    });
  }

  return updateAdmin(req, res, next); // Call the actual get function
});

// Delete Selected Department Admin
router.delete("/:id", authenticate, isAdmin, (req, res, next) => {
  const { id } = req.params; // Get request ID

  // Validation: Check ID if missing or invalid format
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID Format.",
    });
  }

  return deleteAdmin(req, res, next); // Call the actual get function
});

// Get Selected Admin
router.get("/:id", authenticate, isAdmin, (req, res, next) => {
  const { id } = req.params; // Get request ID

  // Validation: Check ID if missing or invalid format
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID Format.",
    });
  }

  return getSelectedAdmin(req, res, next); // Call the actual get function
});

// Handle Undefined Routes Within /api/admins
router.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

module.exports = router;
