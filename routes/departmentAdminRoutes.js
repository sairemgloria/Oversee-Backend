const express = require("express");
const {
  getAllDepartmentAdmin,
  getSelectedDepartmentAdmin,
  createDepartmentAdmin,
  updateDepartmentAdmin,
} = require("../controllers/departmentAdminController");
const router = express.Router();

/* Routers */
router.get("/", getAllDepartmentAdmin);
router.get("/:id", getSelectedDepartmentAdmin);
router.post("/", createDepartmentAdmin);
router.put("/:id", updateDepartmentAdmin);

module.exports = router;
