const mongoose = require('mongoose');

const donationPostSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bloodType: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  location: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    enum: ['available', 'not available'],
    default: 'available'
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  contactInfo: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  },
  isExpired: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  }
});

// Index for better search performance
donationPostSchema.index({ bloodType: 1 });
donationPostSchema.index({ location: 'text' });
donationPostSchema.index({ createdAt: -1 });

// Middleware to update isExpired status
donationPostSchema.pre('save', function(next) {
  this.isExpired = new Date() > this.expiresAt;
  next();
});

module.exports = mongoose.model('DonationPost', donationPostSchema);
