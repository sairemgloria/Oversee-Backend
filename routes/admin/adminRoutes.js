const express = require("express");
const {
  getAllAdmin,
  getSelectedAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../../controllers/admin/adminController");
const router = express.Router();

/* ################# */
/* # Routers Lists # */
/* ################# */

/* 
# Get All Admin
# Request Type: GET
*/
router.get("/", getAllAdmin);

/* 
# Get Selected Admin
# Request Type: GET
*/
router.get("/:id", (req, res, next) => {
  /* Get request ID */
  const { id } = req.params;

  /* Validation: Check if ID is mising or invalid format */
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Admin ID",
    });
  }

  /* Call the actual get function */
  return getSelectedAdmin(req, res, next);
});

/* 
# Create Admin
# Request Type: POST
*/
router.post("/", createAdmin);

/* 
# Update Selected Admin
# Request Type: PUT
*/
router.put("/:id", (req, res, next) => {
  /* Get request ID */
  const { id } = req.params;

  /* Validation: Check if ID is mising or invalid format */
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Admin ID",
    });
  }

  /* Call the actual update function */
  return updateAdmin(req, res, next);
});

/* 
# Delete Selected Department Admin
# Request Type: DELETE
*/
router.delete("/:id", (req, res, next) => {
  /* Get request ID */
  const { id } = req.params;

  /* Validation: Check if ID is mising or invalid format */
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Admin ID",
    });
  }

  /* Call the actual delete function */
  return deleteAdmin(req, res, next);
});

module.exports = router;
