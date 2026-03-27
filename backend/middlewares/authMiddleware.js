const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  // 1. Check karna ki request ke Header mein token aaya hai ya nahi (Format: Bearer <token>)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Token ko nikalna ("Bearer " word ko hata kar sirf token lena)
      token = req.headers.authorization.split(' ')[1];

      // 3. Token ko verify (decode) karna apne secret key se
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Token mein se User ki ID nikal kar DB se poora user dhundhna
      // (Aur password ko hide kar dena taaki aage pass na ho)
      req.user = await User.findById(decoded.id).select('-password');

      // 5. Sab sahi hai, toh agle function (Controller) ko pass kar do
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Bhai, tera token invalid ya expire ho gaya hai. Wapas login kar!' });
    }
  }

  // Agar token bheja hi nahi
  if (!token) {
    res.status(401).json({ message: 'Token kahan hai bhai? Bina VIP ticket entry nahi milegi!' });
  }
};