// const jwt = require("jsonwebtoken");
// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

// const protect = (req, res, next) => {
//   // Token header ya cookies se nikal sakte hain
//   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Access denied. No token provided." });
//   }

//   try {
//     const verified = jwt.verify(token, JWT_SECRET);
//     req.user = verified;   // Customer / General user
//     req.seller = verified; // Seller ke liye bhi same id use ho jayegi
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: "Invalid or expired token." });
//   }
// };

// // Yahan object mein export karein taaki { protect } match ho jaye
// module.exports = { protect };




//claude cooorect office



const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

const protect = (req, res, next) => {
  let token;
  // Token header ya cookies se nikal sakte hain
  //const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }


  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
// console.log(verified)
    // ✅ Sirf seller role wale token yahan chalein
    if (verified.role !== "seller") {
      return res.status(403).json({ message: "Access denied. This token is not authorized for seller routes." });
    }

    req.seller = verified;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = { protect };