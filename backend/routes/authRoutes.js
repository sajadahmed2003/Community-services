const express = require('express');
const router = express.Router();
const { registerUser, loginUser} = require('../controllers/authController');

// Jab koi frontend se POST request bhejega '/signup' par, 
// toh yeh seedha 'registerUser' function ko chala dega
router.post('/signup', registerUser);

router.post('/login', loginUser);

module.exports = router;