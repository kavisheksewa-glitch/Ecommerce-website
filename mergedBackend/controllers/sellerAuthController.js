// const Seller = require("../models/Seller");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // Register
// const register = async (req, res) => {
//   try {
//     console.log(`Received registration request: ${JSON.stringify(req.body)}`);
//     const {
//       name, email, phone, shopName, address, city, state, pincode, password,
//     } = req.body;

//     const sellerExists = await Seller.findOne({ email });
//     if (sellerExists) {
//       return res.status(400).json({ message: "Seller already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const profileImagePath = req.file ? req.file.path : "";

//     const seller = await Seller.create({
//       name, email, phone, shopName, address, city, state, pincode,
//       password: hashedPassword,
//       profileImage: profileImagePath,
//     });

//     const sellerResponse = seller.toObject();
//     delete sellerResponse.password;

//     res.status(201).json({
//       message: "Seller Registered Successfully",
//       seller: sellerResponse,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Login
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const seller = await Seller.findOne({ email });

//     if (!seller) {
//       return res.status(400).json({ message: "Seller not found" });
//     }

//     const isMatch = await bcrypt.compare(password, seller.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid Password" });
//     }

//     const token = jwt.sign(
//       { id: seller._id },
//       process.env.JWT_SECRET || "mysecretkey",
//       { expiresIn: "7d" }
//     );

//     const sellerData = seller.toObject();
//     delete sellerData.password;

//     res.json({
//       message: "Login Successful",
//       token,
//       seller: sellerData,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Seller Details
// const getSeller = async (req, res) => {
//   try {
//     const seller = await Seller.findById(req.params.id).select("-password");

//     if (!seller) {
//       return res.status(404).json({ message: "Seller not found" });
//     }

//     res.json(seller);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update Seller Details
// const updateSeller = async (req, res) => {
//   try {
//     const {
//       name,
//       shopName,
//       email,
//       phone,
//       address,
//       city,
//       state,
//       pincode,
//     } = req.body;

//     const seller = await Seller.findById(req.params.id);

//     if (!seller) {
//       return res.status(404).json({ message: "Seller not found" });
//     }

//     seller.name = name;
//     seller.shopName = shopName;
//     seller.email = email;
//     seller.phone = phone;
//     seller.address = address;
//     seller.city = city;
//     seller.state = state;
//     seller.pincode = pincode;

//     if (req.body.password && req.body.password.trim() !== "") {
//       seller.password = await bcrypt.hash(req.body.password, 10);
//     }

//     await seller.save();

//     const sellerData = seller.toObject();
//     delete sellerData.password;

//     res.json({
//       message: "Profile Updated Successfully",
//       seller: sellerData,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   register,
//   login,
//   getSeller,
//   updateSeller,
// };

// new









// const Seller = require("../models/Seller");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // Register
// const register = async (req, res) => {
//   try {
//     console.log(`Received registration request: ${JSON.stringify(req.body)}`);
//     const {
//       name, email, phone, shopName, address, city, state, pincode, password,
//     } = req.body;

//     const sellerExists = await Seller.findOne({ email });
//     if (sellerExists) {
//       return res.status(400).json({ message: "Seller already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const profileImagePath = req.file ? req.file.path : "";

//     const seller = await Seller.create({
//       name, email, phone, shopName, address, city, state, pincode,
//       password: hashedPassword,
//       profileImage: profileImagePath,
//     });

//     const sellerResponse = seller.toObject();
//     delete sellerResponse.password;

//     res.status(201).json({
//       message: "Seller Registered Successfully",
//       seller: sellerResponse,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Login
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const seller = await Seller.findOne({ email });

//     if (!seller) {
//       return res.status(400).json({ message: "Seller not found" });
//     }

//     const isMatch = await bcrypt.compare(password, seller.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid Password" });
//     }

//     const token = jwt.sign(
//       { id: seller._id },
//       process.env.JWT_SECRET || "mysecretkey",
//       { expiresIn: "7d" }
//     );

