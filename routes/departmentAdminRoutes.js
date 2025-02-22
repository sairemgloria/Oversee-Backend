const express = require("express");
const {
  getAllDepartmentAdmin,
  getSelectedDepartmentAdmin,
  createDepartmentAdmin,
} = require("../controllers/departmentAdminController");
const router = express.Router();

/* Routers */
router.get("/", getAllDepartmentAdmin);
router.get("/:id", getSelectedDepartmentAdmin);
router.post("/", createDepartmentAdmin);

module.exports = router;
