const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Get all admins" });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `Get admin id: ${id}` });
});

router.post("/", (req, res) => {
  res.status(200).json({ message: "Created admin" });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `Admin updated id:${id}` });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `Admin deleted id: ${id}` });
});

module.exports = router;
