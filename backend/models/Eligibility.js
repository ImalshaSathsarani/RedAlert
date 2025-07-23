const mongoose = require('mongoose');

const eligibilitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  }, 
  weight: { type: Number, required: true },
  age: { type: Number, required: true },
  gender: { 
    type: String, 
    required: true,
    enum: ['male', 'female', 'other'] 
  },
  lastDonationDate: { type: Date },
  chronicIllness: {type:String, required:true},
  chronicIllnessDetails:{type:String, required:true},
  medications:{type:String, required:true},
  medicationDetails:{type:String, required:true},
  coldFever7Days:{type:String, required:true},
  surgery6Months:{type:String, required:true},
  allergies:{type:String, required:true},
  allergyDetails:{type:String, required:true},
  vaccinated4Weeks:{type:String, required:true},
  vaccineDetails:{type:String, required:true},
  smokingHabits:{type:String, required:true},
  alcoholDrinking:{type:String, required:true},
  internationalTravel3Months:{type:String, required:true},
  tattoosPiercing6Months:{type:String, required:true},
  testedPositiveInfectious:{type:String, required:true},
  pregnantBreastfeedingMenstruating:{type:String, required:true, default:"No"},
  isEligible: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Eligibility', eligibilitySchema);
