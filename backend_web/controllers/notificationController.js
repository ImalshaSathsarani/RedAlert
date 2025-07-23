const mongoose = require("mongoose");
const multer = require("multer");
const Notification = require("../models/notification");
const notificationHospital = require("../models/notificationHospital");
const { Expo } = require('expo-server-sdk');
const User = require("../../backend/models/User");
const notification = require("../models/notification");
let expo = new Expo();


// exports.sendNotifications = async(req, res) =>{
//      try {
//     const { userId, title, message } = req.body;

//     const newNotification = new Notification({
//       userId,
//       title,
//       message
//     });

//     await newNotification.save();
//     res.status(201).json({ success: true, message: 'Notification sent.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to send notification' });
//   }
// }

exports.sendNotifications = async (req, res) => {
  try {
     console.log("Received Notification Payload:", req.body);
    const { userId, title, message, bloodType, requestId, hospitalId } = req.body;

    const newNotification = new Notification({
      userId,
      title,
      message,
      bloodType,   // New field
      requestId,
      hospitalId   // New field
    });

    await newNotification.save();

      const io = req.app.get('io');
      const connectedUsers = req.app.get("connectedUsers");
      console.log("📡 Connected Users Map:", connectedUsers);
      const socketId = connectedUsers.get(userId);
    if (socketId) {
       console.log("✅ Emitting to socket:", socketId);
      io.to(socketId).emit('notification', {
        title,
        message,
        bloodType,
        requestId
      });
    }else {
  console.log("❌ User is not connected:", userId);
}


//  // --- Expo Push Notification (background/offline) ---
//     const user = await User.findById(userId);
//     if (user && user.expoPushToken && Expo.isExpoPushToken(user.expoPushToken)) {
//       console.log("📲 Sending Expo Push Notification to:", user.expoPushToken);
//       await expo.sendPushNotificationsAsync([
//         {
//           to: user.expoPushToken,
//           sound: 'default',
//           title,
//           body: message,
//           data: { bloodType, requestId },
//         },
//       ]);
//       console.log("Expo Push Receipts:", receipts);
//     } else {
//       console.log("⚠️ No valid Expo push token for user:", userId);
//     }

    res.status(201).json({ success: true, message: 'Notification sent.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send notification' });
  }
};

// exports.getNotifications = async(req,res)=>{
//    try {
//     const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     res.json(notifications);
//   } catch (err) {
//     res.status(500).json({ error: 'Server Error' });
//   } 
// }
// exports.getNotifications = async(req,res)=>{
//    try {
//     const hospitalNotifications = await notificationHospital.find({ hospitalId: req.params.id }).sort({ createdAt: -1 });
//     res.json(hospitalNotifications);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching hospital notifications" });
//   }
// }
exports.getNotifications = async (req, res) => {
  try {
    const hospitalNotifications = await notificationHospital
      .find({ hospitalId: req.params.id })
      .populate({
        path: "userId",
        select: "name profilePicture bloodType mobileNo", // Include fields you need
      })
      .sort({ createdAt: -1 });

    res.json(hospitalNotifications);
  } catch (err) {
    console.error("Error fetching hospital notifications:", err);
    res.status(500).json({ message: "Error fetching hospital notifications" });
  }
};

exports.getSentNotifications = async (req, res) => {
  try {
     const hospitalId = req.params.id;
    console.log("Fetching sentbox for hospital:", hospitalId);
    const notifications = await notification
      .find({ hospitalId: req.params.id })
      .populate({
        path: "userId",
        select: "name profilePicture bloodType mobileNo", // Include fields you need
      })
      .sort({ createdAt: -1 });

    res.json(notifications);
    console.log("Sending Sent Notification:",notifications)
  } catch (err) {
    console.error("Error fetching hospital notifications:", err);
    res.status(500).json({ message: "Error fetching hospital notifications" });
  }
};