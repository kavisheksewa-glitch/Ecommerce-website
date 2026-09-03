// const express = require("express");
// const router = express.Router();
// const multer = require("multer");

// const {
//   register,
//   login,
//   getSeller,
//   getAllSellers,
//   updateSeller,
//   updateSellerStatus,
// } = require("../controllers/sellerAuthController");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// router.post("/register", upload.single("profilePicture"), register);
// router.post("/login", login);
// router.get("/seller/:id", getSeller);
// router.put("/seller/:id", upload.single("profilePicture"), updateSeller); // <-- Yahan upload middleware add kar diya gaya hai
// router.get("/admin/sellers", getAllSellers);
// router.put("/admin/seller-status/:id", updateSellerStatus); // Yahan apna controller function name dein

// module.exports = router;



// swagger








// const express = require("express");
// const router = express.Router();
// const multer = require("multer");

// const {
//   register,
//   login,
//   getSeller,
//   getAllSellers,
//   updateSeller,
//   updateSellerStatus,
// } = require("../controllers/sellerAuthController");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// /**
//  * @swagger
//  * tags:
//  *   name: Seller login and register 
//  *   description: Seller login and register management APIs
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Seller:
//  *       type: object
//  *       properties:
//  *         _id:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109cc"
//  *         name:
//  *           type: string
//  *           example: "Ahmad Shawls"
//  *         email:
//  *           type: string
//  *           example: "seller@gmail.com"
//  *         status:
//  *           type: string
//  *           example: "Approved"
//  *         profilePicture:
//  *           type: string
//  *           example: "uploads/1624356789-profile.jpg"
//  *         createdAt:
//  *           type: string
//  *           format: date-time
//  */

// /**
//  * @swagger
//  * /api/seller/auth/register:
//  *   post:
//  *     summary: Register a new seller
//  *     description: Registers a new seller with an optional profile picture upload via multipart/form-data.
//  *     tags: [Seller login and register]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 example: "Ahmad Shawls"
//  *               email:
//  *                 type: string
//  *                 example: "seller@gmail.com"
//  *               password:
//  *                 type: string
//  *                 example: "password123"
//  *               profilePicture:
//  *                 type: string
//  *                 format: binary
//  *     responses:
//  *       '201':
//  *         description: Seller registered successfully
//  *       '400':
//  *         description: Bad request or email already exists
//  *       '500':
//  *         description: Server error
//  */
// router.post("/register", upload.single("profilePicture"), register);

// /**
//  * @swagger
//  * /api/seller/auth/login:
//  *   post:
//  *     summary: Login seller
//  *     description: Authenticates a seller using email and password.
//  *     tags: [Seller login and register]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "seller@gmail.com"
//  *               password:
//  *                 type: string
//  *                 example: "password123"
//  *     responses:
//  *       '200':
//  *         description: Login successful
//  *       '400':
//  *         description: Invalid credentials
//  *       '500':
//  *         description: Server error
//  */
// router.post("/login", login);

// /**
//  * @swagger
//  * /api/seller/auth/seller/{id}:
//  *   get:
//  *     summary: Get seller profile by ID
//  *     description: Retrieves details of a specific seller.
//  *     tags: [Seller login and register]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The unique seller ID
//  *         example: "60d0fe4f5311236168a109cc"
//  *     responses:
//  *       '200':
//  *         description: Seller details fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Seller'
//  *       '404':
//  *         description: Seller not found
//  *       '500':
//  *         description: Server error
//  */
// router.get("/seller/:id", getSeller);

// /**
//  * @swagger
//  * /api/seller/auth/seller/{id}:
//  *   put:
//  *     summary: Update seller profile
//  *     description: Updates seller information along with an optional new profile picture upload.
//  *     tags: [Seller login and register]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The unique seller ID
//  *         example: "60d0fe4f5311236168a109cc"
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 example: "Updated Ahmad Shawls"
//  *               email:
//  *                 type: string
//  *                 example: "seller@gmail.com"
//  *               profilePicture:
//  *                 type: string
//  *                 format: binary
//  *     responses:
//  *       '200':
//  *         description: Seller updated successfully
//  *       '404':
//  *         description: Seller not found
//  *       '500':
//  *         description: Server error
//  */
// router.put("/seller/:id", upload.single("profilePicture"), updateSeller);

