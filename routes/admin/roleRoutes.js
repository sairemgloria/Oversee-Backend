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

/* ################# */
/* # Routers Lists # */
/* ################# */

/* 
# Count All Roles
# Request Type: GET
*/
router.get("/count", authenticate, isAdmin, countAllRoles);

/* 
# Get All Roles
# Request Type: GET
*/
router.get("/", authenticate, isAdmin, getAllRoles);

/* 
# Get Selected Role
# Request Type: GET
*/
router.get("/:id", authenticate, isAdmin, (req, res, next) => {
  const { id } = req.params; // Get request ID

  /* Validation: Check if ID is missing or invalid ID format */
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Role ID",
    });
  }

  /* Call the actual get function */
  return getSelectedRole(req, res, next);
});

/* 
# Create New Role
# Request Type: POST
*/
router.post("/", authenticate, isAdmin, createRole);

/* 
# Update Selected Role
# Request Type: PUT
*/
router.put("/:id", authenticate, isAdmin, (req, res, next) => {
  const { id } = req.params;

  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Role ID",
    });
  }

  return updateRole(req, res, next);
});

/* 
# Delete Selected Role
# Request Type: DELETE
*/
router.delete("/:id", authenticate, isAdmin, (req, res, next) => {
  const { id } = req.params;

  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Role ID",
    });
  }

  return deleteRole(req, res, next);
});

module.exports = router;
