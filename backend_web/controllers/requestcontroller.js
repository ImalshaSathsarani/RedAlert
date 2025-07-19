const mongoose = require("mongoose");
const BloodRequest = require("../models/bloodrequest");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const CommunityPost = require("../models/communitypost");
const Hospital = require("../models/hospital");

/*exports.createBloodRequest = async (req, res) => {
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
};*/

exports.createBloodRequest = async (req, res) => {
  try {
    const {
      hospitalName,
      city,
      contactPersonName,
      emergencyContact,
      bloodType,
      quantity,
      urgency,
      requiredDate,
      requiredTime,
      patientName,
      ward, // not used in model
      medicalCondition,
      donationLocation,
      donationTime,
      additionalInfo,
    } = req.body;

    const doctorRequestFile = req.files?.doctorRequestFile?.[0]?.filename;

    const userId = req.user.id;

    // Optional: Fetch full hospital details if `req.user` doesn't have email/contact
    const hospitalUser = await Hospital.findById(userId);

    const newRequest = new BloodRequest({
      hospitalId: new mongoose.Types.ObjectId(req.user.id),
      hospitalName,
      district: city,
      contactPerson: contactPersonName,
      emergencyPhone: emergencyContact,
      bloodType: bloodType,
      quantity,
      urgencyLevel: urgency,
      requestDate: requiredDate,
      requestTime: requiredTime,
      patientName,
      condition: medicalCondition,
      donationLocation,
      donationTime,
      doctorRequestFile,
      additionalInfo,
    });

    await newRequest.save();

    // 3. Automatically create a community post
    if (additionalInfo) {
      const post = new CommunityPost({
        hospitalId: userId,
        hospitalName: hospitalUser.hospitalName, // Or get from DB if not in req.user
        message: additionalInfo,
        email: hospitalUser.email,
        emergencyPhone: emergencyContact,
      });
      await post.save();
    }

    return res.status(200).json({
      success: true,
      message: "Blood request submitted and posted to community.",
    });
  } catch (error) {
    console.error("Error in requestBlood:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while submitting blood request.",
    });
  }

  /*res.status(201).json({
      success: true,
      message: "Blood request created",
      data: newRequest,
    });
  } catch (error) {
    console.error("Blood Request Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }*/
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
      bloodType: req.bloodType,
    }));

    res.status(200).json({ success: true, data: formattedRequests });
  } catch (error) {
    console.error("Get Request History Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
