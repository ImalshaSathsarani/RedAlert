const Hospital = require("../models/hospital");

// Update Profile Controller
exports.updateProfile = async (req, res) => {
  try {
    const hospitalId = req.user.id; // from authMiddleware

    const { hospitalName, type, name, phone, designation, email } = req.body;

    const updatedHospital = await Hospital.findByIdAndUpdate(
      hospitalId,
      {
        hospitalName,
        type,
        name,
        phone,
        designation,
        email,
      },
      { new: true } // return the updated document
    );

    if (!updatedHospital) {
      return res
        .status(404)
        .json({ success: false, message: "Hospital not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedHospital,
    });
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const hospitalId = req.user.id;

    const hospital = await Hospital.findById(hospitalId).select(
      "hospitalName type registrationNumber district address phone"
    );

    if (!hospital) {
      return res
        .status(404)
        .json({ success: false, message: "Hospital not found" });
    }

    res.status(200).json({
      success: true,
      data: {
        name: hospital.hospitalName,
        type: hospital.type,
        registrationNumber: hospital.registrationNumber,
        address: hospital.address,
        city: hospital.district,
        phoneNumber: hospital.phone,
      },
    });
  } catch (error) {
    console.error("Get Profile Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
