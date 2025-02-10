const express = require("express");
const {
  getAllAdmin,
  getSelectedAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/adminController");
const router = express.Router();

/* Routers */
router.get("/", getAllAdmin);
router.get("/:id", getSelectedAdmin);
router.post("/", createAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