//     const sellerData = seller.toObject();
//     delete sellerData.password;

//     res.json({
//       message: "Login Successful",
//       token,
//       seller: sellerData,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Seller Details
// const getSeller = async (req, res) => {
//   try {
//     const seller = await Seller.findById(req.params.id).select("-password");

//     if (!seller) {
//       return res.status(404).json({ message: "Seller not found" });
//     }

//     res.json(seller);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update Seller Details
// const updateSeller = async (req, res) => {
//   try {
//     const {
//       name,
//       shopName,
//       email,
//       phone,
//       address,
//       city,
//       state,
//       pincode,
//     } = req.body;

//     const seller = await Seller.findById(req.params.id);

//     if (!seller) {
//       return res.status(404).json({ message: "Seller not found" });
//     }

//     seller.name = name || seller.name;
//     seller.shopName = shopName || seller.shopName;
//     seller.email = email || seller.email;
//     seller.phone = phone || seller.phone;
//     seller.address = address || seller.address;
//     seller.city = city || seller.city;
//     seller.state = state || seller.state;
//     seller.pincode = pincode || seller.pincode;

//     // Password update logic
//     if (req.body.password && req.body.password.trim() !== "") {
//       seller.password = await bcrypt.hash(req.body.password, 10);
//     }

//     // Profile Image / Logo update logic (Multer integration)
//     if (req.file) {
//       seller.profileImage = req.file.path;
//     }

//     await seller.save();

//     const sellerData = seller.toObject();
//     delete sellerData.password;

//     res.json({
//       message: "Profile Updated Successfully",
//       seller: sellerData,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   register,
//   login,
//   getSeller,
//   updateSeller,
// };






// new1

// const Seller = require("../models/Seller");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // Register
// const register = async (req, res) => {
//   try {
//     console.log(`Received registration request: ${JSON.stringify(req.body)}`);
//     const {
//       name, email, phone, shopName, address, city, state, pincode, password,
//     } = req.body;

//     const sellerExists = await Seller.findOne({ email });
//     if (sellerExists) {
//       return res.status(400).json({ message: "Seller already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const profileImagePath = req.file ? req.file.path : "";

//     const seller = await Seller.create({
//       name, email, phone, shopName, address, city, state, pincode,
//       password: hashedPassword,
//       profileImage: profileImagePath,
//     });

//     const sellerResponse = seller.toObject();
//     delete sellerResponse.password;

//     res.status(201).json({
//       message: "Seller Registered Successfully",
//       seller: sellerResponse,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Login
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const seller = await Seller.findOne({ email });

//     if (!seller) {
//       return res.status(400).json({ message: "Seller not found" });
//     }

//     const isMatch = await bcrypt.compare(password, seller.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid Password" });
//     }

//     const token = jwt.sign(
//       { id: seller._id },
//       process.env.JWT_SECRET || "mysecretkey",
//       { expiresIn: "7d" }
//     );

//     const sellerData = seller.toObject();
//     delete sellerData.password;

//     res.json({
//       message: "Login Successful",
//       token,
//       seller: sellerData,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Seller Details
// const getSeller = async (req, res) => {
//   try {
//     const seller = await Seller.findById(req.params.id).select("-password");

//     if (!seller) {
//       return res.status(404).json({ message: "Seller not found" });
//     }

//     res.json(seller);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get All Sellers (For Admin Panel)
// const getAllSellers = async (req, res) => {
//   try {
//     const sellers = await Seller.find().select("-password").sort({ createdAt: -1 });
//     res.status(200).json({ success: true, sellers });
//   } catch (error) {
//     console.error("Error fetching sellers:", error);
//     res.status(500).json({ message: error.message || "Server error while fetching sellers." });
//   }
// };

