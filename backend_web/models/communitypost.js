const mongoose = require("mongoose");

const communityPostSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    hospitalName: { type: String },
    message: { type: String, required: true },

    email: { type: String },
    emergencyPhone: { type: String },
  },

  { timestamps: true }
);

module.exports = mongoose.model("CommunityPost", communityPostSchema);
