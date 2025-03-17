const express = require("express");
const {
  loginAdmin,
} = require("../../controllers/auth/adminAuthController");

const router = express.Router();

router.post("/login", loginAdmin);

module.exports = router;
