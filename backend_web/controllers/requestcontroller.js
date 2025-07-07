const mongoose = require("mongoose");
const BloodRequest = require("../models/bloodrequest");

exports.createBloodRequest = async (req, res) => {
  try {
    const newRequest = new BloodRequest({
      ...req.body,
      hospitalId: new mongoose.Types.ObjectId(req.user.id),
    });

    await newRequest.save();
    res.status(201).json({
      success: true,
      message: "Blood request created",
      data: newRequest,
    });
  } catch (error) {
    console.error("Blood Request Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch requests" });
  }
};

exports.getHospitalRequests = async (req, res) => {
  try {
    const hospitalId = req.user.id;

    const requests = await BloodRequest.find({ hospitalId })
      .select("patientName createdAt status") // only these fields
      .sort({ createdAt: -1 });

    const formattedRequests = requests.map((req) => ({
      name: req.patientName,
      date: req.createdAt,
      status: req.status,
    }));

    res.status(200).json({ success: true, data: formattedRequests });
  } catch (error) {
    console.error("Get Request History Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
