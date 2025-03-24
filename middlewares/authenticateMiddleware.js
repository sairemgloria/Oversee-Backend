const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided.",
    });
  }

  // Remove "Bearer " if present
  const extractedToken = token.startsWith("Bearer ")
    ? token.split(" ")[1]
    : token;

  try {
    const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user data to request
    next(); // Proceed to the next middleware
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token. From Auth middleware.",
    });
  }
};

module.exports = authenticate;
