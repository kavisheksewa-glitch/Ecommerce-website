// const multer = require("multer");
// const path = require("path");

// // Storage Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Ensure karein ki aapke project mein root par 'uploads' folder bana ho
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // Multer upload middleware
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Limit: 5MB tak ki image
// });

// module.exports = upload;