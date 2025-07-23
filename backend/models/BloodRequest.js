const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    hospitalName: String,
    district: String,
    contactPerson: String,
    emergencyPhone: String,

    bloodType: { type: String, required: true },
    quantity: { type: String, required: true },
    urgencyLevel: String,
    requestDate: Date,
    requestTime: String,

    patientName: String,
    ward: String,
    condition: String,

    donationLocation: String,
    donationTime: String,

    doctorRequestFile: {
      type: String, // stores filename or path
      required: false,
    },

    additionalInfo: String,

    status: {
      type: String,
      enum: ["pending", "fulfilled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
