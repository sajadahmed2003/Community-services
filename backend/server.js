require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 1. Import Routes
const authRoutes = require('./routes/authRoutes');
const verificationRoutes = require('./routes/verificationRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// 2. Middlewares
app.use(express.json());
app.use(cors());
app.use('/api/admin', adminRoutes);

// 3. Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/verification', verificationRoutes);

// 4. Test API Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: '🚀 VIP Professional Network Backend is LIVE!' });
});

const PORT = process.env.PORT || 5000;

// 5. Database Connection & Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    
    app.listen(PORT, () => {
      console.log(`🔥 Server is running on port ${PORT}`);
      console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    });
  })
  .catch((error) => {
    console.log('❌ MongoDB connection failed:', error.message);
  });