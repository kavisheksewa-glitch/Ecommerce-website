// const jwt = require("jsonwebtoken");

// const protectCustomer = (req, res, next) => {
//   let token;

//   // Sirf Authorization header se token check karega (Cookies se nahi)
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";
//       const decoded = jwt.verify(token, JWT_SECRET);

//       req.user = decoded;
//       next();
//     } catch (error) {
//       return res.status(401).json({ 
//         success: false, 
//         message: "Token failed or expired" 
//       });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({ 
//       success: false, 
//       message: "Not authorized, please login first" 
//     });
//   }
// };

// module.exports = { protectCustomer };



//night



// const jwt = require("jsonwebtoken");

// const protectCustomer = (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       // Token extract karein
//       token = req.headers.authorization.split(" ")[1];

//       const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";
//       const decoded = jwt.verify(token, JWT_SECRET);

//       // User data ko request object me attach karein
//       req.user = decoded;
//       return next(); // 👈 Yahan return lagana zaroori hai taaki aage ka code na chale
//     } catch (error) {
//       return res.status(401).json({ 
//         success: false, 
//         message: "Token failed or expired" 
//       });
//     }
//   }

//   // Agar authorization header hi nahi mila
//   if (!token) {
//     return res.status(401).json({ 
//       success: false, 
//       message: "Not authorized, please login first" 
//     });
//   }
// };

// module.exports = { protectCustomer };



//claude correct office



const jwt = require("jsonwebtoken");

const protectCustomer = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Token extract karein
      token = req.headers.authorization.split(" ")[1];

      const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";
      const decoded = jwt.verify(token, JWT_SECRET);

      // ✅ Sirf customer role wale token yahan chalein
      if (decoded.role !== "customer") {
        return res.status(403).json({ success: false, message: "Not authorized as a customer" });
      }

      // User data ko request object me attach karein
      req.user = decoded;
      return next(); // 👈 Yahan return lagana zaroori hai taaki aage ka code na chale
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token failed or expired",
      });
    }
  }

  // Agar authorization header hi nahi mila
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, please login first",
    });
  }
};

module.exports = { protectCustomer };