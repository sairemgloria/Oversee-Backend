const express = require("express");
const {
  getAllAdmin,
  getSelectedAdmin,
  createAdmin,
} = require("../controllers/adminController");
const router = express.Router();

/* Routers */
router.get("/", getAllAdmin);
router.get("/:id", getSelectedAdmin);
router.post("/", createAdmin);

module.exports = router;