// /**
//  * @swagger
//  * /api/seller/auth/admin/sellers:
//  *   get:
//  *     summary: Get all sellers (Admin)
//  *     description: Retrieves a list of all registered sellers.
//  *     tags: [Seller login and register]
//  *     responses:
//  *       '200':
//  *         description: List of sellers fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Seller'
//  *       '500':
//  *         description: Server error
//  */
// router.get("/admin/sellers", getAllSellers);

// /**
//  * @swagger
//  * /api/seller/auth/admin/seller-status/{id}:
//  *   put:
//  *     summary: Update seller status (Admin)
//  *     description: Approves or rejects a seller account status.
//  *     tags: [Seller login and register]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The unique seller ID
//  *         example: "60d0fe4f5311236168a109cc"
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - status
//  *             properties:
//  *               status:
//  *                 type: string
//  *                 example: "Approved"
//  *     responses:
//  *       '200':
//  *         description: Seller status updated successfully
//  *       '404':
//  *         description: Seller not found
//  *       '500':
//  *         description: Server error
//  */
// router.put("/admin/seller-status/:id", updateSellerStatus);

// module.exports = router;















// new swgger



// const express = require("express");
// const router = express.Router();
// const {
//   register,
//   login,
//   getSeller,
//   getAllSellers,
//   updateSeller,
//   updateSellerStatus,
// } = require("../controllers/sellerAuthController");

// /**
//  * @swagger
//  * tags:
//  *   name: Seller Auth
//  *   description: Seller authentication and profile management APIs
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Seller:
//  *       type: object
//  *       properties:
//  *         _id:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109aa"
//  *         name:
//  *           type: string
//  *           example: "Rahul Sharma"
//  *         email:
//  *           type: string
//  *           example: "seller@example.com"
//  *         phone:
//  *           type: string
//  *           example: "9876543210"
//  *         shopName:
//  *           type: string
//  *           example: "Sharma Shawls"
//  *         address:
//  *           type: string
//  *           example: "Main Market"
//  *         city:
//  *           type: string
//  *           example: "Amritsar"
//  *         state:
//  *           type: string
//  *           example: "Punjab"
//  *         pincode:
//  *           type: string
//  *           example: "143001"
//  *         status:
//  *           type: string
//  *           example: "Approved"
//  *         profileImage:
//  *           type: string
//  *           example: "uploads/image.jpg"
//  *         createdAt:
//  *           type: string
//  *           format: date-time
//  */

// /**
//  * @swagger
//  * /api/seller/auth/register:
//  *   post:
//  *     summary: Register a new seller
//  *     description: Creates a new seller account with profile image and details.
//  *     tags: [Seller Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - name
//  *               - email
//  *               - phone
//  *               - shopName
//  *               - address
//  *               - city
//  *               - state
//  *               - pincode
//  *               - password
//  *             properties:
//  *               name:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *               phone:
//  *                 type: string
//  *               shopName:
//  *                 type: string
//  *               address:
//  *                 type: string
//  *               city:
//  *                 type: string
//  *               state:
//  *                 type: string
//  *               pincode:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       '201':
//  *         description: Seller Registered Successfully
//  *       '400':
//  *         description: Seller already exists
//  *       '500':
//  *         description: Server Error
//  */
// router.post("/register", register);

// /**
//  * @swagger
//  * /api/seller/auth/login:
//  *   post:
//  *     summary: Seller login
//  *     description: Authenticates a seller and returns a JWT token along with seller details.
//  *     tags: [Seller Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "seller@example.com"
//  *               password:
//  *                 type: string
//  *                 example: "password123"
//  *     responses:
//  *       '200':
//  *         description: Login Successful
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Login Successful"
//  *                 token:
//  *                   type: string
//  *                   example: "eyJhbGciOiJIUzI1Ni..."
//  *                 seller:
//  *                   $ref: '#/components/schemas/Seller'
//  *       '400':
//  *         description: Seller not found or Invalid Password
//  *       '500':
//  *         description: Server Error
//  */
// router.post("/login", login);

