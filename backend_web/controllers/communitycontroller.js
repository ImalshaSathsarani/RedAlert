const CommunityPost = require("../models/communitypost");

// ➤ Create a post
exports.createPost = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res
        .status(400)
        .json({ success: false, message: "Message is required" });
    }

     const { id, hospitalName, email, emergencyPhone } = req.user;
    const newPost = new CommunityPost({
      hospitalId: req.user.id,
      hospitalName: req.user.hospitalName, // Add hospitalName in authMiddleware or fetch it here
      message,
      email: hospital.email,
      emergencyPhone: hospitalUser.emergencyPhone,
    });

    await newPost.save();
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    console.error("Create Post Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Get Posts Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete a post
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await CommunityPost.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // Optional: Check if the post belongs to the logged-in hospital
    if (post.hospitalId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await post.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete Post Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
