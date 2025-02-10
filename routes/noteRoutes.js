const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "All notes" });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `Get notes id: ${id}` });
});

router.post("/", (req, res) => {
  res.status(200).json({ message: "Created notes" });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `Notes updated id:${id}` });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `Notes deleted id: ${id}` });
});

module.exports = router;
