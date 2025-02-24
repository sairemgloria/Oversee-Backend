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
router.put("/", (req, res) => {
  return res.status(400).json({
    success: false,
    message: "No Department Admin ID provided.",
  });
});
router.put("/:id", updateDepartmentAdmin);

module.exports = router;
