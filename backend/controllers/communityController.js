const Hospital = require('../models/hospital'); // adjust the path as needed
const Comment = require('../models/Comment')
const mongoose = require('mongoose');


exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find()
      .select('-password -registrationDocument -officeLetter -__v'); // Remove only sensitive fields

    console.log('✅ Full hospital data from DB:');
    hospitals.forEach((hospital, index) => {
      // console.log(`--- Hospital ${index + 1} ---`);
      // console.log(hospital.toObject()); // full object with selected fields
    });

    res.json({
      message: 'Hospitals retrieved successfully',
      hospitals,
    });
  } catch (error) {
    console.error('❌ Error fetching hospitals:', error);
    res.status(500).json({ message: 'Error fetching hospitals', error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId, commentText } = req.body;

    console.log("➡️ Add Comment API Hit");
    console.log("🔹 User ID from JWT:", userId);
    console.log("🔹 Post ID:", postId);
    console.log("🔹 Comment Text:", commentText);

    if (!postId || !commentText) {
      return res.status(400).json({ message: "Post ID and comment text are required" });
    }
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid Post ID" });
    }

    const comment = await Comment.create({
      postId,
      userId,
      commentText,
    });

    return res.status(201).json({ message: "✅ Comment added successfully", comment });
  } catch (error) {
    console.error("❌ Error adding comment:", error);
    return res.status(500).json({ message: "Error adding comment", error: error.message });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    console.log("➡️ Get Comments API Hit");
    console.log("🔹 Post ID:", postId);

    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid or missing postId" });
    }

    const comments = await Comment.find({ postId })
      .populate('userId', 'name profilePicture')
      .sort({ createdAt: -1 });

    console.log(`✅ Fetched ${comments.length} comments for Post ID: ${postId}`);

    return res.status(200).json({ comments });
  } catch (error) {
    console.error("❌ Error fetching comments:", error);
    return res.status(500).json({ message: "Error fetching comments", error: error.message });
  }
};
