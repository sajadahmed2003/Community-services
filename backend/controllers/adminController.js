const User = require('../models/User');

// @desc    Approve or Reject user verification
// @route   PUT /api/admin/verify/:userId
// @access  Private (Admin)
exports.updateVerificationStatus = async (req, res) => {
  try {
    // 1. Frontend (Admin panel) se 'status' aayega (Verified ya Rejected)
    const { status } = req.body; 

    // 2. Security check: Koi faltu status toh nahi bhej raha?
    if (status !== 'Verified' && status !== 'Rejected') {
      return res.status(400).json({ message: 'Bhai, status sirf Verified ya Rejected ho sakta hai!' });
    }

    // 3. User ko URL se nikal kar DB mein update karna
    const user = await User.findByIdAndUpdate(
      req.params.userId, 
      { verificationStatus: status },
      { new: true } // Yeh isliye taaki update hone ke baad naya data return ho
    ).select('-password'); // Password hide kar diya

    if (!user) {
      return res.status(404).json({ message: 'User nahi mila!' });
    }

    // 4. Success message bhej do!
    res.status(200).json({
      message: `Mubarak ho! User ka status ab ${status} ho gaya hai.`,
      user
    });

  } catch (error) {
    console.error('Admin API Error:', error);
    res.status(500).json({ message: 'Server mein kuch gadbad hai.' });
  }
};