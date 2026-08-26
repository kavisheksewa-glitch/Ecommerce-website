// const jwt = require("jsonwebtoken");

// const protectAdmin = (req, res, next) => {
//   let token = req.headers.authorization;

//   if (!token || !token.startsWith("Bearer ")) {
//     return res.status(401).json({ 
//       success: false, 
//       message: "Not authorized, no token provided" 
//     });
//   }

//   try {
//     // Token verify karein
//     const tokenString = token.split(" ")[1];
//     const decoded = jwt.verify(tokenString, process.env.JWT_SECRET || "mysecretkey");

//     // Optional: Agar aap check karna chahte hain ki yeh token admin ka hi hai ya nahi
//     // if (decoded.role !== 'admin') {
//     //   return res.status(403).json({ success: false, message: "Not authorized as an admin" });
//     // }

//     req.admin = decoded; // Token se decoded data (jaise admin id/email) req mein save ho jayega
//     next();
//   } catch (error) {
//     return res.status(401).json({ 
//       success: false, 
//       message: "Token failed or expired" 
//     });
//   }
// };

// module.exports = { protectAdmin };



//claude correct office



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

    // ✅ Sirf admin role wale token yahan chalein
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized as an admin" });
    }

    req.admin = decoded; // Token se decoded data (jaise admin id/email) req mein save ho jayega
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token failed or expired",
    });
  }
};

module.exports = { protectAdmin };