const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET || "mysecretkey");
    req.seller = decoded; // Token se seller ki ID mil gayi
    next();
  } catch (error) {
    res.status(401).json({ message: "Token failed" });
  }
};

module.exports = { protect };
