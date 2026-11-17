

const jwt = require("jsonwebtoken");

const protectAdmin = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token provided",
    });
  }

  try {
    const tokenString = token.split(" ")[1];
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET || "mysecretkey");

   
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized as an admin" });
    }

    req.admin = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token failed or expired",
    });
  }
};

module.exports = { protectAdmin };