// // Update Seller Details
// const updateSeller = async (req, res) => {
//   try {
//     const {
//       name,
//       shopName,
//       email,
//       phone,
//       address,
//       city,
//       state,
//       pincode,
//     } = req.body;

//     const seller = await Seller.findById(req.params.id);

//     if (!seller) {
//       return res.status(404).json({ message: "Seller not found" });
//     }

//     seller.name = name || seller.name;
//     seller.shopName = shopName || seller.shopName;
//     seller.email = email || seller.email;
//     seller.phone = phone || seller.phone;
//     seller.address = address || seller.address;
//     seller.city = city || seller.city;
//     seller.state = state || seller.state;
//     seller.pincode = pincode || seller.pincode;

//     if (req.body.password && req.body.password.trim() !== "") {
//       seller.password = await bcrypt.hash(req.body.password, 10);
//     }

//     if (req.file) {
//       seller.profileImage = req.file.path;
//     }

//     await seller.save();

//     const sellerData = seller.toObject();
//     delete sellerData.password;

//     res.json({
//       message: "Profile Updated Successfully",
//       seller: sellerData,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   register,
//   login,
//   getSeller,
//   getAllSellers,
//   updateSeller,
// };


// new2








// const Seller = require("../models/Seller");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // Register
// const register = async (req, res) => {
//   try {
//     console.log(`Received registration request: ${JSON.stringify(req.body)}`);
//     const {
//       name, email, phone, shopName, address, city, state, pincode, password,
//     } = req.body;

//     const sellerExists = await Seller.findOne({ email });
//     if (sellerExists) {
//       return res.status(400).json({ message: "Seller already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const profileImagePath = req.file ? req.file.path : "";

//     const seller = await Seller.create({
//       name, email, phone, shopName, address, city, state, pincode,
//       password: hashedPassword,
//       profileImage: profileImagePath,
//     });

//     const sellerResponse = seller.toObject();
//     delete sellerResponse.password;

//     res.status(201).json({
//       message: "Seller Registered Successfully",
//       seller: sellerResponse,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Login
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const seller = await Seller.findOne({ email });

//     if (!seller) {
//       return res.status(400).json({ message: "Seller not found" });
//     }

//     const isMatch = await bcrypt.compare(password, seller.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid Password" });
//     }

//     const token = jwt.sign(
//       { id: seller._id },
//       process.env.JWT_SECRET || "mysecretkey",
//       { expiresIn: "7d" }
//     );

//     const sellerData = seller.toObject();
//     delete sellerData.password;

//     res.json({
//       message: "Login Successful",
//       token,
      
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Seller Details
// const getSeller = async (req, res) => {
//   try {
//     const seller = await Seller.findById(req.params.id).select("-password");

//     if (!seller) {
//       return res.status(404).json({ message: "Seller not found" });
//     }

//     res.json(seller);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get All Sellers (For Admin Panel)
// const getAllSellers = async (req, res) => {
//   try {
//     const sellers = await Seller.find().select("-password").sort({ createdAt: -1 });
//     res.status(200).json({ success: true, sellers });
//   } catch (error) {
//     console.error("Error fetching sellers:", error);
//     res.status(500).json({ message: error.message || "Server error while fetching sellers." });
//   }
// };

// // Update Seller Details
// const updateSeller = async (req, res) => {
//   try {
//     const {
//       name,
//       shopName,
//       email,
//       phone,
//       address,
//       city,
//       state,
//       pincode,
//     } = req.body;

//     const seller = await Seller.findById(req.params.id);

//     if (!seller) {
//       return res.status(404).json({ message: "Seller not found" });
//     }

//     seller.name = name || seller.name;
//     seller.shopName = shopName || seller.shopName;
//     seller.email = email || seller.email;
//     seller.phone = phone || seller.phone;
//     seller.address = address || seller.address;
//     seller.city = city || seller.city;
//     seller.state = state || seller.state;
//     seller.pincode = pincode || seller.pincode;

