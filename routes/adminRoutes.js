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

router.put("/", (req, res) => {
  return res.status(400).json({
    success: false,
    message: "No Admin ID Provided",
  });
});
router.put("/:id", updateAdmin);

router.delete("/", (req, res) => {
  return res.status(400).json({
    success: false,
    message: "No Admin ID provided.",
  });
});
router.delete("/:id", deleteAdmin);

module.exports = router;
