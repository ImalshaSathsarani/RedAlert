const mongoose = require("mongoose");
const BloodRequest = require("../models/bloodrequest");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const CommunityPost = require("../models/communitypost");
const Hospital = require("../models/hospital");
const Eligibility = require("../models/Eligibility")
const User = require('../models/user');

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

    const requests = await BloodRequest.find({ hospitalId }).sort({ createdAt: -1 });

    // const formattedRequests = requests.map((req) => ({
    //   name: req.patientName,
    //   date: req.createdAt,
    //   status: req.status,
    //   bloodType: req.bloodType,
    //   hospitalName: req.hospitalName,
    // }));

    res.status(200).json({ success: true, data: requests });
    console.log("Backend sending data:", requests);
  } catch (error) {
    console.error("Get Request History Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


exports.getPendingBloodRequests = async(req, res)=>{
   const { hospitalId } = req.query;
   console.log("Looking for pending requests for hospitalId:", hospitalId);

   if (!hospitalId) {
    return res.status(400).json({ error: 'Hospital ID is required' });
    
  }
  try {
    const requests = await BloodRequest.find({ 
      status: 'pending', 
      hospitalId: new mongoose.Types.ObjectId(hospitalId), });
    res.json(requests);
    console.log("Going requests:",requests)
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
    console.log("Error",err);
  }
}

exports.getBloodRequestDetails = async(req,res)=>{
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ error: 'Request not found' });
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

exports.findMatchingDonors = async(req,res)=>{

  const compatibleBloodTypes = {
  'A+': ['A+', 'A-', 'O+', 'O-'],
  'A-': ['A-', 'O-'],
  'B+': ['B+', 'B-', 'O+', 'O-'],
  'B-': ['B-', 'O-'],
  'O+': ['O+', 'O-'],
  'O-': ['O-']
};

 try {
    const request = await BloodRequest.findById(req.params.requestId);
    if (!request) return res.status(404).json({ error: 'Request not found' });

    const compatibleTypes = compatibleBloodTypes[request.bloodType] || [];

    // Get all eligible donor userIds
    const eligibleDonorIds = await Eligibility.find({ isEligible: true }).distinct('userId');

    // Filter users who are donors and match:
    // - Compatible blood type
    // - Verified and available
    // - Same or nearby district (basic proximity matching)
    const donors = await User.find({
      _id: { $in: eligibleDonorIds },
      role: 'donor',
      bloodType: { $in: compatibleTypes },
      isAvailable: true,
      // verified: true,
      // location: { $regex: new RegExp(request.district, 'i') } // basic location match
    }).select('name email mobileNo bloodType location lastDonationDate');

    res.json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }

}

exports.completeRequest = async (req,res) =>{
  try{
    const { requestId} = req.params;
    const { donorId } = req.body;

    //find blood request
    const bloodRequest = await BloodRequest.findById(requestId);
    if(!bloodRequest){
      return res.status(404).json({success:false, message:"Blood request not found"});
    }

    //find blood donor accurately
    const donor = await User.findById(donorId);
    if(!donor){
      return res.status(404).json({success:false,message:"Donor not found"})
    }

    //Mark request as completed and attach donor details
    bloodRequest.status = "completed";
    bloodRequest.donationDate = new Date();
    bloodRequest.donorId = donor._id;
    bloodRequest.donorName = donor.name;
    bloodRequest.donorPhone = donor.phone;
    bloodRequest.donorEmail = donor.email;

    await bloodRequest.save();

    res.status(200).json({
      success:true,
      message:'Blood request marked as completed with donor details',
      data:bloodRequest,
    });

  } catch (error) {
    console.error("Error completing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

exports.cancelRequest = async (req,res) =>{
  try{
    const requestId = req.params.id;
    const request = await BloodRequest.findById(requestId);
    if(!request) {
      return res.status(404).json({message:'Request not found'});
    }

    if(request.status.toLowerCase() !== 'pending'){
      return res.status(400).json({message:"Only Pending requests can be cancelled"});
    }

    request.status = "cancelled";
    await request.save();
    res.status(200).json({message:"Request cancelled successfully", data:request});
  }catch(e){
    console.error("Error cancelling request:", e);
    res.status(500).json({message:'Server error'})
  }
}