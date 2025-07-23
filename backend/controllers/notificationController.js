const mongoose = require("mongoose");

const Notification = require("../models/Notification")

const Hospital = require("../models/hospital");
const User = require("../models/User");
const BloodRequest = require("../models/BloodRequest")
const NotificationHospital = require("../models/notificationHospital")
exports.getNotifications = async(req,res)=>{
   try {
     const { userId } = req.params;
    console.log("Fetching notifications for userId:", userId);
    console.log("Notification model:", Notification);

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error("Invalid userId format:", userId);
      return res.status(400).json({ error: "Invalid user ID format" });
    }
    const notifications = await Notification.find({ userId })
    .populate({
        path: "requestId",
        populate: { path: "hospitalId", select: "profilePicture hospitalName" }
      })
    .sort({ createdAt: -1 });
    res.json(notifications);
    console.log("Notifications:", notifications)
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ error: 'Server Error' });
  } 
}

exports.acceptOrDeclineRequests = async (req,res)=>{
   const { status, donorId } = req.body; // status = 'accepted' or 'declined'
  const { id } = req.params; // notification id for the donor

  try {
    const donorNotification = await Notification.findByIdAndUpdate(id, {
      status,
      read: true
    }, { new: true });

    if (!donorNotification) return res.status(404).json({ message: "Notification not found" });

    const donor = await User.findById(donorId); // assuming User model for donor
    const request = await BloodRequest.findById(donorNotification.requestId).populate('hospitalId');

    if (!request || !request.hospitalId) return res.status(404).json({ message: "Related request or hospital not found" });

    
    let hospitalNotification = await NotificationHospital.findOne({
      requestId: donorNotification.requestId,
      userId: donorId
    });

    // const newNotification = new NotificationHospital({
    //   hospitalId: request.hospitalId._id,
    //   userId: donorId,
    //   title: `${donor.name} has ${status} your blood request.`,
    //   message: `The donor ${donor.name} has ${status} the request for blood type ${donorNotification.bloodType}.`,
    //   requestId: donorNotification.requestId,
    //   bloodType: donorNotification.bloodType,
    //   status
    // });

    // await newNotification.save();

     if (hospitalNotification) {
      // Update existing hospital notification
      hospitalNotification.status = status;
      hospitalNotification.read = false;
      hospitalNotification.title = `${donor.name} has ${status} your blood request.`;
      hospitalNotification.message = `The donor ${donor.name} has ${status} the request for blood type ${donorNotification.bloodType}.`;
      await hospitalNotification.save();
    } else {
      // 3. Create new hospital notification if not found
      hospitalNotification = new NotificationHospital({
        hospitalId: request.hospitalId._id,
        userId: donorId,
        title: `${donor.name} has ${status} your blood request.`,
        message: `The donor ${donor.name} has ${status} the request for blood type ${donorNotification.bloodType}.`,
        requestId: donorNotification.requestId,
        bloodType: donorNotification.bloodType,
        status
      });

      await hospitalNotification.save();
    }

    res.status(200).json({ message: "Response recorded and hospital notified." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
}


exports.savePushToken = async(req, res)=>{
   try {
    const { userId, expoPushToken } = req.body;

    if (!userId || !expoPushToken) {
      return res.status(400).json({ error: "Missing userId or expoPushToken" });
    }

    await User.findByIdAndUpdate(userId, { expoPushToken });
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error saving push token:", err);
    res.status(500).json({ error: "Failed to save push token" });
  }
}


exports.getUnreadNotificaions = async (req, res) =>{
   try {
    const count = await Notification.countDocuments({ userId: req.params.userId, read: false });
    res.json({ unreadCount: count });
  } catch (err) {
    console.error("Failed to fetch unread notifications:", err);
    res.status(500).json({ message: "Server Error" });
  }
}