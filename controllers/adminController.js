const getAdmins = (req, res) => {
  res.status(200).json({ message: "Get all admins" });
};

module.exports = {
  getAdmins,
};
