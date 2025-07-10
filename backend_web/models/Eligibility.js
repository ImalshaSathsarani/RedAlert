const mongoose = require("mongoose");

const eligibilitySchema = new mongoose.Schema({
  weight: { type: Number, required: true },
  age: { type: Number, required: true },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  lastDonationDate: { type: Date },
  chronicIllness: { type: Boolean, default: false },
  onMedication: { type: Boolean, default: false },
  recentIllness: { type: Boolean, default: false },
  recentSurgery: { type: Boolean, default: false },
  knownAllergies: { type: Boolean, default: false },
  isEligible: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Eligibility", eligibilitySchema);
