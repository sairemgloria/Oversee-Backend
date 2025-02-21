const express = require("express");
const {
  getAllDepartmentAdmin,
} = require("../controllers/departmentAdminController");
const router = express.Router();

/* Routers */
router.get("/", getAllDepartmentAdmin);

module.exports = router;