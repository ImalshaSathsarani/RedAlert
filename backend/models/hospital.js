const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    hospitalName: { type: String, required: true },
    type: { type: String, enum: ["Government", "Private"], required: true },
    registrationNumber: { type: String, required: true, unique: true },
    district: { type: String, required: true },
    address: { type: String },

    name: { type: String, required: true },
    phone: { type: String, required: true },
    designation: { type: String, required: true },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isApproved: { type: Boolean, default: false }, // Optional: approval status

     profilePicture: {
      type: String, // URL or file path for profile picture
      default: "/uploads/default-profile.png", // optional default picture
    },

    registrationDocument: {
      type: String, // File path or cloud URL (e.g., "/uploads/registrationForm.pdf")
      required: true,
    },
    officeLetter: {
      type: String, // File path or cloud URL
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hospital", hospitalSchema);