//     if (req.body.password && req.body.password.trim() !== "") {
//       seller.password = await bcrypt.hash(req.body.password, 10);
//     }

//     if (req.file) {
//       seller.profileImage = req.file.path;
//     }

//     await seller.save();

//     const sellerData = seller.toObject();
//     delete sellerData.password;

//     res.json({
//       message: "Profile Updated Successfully",
//       seller: sellerData,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update Seller Approval Status (For Admin Panel)
// const updateSellerStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body; // 'Approved' ya 'Rejected'

//     const updatedSeller = await Seller.findByIdAndUpdate(
//       id,
//       { status: status },
//       { returnDocument: 'after' }
//     ).select("-password");

//     if (!updatedSeller) {
//       return res.status(404).json({ message: "Seller not found" });
//     }

//     res.status(200).json({
//       message: "Seller status updated successfully",
//       seller: updatedSeller,
//     });
//   } catch (error) {
//     console.error("Error updating seller status:", error);
//     res.status(500).json({ message: error.message || "Server error while updating seller status" });
//   }
// };

// module.exports = {
//   register,
//   login,
//   getSeller,
//   getAllSellers,
//   updateSeller,
//   updateSellerStatus,
// };





// newwww

// const Seller = require("../models/Seller");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // Register
// const register = async (req, res) => {
//   try {
//     console.log(`Received registration request: ${JSON.stringify(req.body)}`);
//     const {
//       name, email, phone, shopName, address, city, state, pincode, password,
//     } = req.body;

//     const sellerExists = await Seller.findOne({ email });
//     if (sellerExists) {
//       return res.status(400).json({ message: "Seller already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const profileImagePath = req.file ? req.file.path : "";

//     const seller = await Seller.create({
//       name, email, phone, shopName, address, city, state, pincode,
//       password: hashedPassword,
//       profileImage: profileImagePath,
//     });

//     const sellerResponse = seller.toObject();
//     delete sellerResponse.password;

//     res.status(201).json({
//       message: "Seller Registered Successfully",
//       seller: sellerResponse,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Login ke andar yeh check add karein:
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const seller = await Seller.findOne({ email });

//     if (!seller) {
//       return res.status(400).json({ message: "Seller not found" });
//     }

//     // 🛑 AGAR SELLER REJECTED HAI TOH LOGIN SE ROKEIN
//     if (seller.status === "Rejected") {
//       return res.status(403).json({ 
//         message: "Your account has been rejected by the admin. You cannot log in." 
//       });
//     }

//     // (Optional) Agar aap chahein ki Pending wale bhi login na kar sakein jab tak approve na ho, toh yeh laga sakte hain:
//     if (seller.status === "Pending") {
//       return res.status(403).json({ 
//         message: "Your account is pending admin approval." 
//       });
//     }

//     const isMatch = await bcrypt.compare(password, seller.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid Password" });
//     }

//     const token = jwt.sign(
//       { id: seller._id },
//       process.env.JWT_SECRET || "mysecretkey",
//       { expiresIn: "7d" }
//     );

//     const sellerData = seller.toObject();
//     delete sellerData.password;

//     res.json({
//       message: "Login Successful",
//       token,
//       seller: sellerData,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Seller Details
// const getSeller = async (req, res) => {
//   try {
//     const seller = await Seller.findById(req.params.id).select("-password");

//     if (!seller) {
//       return res.status(404).json({ message: "Seller not found" });
//     }

//     res.json(seller);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get All Sellers (For Admin Panel)
// const getAllSellers = async (req, res) => {
//   try {
//     const sellers = await Seller.find().select("-password").sort({ createdAt: -1 });
//     res.status(200).json({ success: true, sellers });
//   } catch (error) {
//     console.error("Error fetching sellers:", error);
//     res.status(500).json({ message: error.message || "Server error while fetching sellers." });
//   }
// };

