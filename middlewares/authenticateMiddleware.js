const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access Denied: No token provided - From authenticate middleware.",
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
    // return res.status(401).json({
    //   success: false,
    //   message: "Invalid token. From Auth middleware.",
    // });
    console.error("JWT Verification Error:", err.message);
    const error = new Error("Unauthorized access. Invalid token. This is from authenticate middleware.");
    res.status(401);
    next(error); // Pass error to the centralized error handler
  }
};

module.exports = authenticate;
