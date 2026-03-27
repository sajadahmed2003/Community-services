const express = require('express');
const router = express.Router();
const { updateVerificationStatus } = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');

// Route par dhyan de: Isme ':userId' lagaya hai, taaki hum specific user ko verify kar sakein
router.put('/verify/:userId', protect, updateVerificationStatus);

module.exports = router;