// /**
//  * @swagger
//  * /api/seller/auth/{id}:
//  *   get:
//  *     summary: Get seller details by ID
//  *     description: Retrieves profile details of a specific seller.
//  *     tags: [Seller Auth]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the seller
//  *         example: "60d0fe4f5311236168a109aa"
//  *     responses:
//  *       '200':
//  *         description: Seller details fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Seller'
//  *       '404':
//  *         description: Seller not found
//  *       '500':
//  *         description: Server Error
//  */
// router.get("/:id", getSeller);

// /**
//  * @swagger
//  * /api/seller/auth:
//  *   get:
//  *     summary: Get all sellers (Admin Panel)
//  *     description: Retrieves a list of all registered sellers.
//  *     tags: [Seller Auth]
//  *     responses:
//  *       '200':
//  *         description: List of all sellers fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: true
//  *                 sellers:
//  *                   type: array
//  *                   items:
//  *                     $ref: '#/components/schemas/Seller'
//  *       '500':
//  *         description: Server Error
//  */
// router.get("/", getAllSellers);

// /**
//  * @swagger
//  * /api/seller/auth/update/{id}:
//  *   put:
//  *     summary: Update seller details
//  *     description: Updates information of a specific seller.
//  *     tags: [Seller Auth]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the seller
//  *     responses:
//  *       '200':
//  *         description: Profile Updated Successfully
//  *       '404':
//  *         description: Seller not found
//  *       '500':
//  *         description: Server Error
//  */
// router.put("/update/:id", updateSeller);

// /**
//  * @swagger
//  * /api/seller/auth/status/{id}:
//  *   put:
//  *     summary: Update seller approval status (Admin Panel)
//  *     description: Changes the status of a seller to Approved, Rejected, or Pending.
//  *     tags: [Seller Auth]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the seller
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - status
//  *             properties:
//  *               status:
//  *                 type: string
//  *                 enum: [Pending, Approved, Rejected]
//  *                 example: "Approved"
//  *     responses:
//  *       '200':
//  *         description: Seller status updated successfully
//  *       '404':
//  *         description: Seller not found
//  *       '500':
//  *         description: Server Error
//  */
// router.put("/status/:id", updateSellerStatus);

// module.exports = router;











// new sahi





// const express = require("express");
// const router = express.Router();
// const {
//   register,
//   login,
//   getSeller,
//   getAllSellers,
//   updateSeller,
//   updateSellerStatus,
// } = require("../controllers/sellerAuthController");

// /**
//  * @swagger
//  * tags:
//  *   name: Seller Auth
//  *   description: Seller authentication and profile management APIs
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Seller:
//  *       type: object
//  *       properties:
//  *         _id:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109aa"
//  *         name:
//  *           type: string
//  *           example: "Rahul Sharma"
//  *         email:
//  *           type: string
//  *           example: "seller@example.com"
//  *         phone:
//  *           type: string
//  *           example: "9876543210"
//  *         shopName:
//  *           type: string
//  *           example: "Sharma Shawls"
//  *         address:
//  *           type: string
//  *           example: "Main Market"
//  *         city:
//  *           type: string
//  *           example: "Amritsar"
//  *         state:
//  *           type: string
//  *           example: "Punjab"
//  *         pincode:
//  *           type: string
//  *           example: "143001"
//  *         status:
//  *           type: string
//  *           example: "Approved"
//  *         profileImage:
//  *           type: string
//  *           example: "uploads/image.jpg"
//  *         createdAt:
//  *           type: string
//  *           format: date-time
//  */

// /**
//  * @swagger
//  * /api/seller/auth:
//  *   get:
//  *     summary: Get all sellers (Admin Panel)
//  *     description: Retrieves a list of all registered sellers.
//  *     tags: [Seller Auth]
//  *     responses:
//  *       '200':
//  *         description: List of all sellers fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: true
//  *                 sellers:
//  *                   type: array
//  *                   items:
//  *                     $ref: '#/components/schemas/Seller'
//  *       '500':
//  *         description: Server Error
//  */
// router.get("/", getAllSellers); // 👈 Root route ko upar rakha gaya hai

