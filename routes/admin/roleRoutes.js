const express = require("express");
const {
  countAllRoles,
  getAllRoles,
  createRole,
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

/* 
# Create New Role
# Request Type: POST
*/
router.post("/", createRole);

module.exports = router;