// // Update Seller Details
// const updateSeller = async (req, res) => {
//   try {
//     const {
//       name,
//       shopName,
//       email,
//       phone,
//       address,
//       city,
//       state,
//       pincode,
//     } = req.body;

//     const seller = await Seller.findById(req.params.id);

//     if (!seller) {
//       return res.status(404).json({ message: "Seller not found" });
//     }

//     seller.name = name || seller.name;
//     seller.shopName = shopName || seller.shopName;
//     seller.email = email || seller.email;
//     seller.phone = phone || seller.phone;
//     seller.address = address || seller.address;
//     seller.city = city || seller.city;
//     seller.state = state || seller.state;
//     seller.pincode = pincode || seller.pincode;

//     if (req.body.password && req.body.password.trim() !== "") {
//       seller.password = await bcrypt.hash(req.body.password, 10);
//     }

//     if (req.file) {
//       seller.profileImage = req.file.path;
//     }

//     await seller.save();

//     const sellerData = seller.toObject();
//     delete sellerData.password;

//     res.json({
//       message: "Profile Updated Successfully",
//       seller: sellerData,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update Seller Approval Status (For Admin Panel)
// const updateSellerStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const updatedSeller = await Seller.findByIdAndUpdate(
//       id,
//       { status: status },
//       { returnDocument: 'after' }
//     ).select("-password");

//     if (!updatedSeller) {
//       return res.status(404).json({ message: "Seller not found" });
//     }

//     res.status(200).json({
//       message: "Seller status updated successfully",
//       seller: updatedSeller,
//     });
//   } catch (error) {
//     console.error("Error updating seller status:", error);
//     res.status(500).json({ message: error.message || "Server error while updating seller status" });
//   }
// };

// module.exports = {
//   register,
//   login,
//   getSeller,
//   getAllSellers,
//   updateSeller,
//   updateSellerStatus,
// };



//claude office night



// const Seller = require("../models/Seller");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // Register
// const register = async (req, res) => {
//   try {
//     console.log(`Received registration request: ${JSON.stringify(req.body)}`);
//     const {
//       name, email, phone, shopName, address, city, state, pincode, password,
//     } = req.body;

//     const sellerExists = await Seller.findOne({ email });
//     if (sellerExists) {
//       return res.status(400).json({ message: "Seller already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const profileImagePath = req.file ? req.file.path : "";

//     const seller = await Seller.create({
//       name, email, phone, shopName, address, city, state, pincode,
//       password: hashedPassword,
//       profileImage: profileImagePath,
//     });

//     const sellerResponse = seller.toObject();
//     delete sellerResponse.password;

//     res.status(201).json({
//       message: "Seller Registered Successfully",
//       seller: sellerResponse,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Login
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const seller = await Seller.findOne({ email });

//     if (!seller) {
//       return res.status(400).json({ message: "Seller not found" });
//     }

//     // 🛑 AGAR SELLER REJECTED HAI TOH LOGIN SE ROKEIN
//     if (seller.status === "Rejected") {
//       return res.status(403).json({
//         message: "Your account has been rejected by the admin. You cannot log in."
//       });
//     }

//     // Agar Pending wale bhi login na kar sakein jab tak approve na ho
//     if (seller.status === "Pending") {
//       return res.status(403).json({
//         message: "Your account is pending admin approval."
//       });
//     }

//     const isMatch = await bcrypt.compare(password, seller.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid Password" });
//     }

//     const token = jwt.sign(
//       { id: seller._id },
//       process.env.JWT_SECRET || "mysecretkey",
//       { expiresIn: "7d" }
//     );

//     const sellerData = seller.toObject();
//     delete sellerData.password;

//     res.json({
//       message: "Login Successful",
//       token,
//       seller: sellerData,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Seller Details (🔒 Ab sirf logged-in seller apna hi profile dekh sakta hai)
// const getSeller = async (req, res) => {
//   try {
//     // Security check: seller sirf apna hi profile fetch kar sakta hai
//     if (req.seller.id !== req.params.id) {
//       return res.status(403).json({ message: "You can only view your own profile" });
//     }