// /**
//  * @swagger
//  * /api/seller/auth/register:
//  *   post:
//  *     summary: Register a new seller
//  *     description: Creates a new seller account with profile image and details.
//  *     tags: [Seller Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - name
//  *               - email
//  *               - phone
//  *               - shopName
//  *               - address
//  *               - city
//  *               - state
//  *               - pincode
//  *               - password
//  *             properties:
//  *               name:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *               phone:
//  *                 type: string
//  *               shopName:
//  *                 type: string
//  *               address:
//  *                 type: string
//  *               city:
//  *                 type: string
//  *               state:
//  *                 type: string
//  *               pincode:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       '201':
//  *         description: Seller Registered Successfully
//  *       '400':
//  *         description: Seller already exists
//  *       '500':
//  *         description: Server Error
//  */
// router.post("/register", register);

// /**
//  * @swagger
//  * /api/seller/auth/login:
//  *   post:
//  *     summary: Seller login
//  *     description: Authenticates a seller and returns a JWT token along with seller details.
//  *     tags: [Seller Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "seller@example.com"
//  *               password:
//  *                 type: string
//  *                 example: "password123"
//  *     responses:
//  *       '200':
//  *         description: Login Successful
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Login Successful"
//  *                 token:
//  *                   type: string
//  *                   example: "eyJhbGciOiJIUzI1Ni..."
//  *                 seller:
//  *                   $ref: '#/components/schemas/Seller'
//  *       '400':
//  *         description: Seller not found or Invalid Password
//  *       '500':
//  *         description: Server Error
//  */
// router.post("/login", login);

// /**
//  * @swagger
//  * /api/seller/auth/update/{id}:
//  *   put:
//  *     summary: Update seller details
//  *     description: Updates information of a specific seller.
//  *     tags: [Seller Auth]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the seller
//  *     responses:
//  *       '200':
//  *         description: Profile Updated Successfully
//  *       '404':
//  *         description: Seller not found
//  *       '500':
//  *         description: Server Error
//  */
// router.put("/update/:id", updateSeller);

// /**
//  * @swagger
//  * /api/seller/auth/status/{id}:
//  *   put:
//  *     summary: Update seller approval status (Admin Panel)
//  *     description: Changes the status of a seller to Approved, Rejected, or Pending.
//  *     tags: [Seller Auth]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the seller
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - status
//  *             properties:
//  *               status:
//  *                 type: string
//  *                 enum: [Pending, Approved, Rejected]
//  *                 example: "Approved"
//  *     responses:
//  *       '200':
//  *         description: Seller status updated successfully
//  *       '404':
//  *         description: Seller not found
//  *       '500':
//  *         description: Server Error
//  */
// router.put("/status/:id", updateSellerStatus);

// /**
//  * @swagger
//  * /api/seller/auth/{id}:
//  *   get:
//  *     summary: Get seller details by ID
//  *     description: Retrieves profile details of a specific seller.
//  *     tags: [Seller Auth]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the seller
//  *         example: "60d0fe4f5311236168a109aa"
//  *     responses:
//  *       '200':
//  *         description: Seller details fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Seller'
//  *       '404':
//  *         description: Seller not found
//  *       '500':
//  *         description: Server Error
//  */
// router.get("/:id", getSeller); // 👈 Parametric route ko hamesha sabse niche rakha gaya hai

// module.exports = router;




//claude office night



// const express = require("express");
// const router = express.Router();
// const {
//   register,
//   login,
//   getSeller,
//   getAllSellers,
//   updateSeller,
//   updateSellerStatus,
// } = require("../controllers/sellerAuthController");
// const { protect } = require("../middleware/authMiddleware"); // ✅ JWT verify karta hai, req.seller set karta hai
// const { protectAdmin } = require("../middleware/adminMiddleware");

