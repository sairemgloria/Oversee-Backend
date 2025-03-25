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

/* ################# */
/* # Routers Lists # */
/* ################# */

/* 
# Count All Departments
# Request Type: GET
*/
router.get("/count", authenticate, isAdmin, countAllDepartments);

/* 
# Get All Departments
# Request Type: GET
*/
router.get("/", authenticate, isAdmin, getAllDepartments);

/* 
# Get Selected Department
# Request Type: GET
*/
router.get("/:id", authenticate, isAdmin, (req, res, next) => {
  const { id } = req.params; // Get request ID

  /* Validation: Check if ID is missing or invalid ID format */
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Department ID",
    });
  }

  /* Call the actual get function */
  return getSelectedDepartment(req, res, next);
});

/* 
# Create New Department
# Request Type: POST
*/
router.post("/", authenticate, isAdmin, createDepartment);

/* 
# Update Selected Department
# Request Type: PUT
*/
router.put("/:id", authenticate, isAdmin, (req, res, next) => {
  const { id } = req.params;

  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Department ID",
    });
  }

  return updateDepartment(req, res, next);
});

/* 
# Delete Selected Department
# Request Type: DELETE
*/
router.delete("/:id", authenticate, isAdmin, (req, res, next) => {
  const { id } = req.params;

  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Department ID",
    });
  }

  return deleteDepartment(req, res, next);
});

module.exports = router;
