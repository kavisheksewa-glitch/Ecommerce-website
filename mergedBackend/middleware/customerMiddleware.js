
const jwt = require("jsonwebtoken");

const protectCustomer = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      
      token = req.headers.authorization.split(" ")[1];

      const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";
      const decoded = jwt.verify(token, JWT_SECRET);

      
      if (decoded.role !== "customer") {
        return res.status(403).json({ success: false, message: "Not authorized as a customer" });
      }

      
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token failed or expired",
      });
    }
  }

  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, please login first",
    });
  }
};

module.exports = { protectCustomer };