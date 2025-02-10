const express = require("express");
const { getAllAdmin } = require("../controllers/adminController");
const router = express.Router();

/* Routers */
router.get("/", getAllAdmin);

module.exports = router;
