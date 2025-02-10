const express = require("express");
const {
  getAllAdmin,
  getSelectedAdmin,
  createAdmin,
  updateAdmin,
} = require("../controllers/adminController");
const router = express.Router();

/* Routers */
router.get("/", getAllAdmin);
router.get("/:id", getSelectedAdmin);
router.post("/", createAdmin);
router.put("/:id", updateAdmin);

module.exports = router;
