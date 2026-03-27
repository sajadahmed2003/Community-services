const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// 1. Cloudinary ko apne secrets batana (Jo tune abhi .env mein dale hain)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Storage engine banana (Cloudinary ke andar ek naya folder banega)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'insta_clone_ids', // Cloudinary par is folder mein saari IDs save hongi
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'] // Sirf in formats ki photos allow hongi
  }
});

// 3. Multer engine ko start karna
const upload = multer({ storage: storage });

module.exports = upload;