// /**
//  * @swagger
//  * tags:
//  *   name: Seller Auth
//  *   description: Seller authentication and profile management APIs
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Seller:
//  *       type: object
//  *       properties:
//  *         _id:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109aa"
//  *         name:
//  *           type: string
//  *           example: "Rahul Sharma"
//  *         email:
//  *           type: string
//  *           example: "seller@example.com"
//  *         phone:
//  *           type: string
//  *           example: "9876543210"
//  *         shopName:
//  *           type: string
//  *           example: "Sharma Shawls"
//  *         address:
//  *           type: string
//  *           example: "Main Market"
//  *         city:
//  *           type: string
//  *           example: "Amritsar"
//  *         state:
//  *           type: string
//  *           example: "Punjab"
//  *         pincode:
//  *           type: string
//  *           example: "143001"
//  *         status:
//  *           type: string
//  *           example: "Approved"
//  *         profileImage:
//  *           type: string
//  *           example: "uploads/image.jpg"
//  *         createdAt:
//  *           type: string
//  *           format: date-time
//  *   securitySchemes:
//  *     BearerAuth:
//  *       type: http
//  *       scheme: bearer
//  *       bearerFormat: JWT
//  */

// /**
//  * @swagger
//  * /api/seller/auth:
//  *   get:
//  *     summary: Get all sellers (Admin Panel)
//  *     description: Retrieves a list of all registered sellers.
//  *     tags: [Seller Auth]
//  *     responses:
//  *       '200':
//  *         description: List of all sellers fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: true
//  *                 sellers:
//  *                   type: array
//  *                   items:
//  *                     $ref: '#/components/schemas/Seller'
//  *       '500':
//  *         description: Server Error
//  */
// router.get("/",protectAdmin, getAllSellers); // 👈 Root route ko upar rakha gaya hai (public rehta hai)

// /**
//  * @swagger
//  * /api/seller/auth/register:
//  *   post:
//  *     summary: Register a new seller
//  *     description: Creates a new seller account with profile image and details.
//  *     tags: [Seller Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - name
//  *               - email
//  *               - phone
//  *               - shopName
//  *               - address
//  *               - city
//  *               - state
//  *               - pincode
//  *               - password
//  *             properties:
//  *               name:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *               phone:
//  *                 type: string
//  *               shopName:
//  *                 type: string
//  *               address:
//  *                 type: string
//  *               city:
//  *                 type: string
//  *               state:
//  *                 type: string
//  *               pincode:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       '201':
//  *         description: Seller Registered Successfully
//  *       '400':
//  *         description: Seller already exists
//  *       '500':
//  *         description: Server Error
//  */
// router.post("/register", register);

// /**
//  * @swagger
//  * /api/seller/auth/login:
//  *   post:
//  *     summary: Seller login
//  *     description: Authenticates a seller and returns a JWT token along with seller details.
//  *     tags: [Seller Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "seller@example.com"
//  *               password:
//  *                 type: string
//  *                 example: "password123"
//  *     responses:
//  *       '200':
//  *         description: Login Successful
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Login Successful"
//  *                 token:
//  *                   type: string
//  *                   example: "eyJhbGciOiJIUzI1Ni..."
//  *                 seller:
//  *                   $ref: '#/components/schemas/Seller'
//  *       '400':
//  *         description: Seller not found or Invalid Password
//  *       '403':
//  *         description: Seller not approved / rejected by admin
//  *       '500':
//  *         description: Server Error
//  */
// router.post("/login", login);

// /**
//  * @swagger
//  * /api/seller/auth/update/{id}:
//  *   put:
//  *     summary: Update seller details
//  *     description: Updates information of a specific seller. Seller can only update their own profile (requires JWT token).
//  *     tags: [Seller Auth]
//  *     security:
//  *       - BearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the seller
//  *     responses:
//  *       '200':
//  *         description: Profile Updated Successfully
//  *       '401':
//  *         description: Unauthorized (token missing or invalid)
//  *       '403':
//  *         description: Forbidden (trying to update someone else's profile)
//  *       '404':
//  *         description: Seller not found
//  *       '500':
//  *         description: Server Error
//  */
// router.put("/update/:id", protect, updateSeller);

