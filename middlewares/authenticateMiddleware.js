const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    // Validate token format: must be a string and start with "Bearer "
    if (!token || typeof token !== "string" || !token.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message:
          "Access Denied: Invalid token format. Expected 'Bearer <token>'.",
      });
    }

    // Extract the actual token (remove "Bearer ")
    const extractedToken = token.split(" ")[1];

    // Ensure the extracted token is not empty
    if (!extractedToken) {
      return res.status(401).json({
        success: false,
        message: "Access Denied: Token not found after 'Bearer '.",
      });
    }

    // Verify the token
    const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next(); // Proceed to the next middleware
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return res.status(401).json({
      success: false,
      message: err.message || "Unauthorized access: Invalid or expired token.",
    });
  }
};

module.exports = authenticate;
