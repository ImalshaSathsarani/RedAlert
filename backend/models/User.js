const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNo: { type: String, required: true, unique: true },
  role: { type: String, enum: ['donor', 'receiver', 'hospital'], default: 'donor' },
  bloodType: { 
    type: String, 
    required: true,
    enum: ['A+', 'A-', 'B+', 'O+', 'O-'] 
  },
  lastDonationDate: { type: Date },
  location: { type: String },
  isAvailable: { type: Boolean, default: true },
  verified: { type: Boolean, default: false },

  //hospital specific fields
  hospitalName: String,
  inventory: { type: Map, of: Number},
  contactNumber: String,
  
  resetToken: { type: String },
  resetTokenExpire: { type: Date }

}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