// /**
//  * @swagger
//  * /api/seller/auth/status/{id}:
//  *   put:
//  *     summary: Update seller approval status (Admin Panel)
//  *     description: Changes the status of a seller to Approved, Rejected, or Pending.
//  *     tags: [Seller Auth]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the seller
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - status
//  *             properties:
//  *               status:
//  *                 type: string
//  *                 enum: [Pending, Approved, Rejected]
//  *                 example: "Approved"
//  *     responses:
//  *       '200':
//  *         description: Seller status updated successfully
//  *       '404':
//  *         description: Seller not found
//  *       '500':
//  *         description: Server Error
//  */
// router.put("/status/:id",protectAdmin, updateSellerStatus);

// /**
//  * @swagger
//  * /api/seller/auth/{id}:
//  *   get:
//  *     summary: Get seller details by ID (Logged-in seller only)
//  *     description: Retrieves profile details of a specific seller. Requires JWT token — seller can only fetch their own profile.
//  *     tags: [Seller Auth]
//  *     security:
//  *       - BearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the seller
//  *         example: "60d0fe4f5311236168a109aa"
//  *     responses:
//  *       '200':
//  *         description: Seller details fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Seller'
//  *       '401':
//  *         description: Unauthorized (token missing or invalid)
//  *       '403':
//  *         description: Forbidden (trying to view someone else's profile)
//  *       '404':
//  *         description: Seller not found
//  *       '500':
//  *         description: Server Error
//  */
// router.get("/:id", protect, getSeller); // 👈 Parametric route ko hamesha sabse niche rakha gaya hai

// module.exports = router;



//claude corrected office




// const express = require("express");
// const router = express.Router();
// const {
//   register,
//   login,
//   getSeller,
//   getAllSellers,
//   updateSeller,
//   updateSellerStatus,
// } = require("../controllers/sellerAuthController");
// const { protect } = require("../middleware/authMiddleware"); // ✅ JWT verify karta hai, req.seller set karta hai
// const { protectAdmin } = require("../middleware/adminMiddleware");
// //change
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
// /**
//  * @swagger
//  * tags:
//  *   name: Seller Auth
//  *   description: Seller authentication and profile management APIs
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Seller:
//  *       type: object
//  *       properties:
//  *         _id:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109aa"
//  *         name:
//  *           type: string
//  *           example: "Rahul Sharma"
//  *         email:
//  *           type: string
//  *           example: "seller@example.com"
//  *         phone:
//  *           type: string
//  *           example: "9876543210"
//  *         shopName:
//  *           type: string
//  *           example: "Sharma Shawls"
//  *         address:
//  *           type: string
//  *           example: "Main Market"
//  *         city:
//  *           type: string
//  *           example: "Amritsar"
//  *         state:
//  *           type: string
//  *           example: "Punjab"
//  *         pincode:
//  *           type: string
//  *           example: "143001"
//  *         status:
//  *           type: string
//  *           example: "Approved"
//  *         profileImage:
//  *           type: string
//  *           example: "uploads/image.jpg"
//  *         createdAt:
//  *           type: string
//  *           format: date-time
//  *   securitySchemes:
//  *     SellerBearerAuth:
//  *       type: http
//  *       scheme: bearer
//  *       bearerFormat: JWT
//  */

// /**
//  * @swagger
//  * /api/seller/auth:
//  *   get:
//  *     summary: Get all sellers (Admin Panel)
//  *     description: Retrieves a list of all registered sellers. Requires admin JWT token.
//  *     tags: [Seller Auth]
//  *     security:
//  *       - SellerBearerAuth: []
//  *     responses:
//  *       '200':
//  *         description: List of all sellers fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: true
//  *                 sellers:
//  *                   type: array
//  *                   items:
//  *                     $ref: '#/components/schemas/Seller'
//  *       '401':
//  *         description: Unauthorized (admin token missing or invalid)
//  *       '500':
//  *         description: Server Error
//  */
// router.get("/", protectAdmin, getAllSellers); // 👈 Root route ko upar rakha gaya hai

