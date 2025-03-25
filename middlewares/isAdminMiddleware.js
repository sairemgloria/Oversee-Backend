const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please log in.",
    });
  }

  const allowedAdminTypes = process.env.ADMIN_ACC_TYPE.split(",");

  if (!allowedAdminTypes.includes(req.user.type)) {
    return res.status(403).json({
      success: false,
      mmessage: "Access denied. You are not authorized as an admin. This is from isAdmin middleware.",
    });
  }

  next(); // ✅ Continue if checks pass
};

module.exports = isAdmin;
