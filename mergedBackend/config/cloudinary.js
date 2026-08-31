const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// 1. Cloudinary credentials configuration
cloudinary.config({
  cloud_name:"ctfx5zxu",
  api_key: "364341576736232",
  api_secret: "LhDA3RhuiuGblAXaF5U8Y0caMwE",
});

// 2. Storage configuration for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'seller-products', // Cloudinary par kis main folder me save hoga
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

// 3. Multer upload middleware (Multiple fields ke liye 'fields' use karenge)
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Max 5MB limit (optional)
});

module.exports = { cloudinary, upload };