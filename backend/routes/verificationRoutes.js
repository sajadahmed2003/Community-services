const express = require('express');
const router = express.Router();
const { submitVerification } = require('../controllers/verificationController');

// 👇 Yahan humne apne Bouncer ko bulaya hai 👇
const { protect } = require('../middlewares/authMiddleware');

const upload = require('../middlewares/uploadMiddleware');

// Jab koi is route par aayega, toh pehle 'protect' chalega (token check karne ke liye)
// Agar token sahi hua, tabhi 'submitVerification' chalega!
router.post('/submit', protect, upload.single('idCard'), submitVerification);

module.exports = router;