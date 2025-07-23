// const mongoose = require('mongoose');

// const NotificationSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   title: { type: String, required: true },
//   message: { type: String, required: true },
//   bloodType: { type: String, required: false },     // New field
//   requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: false }, // Optional link to a blood request
//   read: { type: Boolean, default: false }
// }, { timestamps: true });  // Adds createdAt and updatedAt fields automatically

// module.exports = mongoose.model('Notification', NotificationSchema);
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  title: { type: String, required: true },
  message: { type: String, required: true },
  bloodType: { type: String },
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'BloodRequest' },
  read: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' }
}, { timestamps: true });


module.exports = mongoose.model('Notification', NotificationSchema);
