const express = require("express");
const {
  countAllDepartmentAdmin,
  getAllDepartmentAdmin,
  getSelectedDepartmentAdmin,
  createDepartmentAdmin,
  updateDepartmentAdmin,
  deleteDepartmentAdmin,
} = require("../../controllers/admin/departmentAdminController");
const router = express.Router();

/* ################# */
/* # Routers Lists # */
/* ################# */

/* 
# Count All Department Admin
# Request Type: GET
*/
router.get("/count", countAllDepartmentAdmin);

/* 
# Get All Department Admin
# Request Type: GET
*/
router.get("/", getAllDepartmentAdmin);

/* 
# Get Selected Department Admin
# Request Type: GET
*/
router.get("/:id", async (req, res, next) => {
  /* Get request ID */
  const { id } = req.params;

  /* Validate: Check if id is missing or invalid id format */
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing Department Admin ID.",
    });
  }

  /* Call the actual get function */
  return getSelectedDepartmentAdmin(req, res, next);
});

/* 
# Create Department Admin
# Request Type: POST
*/
router.post("/", createDepartmentAdmin);

/* 
# Update Selected Department Admin
# Request Type: PUT
*/
router.put("/:id", async (req, res, next) => {
  /* Get request ID */
  const { id } = req.params;

  /* Validate: Check if id is missing or invalid id format */
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing Department Admin ID.",
    });
  }

  /* Call the actual update function */
  return updateDepartmentAdmin(req, res, next);
});

/* 
# Delete Selected Department Admin
# Request Type: DELETE
*/
router.delete("/:id", async (req, res, next) => {
  /* Get request ID */
  const { id } = req.params;

  /* Validate: Check if id is missing or invalid id format */
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing Department Admin ID.",
    });
  }

  /* Call the actual delete function */
  return deleteDepartmentAdmin(req, res, next);
});

module.exports = router;
