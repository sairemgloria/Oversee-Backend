const express = require("express");
const {
  countAllRoles,
  getAllRoles,
} = require("../../controllers/admin/roleController");
const router = express.Router();

/* ################# */
/* # Routers Lists # */
/* ################# */

/* 
# Count All Roles
# Request Type: GET
*/
router.get("/count", countAllRoles);

/* 
# Get All Roles
# Request Type: GET
*/
router.get("/", getAllRoles);

module.exports = router;
