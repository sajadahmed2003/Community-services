const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ==========================================
// 1. SIGNUP FUNCTION (Naya account banana)
// ==========================================
exports.registerUser = async (req, res) => {
  try {
    // 1. Frontend se data receive karna
    const { fullName, email, password } = req.body;

    // 2. Check karna ki is email se pehle koi account toh nahi hai?
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Bhai, is email se pehle hi account bana hua hai!' });
    }

    // 3. Password ko Hash (Encrypt) karna
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. MongoDB mein naya User save karna
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword
    });

    // 5. JWT Token Generate karna
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '30d' }
    );

    // 6. Frontend ko Success message aur Token wapas bhejna
    res.status(201).json({
      message: 'User registered successfully!',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        verificationStatus: user.verificationStatus
      }
    });

  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server mein kuch gadbad hai, baad mein try karo.' });
  }
};


// ==========================================
// 2. LOGIN FUNCTION (Purane account mein aana)
// ==========================================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check karna ki is email se koi user hai bhi ya nahi?
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Bhai, is email se koi account nahi mila!' });
    }

    // 2. Password Match karna (Bcrypt ka magic)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password galat hai mere bhai!' });
    }

    // 3. Naya JWT Token Generate karna
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '30d' }
    );

    // 4. Frontend ko Login Success message aur Token bhejna
    res.status(200).json({
      message: 'Login successful! Welcome back.',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        verificationStatus: user.verificationStatus
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server mein kuch gadbad hai, baad mein try karo.' });
  }
};