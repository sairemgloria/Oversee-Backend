const express = require("express");
const {
  countAllRoles,
  getAllRoles,
  getSelectedRole,
  createRole,
} = require("../../controllers/admin/roleController");
const router = express.Router();

/* ################# */
/* # Routers Lists # */
/* ################# */

/* 
# Count All Roles
# Request Type: GET
*/
router.get("/count", countAllRoles);

/* 
# Get All Roles
# Request Type: GET
*/
router.get("/", getAllRoles);

/* 
# Get Selected Role
# Request Type: GET
*/
router.get("/:id", (req, res, next) => {
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
router.post("/", createRole);

module.exports = router;
