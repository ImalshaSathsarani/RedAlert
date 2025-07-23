const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNo: { type: String, required: true, unique: true },
  role: { type: String, enum: ['donor', 'receiver', 'hospital'], default: 'donor' },
  profilePicture: { type: String, default: '' },
  bloodType: { 
    type: String, 
    required: true,
    enum: ['A+', 'A-', 'B+', 'O+', 'O-'] 
  },
  profilePicture: { type: String },
  lastDonationDate: { type: Date },
  location: { type: String },
  isAvailable: { type: Boolean, default: true },
  verified: { type: Boolean, default: false },

  //hospital specific fields
  hospitalName: String,
  inventory: { type: Map, of: Number},
  contactNumber: String,
  
  resetToken: { type: String },
  resetTokenExpire: { type: Date },
  expoPushToken: {
  type: String
},

  medicalHistory: {
    illness: { type: String, required: false, enum: ['None', 'Diabetes', 'Hypertension', 'Asthma', 'Other'] },
    illnessStatus: { type: String, required: false, enum: ['Ongoing', 'Recovered', 'Managed'] },
    smoking: { type: String, required: false, enum: ['never', 'occasional', 'regular'] },
    alcohol: { type: String, required: false, enum: ['never', 'occasional', 'regular'] },
    vaccinationStatus: { type: String, required: false, enum: ['not_vaccinated', 'partial', 'fully'] },
    vaccineType: { type: String, default: '' },
    doseCount: { type: Number, default: 0 },
    lastVaccinationDate: { type: Date, default: null }
  }
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