//     const seller = await Seller.findById(req.params.id).select("-password");

//     if (!seller) {
//       return res.status(404).json({ message: "Seller not found" });
//     }

//     res.json(seller);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get All Sellers (For Admin Panel) — public rehta hai, koi change nahi
// const getAllSellers = async (req, res) => {
//   try {
//     const sellers = await Seller.find().select("-password").sort({ createdAt: -1 });
//     res.status(200).json({ success: true, sellers });
//   } catch (error) {
//     console.error("Error fetching sellers:", error);
//     res.status(500).json({ message: error.message || "Server error while fetching sellers." });
//   }
// };

// // Update Seller Details (🔒 Ab sirf logged-in seller apna hi profile update kar sakta hai)
// const updateSeller = async (req, res) => {
//   try {
//     // Security check: seller sirf apna hi profile update kar sakta hai
//     if (req.seller.id !== req.params.id) {
//       return res.status(403).json({ message: "You can only update your own profile" });
//     }

//     const {
//       name,
//       shopName,
//       email,
//       phone,
//       address,
//       city,
//       state,
//       pincode,
//     } = req.body;

//     const seller = await Seller.findById(req.params.id);

//     if (!seller) {
//       return res.status(404).json({ message: "Seller not found" });
//     }

//     seller.name = name || seller.name;
//     seller.shopName = shopName || seller.shopName;
//     seller.email = email || seller.email;
//     seller.phone = phone || seller.phone;
//     seller.address = address || seller.address;
//     seller.city = city || seller.city;
//     seller.state = state || seller.state;
//     seller.pincode = pincode || seller.pincode;

//     if (req.body.password && req.body.password.trim() !== "") {
//       seller.password = await bcrypt.hash(req.body.password, 10);
//     }

//     if (req.file) {
//       seller.profileImage = req.file.path;
//     }

//     await seller.save();

//     const sellerData = seller.toObject();
//     delete sellerData.password;

//     res.json({
//       message: "Profile Updated Successfully",
//       seller: sellerData,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update Seller Approval Status (For Admin Panel)
// const updateSellerStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const updatedSeller = await Seller.findByIdAndUpdate(
//       id,
//       { status: status },
//       { returnDocument: 'after' }
//     ).select("-password");

//     if (!updatedSeller) {
//       return res.status(404).json({ message: "Seller not found" });
//     }

//     res.status(200).json({
//       message: "Seller status updated successfully",
//       seller: updatedSeller,
//     });
//   } catch (error) {
//     console.error("Error updating seller status:", error);
//     res.status(500).json({ message: error.message || "Server error while updating seller status" });
//   }
// };

// module.exports = {
//   register,
//   login,
//   getSeller,
//   getAllSellers,
//   updateSeller,
//   updateSellerStatus,
// };




//claude correcteed office




// const Seller = require("../models/Seller");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // Register
// const register = async (req, res) => {
//   try {
//     console.log(`Received registration request: ${JSON.stringify(req.body)}`);
//     const {
//       name, email, phone, shopName, address, city, state, pincode, password,
//     } = req.body;

//     const sellerExists = await Seller.findOne({ email });
//     if (sellerExists) {
//       return res.status(400).json({ message: "Seller already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const profileImagePath = req.file ? req.file.path : "";

//     const seller = await Seller.create({
//       name, email, phone, shopName, address, city, state, pincode,
//       password: hashedPassword,
//       profileImage: profileImagePath,
//     });

//     const sellerResponse = seller.toObject();
//     delete sellerResponse.password;

//     res.status(201).json({
//       message: "Seller Registered Successfully",
//       seller: sellerResponse,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Login
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const seller = await Seller.findOne({ email });

//     if (!seller) {
//       return res.status(400).json({ message: "Seller not found" });
//     }