// /**
//  * @swagger
//  * /api/seller/auth/register:
//  *   post:
//  *     summary: Register a new seller
//  *     description: Creates a new seller account with profile image and details.
//  *     tags: [Seller Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - name
//  *               - email
//  *               - phone
//  *               - shopName
//  *               - address
//  *               - city
//  *               - state
//  *               - pincode
//  *               - password
//  *             properties:
//  *               name:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *               phone:
//  *                 type: string
//  *               shopName:
//  *                 type: string
//  *               address:
//  *                 type: string
//  *               city:
//  *                 type: string
//  *               state:
//  *                 type: string
//  *               pincode:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       '201':
//  *         description: Seller Registered Successfully
//  *       '400':
//  *         description: Seller already exists
//  *       '500':
//  *         description: Server Error
//  */
// router.post("/register", upload.single("profilePicture"), register);

// /**
//  * @swagger
//  * /api/seller/auth/login:
//  *   post:
//  *     summary: Seller login
//  *     description: Authenticates a seller and returns a JWT token along with seller details.
//  *     tags: [Seller Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "seller@example.com"
//  *               password:
//  *                 type: string
//  *                 example: "password123"
//  *     responses:
//  *       '200':
//  *         description: Login Successful
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Login Successful"
//  *                 token:
//  *                   type: string
//  *                   example: "eyJhbGciOiJIUzI1Ni..."
//  *                 seller:
//  *                   $ref: '#/components/schemas/Seller'
//  *       '400':
//  *         description: Seller not found or Invalid Password
//  *       '403':
//  *         description: Seller not approved / rejected by admin
//  *       '500':
//  *         description: Server Error
//  */
// router.post("/login", login);

// /**
//  * @swagger
//  * /api/seller/auth/update/{id}:
//  *   put:
//  *     summary: Update seller details
//  *     description: Updates information of a specific seller. Seller can only update their own profile (requires JWT token).
//  *     tags: [Seller Auth]
//  *     security:
//  *       - SellerBearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the seller
//  *     responses:
//  *       '200':
//  *         description: Profile Updated Successfully
//  *       '401':
//  *         description: Unauthorized (token missing or invalid)
//  *       '403':
//  *         description: Forbidden (trying to update someone else's profile)
//  *       '404':
//  *         description: Seller not found
//  *       '500':
//  *         description: Server Error
//  */
// router.put("/update/:id", protect, updateSeller);

// /**
//  * @swagger
//  * /api/seller/auth/status/{id}:
//  *   put:
//  *     summary: Update seller approval status (Admin Panel)
//  *     description: Changes the status of a seller to Approved, Rejected, or Pending. Requires admin JWT token.
//  *     tags: [Seller Auth]
//  *     security:
//  *       - SellerBearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the seller
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - status
//  *             properties:
//  *               status:
//  *                 type: string
//  *                 enum: [Pending, Approved, Rejected]
//  *                 example: "Approved"
//  *     responses:
//  *       '200':
//  *         description: Seller status updated successfully
//  *       '401':
//  *         description: Unauthorized (admin token missing or invalid)
//  *       '404':
//  *         description: Seller not found
//  *       '500':
//  *         description: Server Error
//  */
// router.put("/status/:id", protectAdmin, updateSellerStatus);

// /**
//  * @swagger
//  * /api/seller/auth/{id}:
//  *   get:
//  *     summary: Get seller details by ID (Logged-in seller only)
//  *     description: Retrieves profile details of a specific seller. Requires JWT token — seller can only fetch their own profile.
//  *     tags: [Seller Auth]
//  *     security:
//  *       - SellerBearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the seller
//  *         example: "60d0fe4f5311236168a109aa"
//  *     responses:
//  *       '200':
//  *         description: Seller details fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Seller'
//  *       '401':
//  *         description: Unauthorized (token missing or invalid)
//  *       '403':
//  *         description: Forbidden (trying to view someone else's profile)
//  *       '404':
//  *         description: Seller not found
//  *       '500':
//  *         description: Server Error
//  */
// router.get("/:id", protect, getSeller); // 👈 Parametric route ko hamesha sabse niche rakha gaya hai

// module.exports = router;




//1 sept 2026 morning



const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getSeller,
  getAllSellers,
  updateSeller,
  updateSellerStatus,
} = require("../controllers/sellerAuthController");
const { protect } = require("../middleware/authMiddleware");
const { protectAdmin } = require("../middleware/adminMiddleware");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const { upload } = require("../config/cloudinary");
// ✅ register ke liye: profile pic + brand logo dono
const registerUpload = upload.fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "brandLogo", maxCount: 1 },
]);

