// is User.js file ke andar yeh Mongoose schema ka code hai. Isey humne humare Insta Clone ke Phase 1 blueprint ke hisaab se design kiya hai:

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // 1. Basic Info (Signup Data)
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  // 2. Profile Details (Insta-Vibe)
  profilePhotoUrl: { type: String, default: '' }, // Cloudinary ka link aayega yahan
  bio: { type: String, maxLength: 150, default: '' },
  
  // 3. The Bouncer (Verification & Security Engine)
  verificationStatus: { 
    type: String, 
    enum: ['Unverified', 'Pending', 'Verified', 'Rejected'], 
    default: 'Unverified' // Naya account banate hi user by default Unverified hoga
  },
  requestedCommunity: { 
    type: String, 
    enum: ['Engineering', 'Medical', 'Law', 'Business', 'None'], // Apni marzi se categories add kar lena
    default: 'None'
  },
  uploadedIdUrl: { 
    type: String, 
    default: '' // User ke College ID / Medical Degree ki photo ka link
  }
}, { timestamps: true }); 
// timestamps automatically 'createdAt' aur 'updatedAt' time save kar lega

module.exports = mongoose.model('User', userSchema);