// const User = require('../models/User');

// // @desc    Submit documents for verification
// // @route   POST /api/verification/submit
// // @access  Private (Sirf logged-in users ke liye)
// exports.submitVerification = async (req, res) => {
//   try {
//     // 1. Frontend se data aayega (Cloudinary ka image link aur Category)
//     const { requestedCommunity, uploadedIdUrl } = req.body;

//     // 2. Jo user request bhej raha hai, usko database mein dhundho
//     // (req.user.id humare "protect" middleware se aayega)
//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res.status(404).json({ message: 'User nahi mila bhai!' });
//     }

//     if (user.verificationStatus === 'Verified') {
//       return res.status(400).json({ message: 'Bhai tu toh pehle se verified hai!' });
//     }

//     // 3. User ka data update karo
//     user.requestedCommunity = requestedCommunity;
//     user.uploadedIdUrl = uploadedIdUrl;
//     user.verificationStatus = 'Pending'; // Status change kar diya!

//     // 4. Database mein save karo
//     await user.save();

//     // 5. Success message bhej do
//     res.status(200).json({
//       message: 'Verification request submit ho gayi hai! Admin jaldi check karega.',
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         verificationStatus: user.verificationStatus,
//         requestedCommunity: user.requestedCommunity
//       }
//     });

//   } catch (error) {
//     console.error('Verification Error:', error);
//     res.status(500).json({ message: 'Server mein kuch gadbad hai.' });
//   }
// };


const User = require('../models/User');

exports.submitVerification = async (req, res) => {
  try {
    // 1. Ab text data (Community) alag aayega aur photo alag aayegi
    const { requestedCommunity } = req.body;

    // 2. Check karna ki Bouncer/Multer ne photo di hai ya nahi?
    if (!req.file) {
      return res.status(400).json({ message: 'Bhai, ID Card ki photo toh upload kar!' });
    }

    // 3. Cloudinary ka magic! (req.file.path mein Cloudinary ne naya URL daal diya hai)
    const uploadedIdUrl = req.file.path;

    // 4. User dhundho
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User nahi mila bhai!' });
    }
    if (user.verificationStatus === 'Verified') {
      return res.status(400).json({ message: 'Bhai tu toh pehle se verified hai!' });
    }

    // 5. User ka data update karo
    user.requestedCommunity = requestedCommunity;
    user.uploadedIdUrl = uploadedIdUrl; // Yeh naya Cloudinary URL hai
    user.verificationStatus = 'Pending';

    await user.save();

    res.status(200).json({
      message: 'Asli photo upload ho gayi! Admin check karega.',
      user: {
        id: user._id,
        fullName: user.fullName,
        verificationStatus: user.verificationStatus,
        requestedCommunity: user.requestedCommunity,
        uploadedIdUrl: user.uploadedIdUrl // Testing ke liye link return kar rahe hain
      }
    });

  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Server mein kuch gadbad hai.' });
  }
};