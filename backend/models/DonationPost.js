const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const donationPostSchema = new mongoose.Schema({
  postId: {
    type: String,
    default: () => uuidv4(),  // Automatically generate a unique UUID string
    unique: true,
    required: true,
  },

  // Flexible reference to either User (Donor) or Hospital
  createdBy: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'createdBy.model',
    },
    model: {
      type: String,
      required: true,
      enum: ['User', 'Hospital'], // Dynamic reference
    },
  },

  bloodType: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },

  location: {
    type: String,
    required: true,
  },

  availability: {
    type: String,
    enum: ['available', 'not available'],
    default: 'available',
  },

  message: {
    type: String,
    required: true,
    trim: true,
  },

  contactInfo: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from creation
  },

  isExpired: {
    type: Boolean,
    default: false,
  },

  views: {
    type: Number,
    default: 0,
  },
});

// 🔍 Indexes for search and sort performance
donationPostSchema.index({ bloodType: 1 });
donationPostSchema.index({ location: 'text' });
donationPostSchema.index({ createdAt: -1 });

// 🔄 Middleware to auto-check expiration
donationPostSchema.pre('save', function (next) {
  this.isExpired = new Date() > this.expiresAt;
  next();
});

// ✅ Export the model
module.exports = mongoose.model('DonationPost', donationPostSchema);