// ✅ update ke liye: profile image + brand logo dono
const updateUpload = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "brandLogo", maxCount: 1 },
]);

/**
 * @swagger
 * tags:
 *   name: Seller Auth
 *   description: Seller authentication and profile management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Seller:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60d0fe4f5311236168a109aa"
 *         name:
 *           type: string
 *           example: "Rahul Sharma"
 *         email:
 *           type: string
 *           example: "seller@example.com"
 *         phone:
 *           type: string
 *           example: "9876543210"
 *         shopName:
 *           type: string
 *           example: "Sharma Shawls"
 *         brandName:
 *           type: string
 *           example: "Sharma Shawls Premium"
 *         address:
 *           type: string
 *           example: "Main Market"
 *         city:
 *           type: string
 *           example: "Amritsar"
 *         state:
 *           type: string
 *           example: "Punjab"
 *         pincode:
 *           type: string
 *           example: "143001"
 *         status:
 *           type: string
 *           example: "Approved"
 *         profileImage:
 *           type: string
 *           example: "uploads/image.jpg"
 *         brandLogo:
 *           type: string
 *           example: "uploads/logo.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *   securitySchemes:
 *     SellerBearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/seller/auth:
 *   get:
 *     summary: Get all sellers (Admin Panel)
 *     tags: [Seller Auth]
 *     security:
 *       - SellerBearerAuth: []
 *     responses:
 *       '200':
 *         description: List of all sellers fetched successfully
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Server Error
 */
router.get("/", protectAdmin, getAllSellers);

/**
 * @swagger
 * /api/seller/auth/register:
 *   post:
 *     summary: Register a new seller
 *     tags: [Seller Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - shopName
 *               - address
 *               - city
 *               - state
 *               - pincode
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               shopName:
 *                 type: string
 *               brandName:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               pincode:
 *                 type: string
 *               password:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *               brandLogo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Seller Registered Successfully
 *       '400':
 *         description: Seller already exists
 *       '500':
 *         description: Server Error
 */
router.post("/register", registerUpload, register);

/**
 * @swagger
 * /api/seller/auth/login:
 *   post:
 *     summary: Seller login
 *     tags: [Seller Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "seller@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       '200':
 *         description: Login Successful
 *       '400':
 *         description: Seller not found or Invalid Password
 *       '403':
 *         description: Seller not approved / rejected by admin
 *       '500':
 *         description: Server Error
 */
router.post("/login", login);

/**
 * @swagger
 * /api/seller/auth/update/{id}:
 *   put:
 *     summary: Update seller details
 *     tags: [Seller Auth]
 *     security:
 *       - SellerBearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               shopName:
 *                 type: string
 *               brandName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               pincode:
 *                 type: string
 *               password:
 *                 type: string
 *               profileImage:
 *                 type: string
 *                 format: binary
 *               brandLogo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Profile Updated Successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Seller not found
 *       '500':
 *         description: Server Error
 */
router.put("/update/:id", protect, updateUpload, updateSeller);

/**
 * @swagger
 * /api/seller/auth/status/{id}:
 *   put:
 *     summary: Update seller approval status (Admin Panel)
 *     tags: [Seller Auth]
 *     security:
 *       - SellerBearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Approved, Rejected]
 *                 example: "Approved"
 *     responses:
 *       '200':
 *         description: Seller status updated successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Seller not found
 *       '500':
 *         description: Server Error
 */
router.put("/status/:id", protectAdmin, updateSellerStatus);

/**
 * @swagger
 * /api/seller/auth/{id}:
 *   get:
 *     summary: Get seller details by ID (Logged-in seller only)
 *     tags: [Seller Auth]
 *     security:
 *       - SellerBearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "60d0fe4f5311236168a109aa"
 *     responses:
 *       '200':
 *         description: Seller details fetched successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Seller not found
 *       '500':
 *         description: Server Error
 */
router.get("/:id", protect, getSeller);

module.exports = router;