//     // 🛑 AGAR SELLER REJECTED HAI TOH LOGIN SE ROKEIN
//     if (seller.status === "Rejected") {
//       return res.status(403).json({
//         message: "Your account has been rejected by the admin. You cannot log in."
//       });
//     }

//     // Agar Pending wale bhi login na kar sakein jab tak approve na ho
//     if (seller.status === "Pending") {
//       return res.status(403).json({
//         message: "Your account is pending admin approval."
//       });
//     }

//     const isMatch = await bcrypt.compare(password, seller.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid Password" });
//     }

//     // ✅ role add kiya, taaki authMiddleware.js sirf seller token accept kare
//     const token = jwt.sign(
//       { id: seller._id, role: "seller" },
//       process.env.JWT_SECRET || "mysecretkey",
//       { expiresIn: "7d" }
//     );

//     const sellerData = seller.toObject();
//     delete sellerData.password;

//     res.json({
//       message: "Login Successful",
//       token,
//       // seller: sellerData,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Seller Details (🔒 Ab sirf logged-in seller apna hi profile dekh sakta hai)
// const getSeller = async (req, res) => {
//   try {
//     // Security check: seller sirf apna hi profile fetch kar sakta hai
//     if (req.seller.id !== req.params.id) {
//       return res.status(403).json({ message: "You can only view your own profile" });
//     }

//     const seller = await Seller.findById(req.params.id).select("-password");

//     if (!seller) {
//       return res.status(404).json({ message: "Seller not found" });
//     }

//     res.json(seller);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get All Sellers (For Admin Panel)
// const getAllSellers = async (req, res) => {
//   try {
//     const sellers = await Seller.find().select("-password").sort({ createdAt: -1 });
//     res.status(200).json({ success: true, sellers });
//   } catch (error) {
//     console.error("Error fetching sellers:", error);
//     res.status(500).json({ message: error.message || "Server error while fetching sellers." });
//   }
// };

// // Update Seller Details (🔒 Ab sirf logged-in seller apna hi profile update kar sakta hai)
// const updateSeller = async (req, res) => {
//   try {
//     // Security check: seller sirf apna hi profile update kar sakta hai
//     if (req.seller.id !== req.params.id) {
//       return res.status(403).json({ message: "You can only update your own profile" });
//     }

//     const {
//       name,
//       shopName,
//       email,
//       phone,
//       address,
//       city,
//       state,
//       pincode,
//     } = req.body;

//     const seller = await Seller.findById(req.params.id);

//     if (!seller) {
//       return res.status(404).json({ message: "Seller not found" });
//     }

//     seller.name = name || seller.name;
//     seller.shopName = shopName || seller.shopName;
//     seller.email = email || seller.email;
//     seller.phone = phone || seller.phone;
//     seller.address = address || seller.address;
//     seller.city = city || seller.city;
//     seller.state = state || seller.state;
//     seller.pincode = pincode || seller.pincode;

//     if (req.body.password && req.body.password.trim() !== "") {
//       seller.password = await bcrypt.hash(req.body.password, 10);
//     }

//     if (req.file) {
//       seller.profileImage = req.file.path;
//     }

//     await seller.save();

//     const sellerData = seller.toObject();
//     delete sellerData.password;

//     res.json({
//       message: "Profile Updated Successfully",
//       seller: sellerData,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update Seller Approval Status (For Admin Panel)
// const updateSellerStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const updatedSeller = await Seller.findByIdAndUpdate(
//       id,
//       { status: status },
//       { returnDocument: 'after' }
//     ).select("-password");

//     if (!updatedSeller) {
//       return res.status(404).json({ message: "Seller not found" });
//     }

//     res.status(200).json({
//       message: "Seller status updated successfully",
//       seller: updatedSeller,
//     });
//   } catch (error) {
//     console.error("Error updating seller status:", error);
//     res.status(500).json({ message: error.message || "Server error while updating seller status" });
//   }
// };

