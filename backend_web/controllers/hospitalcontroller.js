const Hospital = require("../models/hospital");

// Update Profile Controller
exports.updateProfile = async (req, res) => {
  try {
    const hospitalId = req.user.id;

    const {
      hospitalName,
      type,
      name,
      phone,
      designation,
      email,
      profilePicture, // receive the base64 string from frontend
    } = req.body;

    // console.log("Received hospitalId:", profilePicture);
    // console.log("Received profilePicture:", profilePicture?.substring(0, 100)); // to avoid large logs

    const updatedHospital = await Hospital.findByIdAndUpdate(
      hospitalId,
      {
        hospitalName,
        type,
        name,
        phone,
        designation,
        email,
        ...(profilePicture && { profilePicture }), // only update if present
      },
      { new: true }
    );

    if (!updatedHospital) {
      return res
        .status(404)
        .json({ success: false, message: "Hospital not found" });
    }

    console.log("Updated Hospital Profile:", updatedHospital);

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
      "hospitalName type registrationNumber district address phone image"
    );

    if (!hospital) {
      return res.status(404).json({ success: false, message: "Hospital not found" });
    }

    console.log("Hospital Document:", hospital);
    console.log("Hospital Image Data:", hospital.image);

    res.status(200).json({
      success: true,
      data: {
        name: hospital.hospitalName,
        type: hospital.type,
        registrationNumber: hospital.registrationNumber,
        address: hospital.address,
        city: hospital.district,
        phoneNumber: hospital.phone,
        image: hospital.image || "", // send image string
      },
    });
  } catch (error) {
    console.error("Get Profile Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

