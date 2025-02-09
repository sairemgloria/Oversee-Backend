const getNotes = (req, res) => {
  res.status(200).json({ message: "Get all notes" });
};

module.exports = {
  getNotes,
};