// module.exports = {
//   register,
//   login,
//   getSeller,
//   getAllSellers,
//   updateSeller,
//   updateSellerStatus,
// };




//1 sept 2026 moring




const Seller = require("../models/Seller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
const register = async (req, res) => {
  try {
    console.log(`Received registration request: ${JSON.stringify(req.body)}`);
    const {
      name, email, phone, shopName, brandName, address, city, state, pincode, password,
    } = req.body;

    const sellerExists = await Seller.findOne({ email });
    if (sellerExists) {
      return res.status(400).json({ message: "Seller already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileImagePath = req.files?.profilePicture ? req.files.profilePicture[0].path : "";
    const brandLogoPath = req.files?.brandLogo ? req.files.brandLogo[0].path : "";

    const seller = await Seller.create({
      name, email, phone, shopName,
      brandName,
      address, city, state, pincode,
      password: hashedPassword,
      profileImage: profileImagePath,
      brandLogo: brandLogoPath,
    });

    const sellerResponse = seller.toObject();
    delete sellerResponse.password;

    res.status(201).json({
      message: "Seller Registered Successfully",
      seller: sellerResponse,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(400).json({ message: "Seller not found" });
    }

    if (seller.status === "Rejected") {
      return res.status(403).json({
        message: "Your account has been rejected by the admin. You cannot log in."
      });
    }

    if (seller.status === "Pending") {
      return res.status(403).json({
        message: "Your account is pending admin approval."
      });
    }

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: seller._id, role: "seller" },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "7d" }
    );

    const sellerData = seller.toObject();
    delete sellerData.password;

    res.json({
      message: "Login Successful",
      token,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Seller Details
const getSeller = async (req, res) => {
  try {
    if (req.seller.id !== req.params.id) {
      return res.status(403).json({ message: "You can only view your own profile" });
    }

    const seller = await Seller.findById(req.params.id).select("-password");

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Sellers (For Admin Panel)
const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, sellers });
  } catch (error) {
    console.error("Error fetching sellers:", error);
    res.status(500).json({ message: error.message || "Server error while fetching sellers." });
  }
};

// Update Seller Details
const updateSeller = async (req, res) => {
  try {
    if (req.seller.id !== req.params.id) {
      return res.status(403).json({ message: "You can only update your own profile" });
    }

    const {
      name,
      shopName,
      brandName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
    } = req.body;

    const seller = await Seller.findById(req.params.id);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    seller.name = name || seller.name;
    seller.shopName = shopName || seller.shopName;
    seller.brandName = brandName !== undefined ? brandName : seller.brandName;
    seller.email = email || seller.email;
    seller.phone = phone || seller.phone;
    seller.address = address || seller.address;
    seller.city = city || seller.city;
    seller.state = state || seller.state;
    seller.pincode = pincode || seller.pincode;

    if (req.body.password && req.body.password.trim() !== "") {
      seller.password = await bcrypt.hash(req.body.password, 10);
    }

    if (req.files?.profileImage) {
      seller.profileImage = req.files.profileImage[0].path;
    }
    if (req.files?.brandLogo) {
      seller.brandLogo = req.files.brandLogo[0].path;
    }

    await seller.save();

    const sellerData = seller.toObject();
    delete sellerData.password;

    res.json({
      message: "Profile Updated Successfully",
      seller: sellerData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Seller Approval Status (For Admin Panel)
const updateSellerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedSeller = await Seller.findByIdAndUpdate(
      id,
      { status: status },
      { returnDocument: 'after' }
    ).select("-password");

    if (!updatedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.status(200).json({
      message: "Seller status updated successfully",
      seller: updatedSeller,
    });
  } catch (error) {
    console.error("Error updating seller status:", error);
    res.status(500).json({ message: error.message || "Server error while updating seller status" });
  }
};

module.exports = {
  register,
  login,
  getSeller,
  getAllSellers,
  updateSeller,
  updateSellerStatus,
};