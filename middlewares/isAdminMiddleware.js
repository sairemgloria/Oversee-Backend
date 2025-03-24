const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  // Remove "Bearer " if present
  const extractedToken = token.startsWith("Bearer ")
    ? token.split(" ")[1]
    : token;

  try {
    const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET); // Verify token
    const allowedAdminTypes = process.env.ADMIN_ACC_TYPE.split(","); // Convert to array

    if (!allowedAdminTypes.includes(decoded.type)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    req.user = decoded; // Attach user data to request
    next(); // Proceed to the next middleware
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token. From isAdmin middleware.",
    });
  }
};

module.exports = isAdmin;
