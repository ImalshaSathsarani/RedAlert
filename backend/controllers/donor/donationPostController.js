const DonationPost = require('../../models/DonationPost');
const Hospital = require('../../models/hospital')

// Create a new donation availability post
exports.createDonationPost = async (req, res) => {
  try {
    const { bloodType, location, message, contactInfo } = req.body;

    // Validate required fields
    if (!bloodType || !location || !message || !contactInfo) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new post
    const post = new DonationPost({
      donor: req.user._id,
      bloodType,
      location,
      message,
      contactInfo
    });

    await post.save();

    res.status(201).json({
      message: 'Donation post created successfully',
      post
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating donation post', error: error.message });
  }
};


exports.getAllDonationPosts = async (req, res) => {
  try {
    const posts = await DonationPost.find({ isExpired: false })
      .sort({ createdAt: -1 })
      .lean();

    // Normalize posts: fallback for old `donor` field
    const normalizedPosts = posts.map(post => {
      if (!post.createdBy && post.donor) {
        post.createdBy = {
          id: post.donor,
          model: 'Hospital' // or 'User', depending on your data
        };
      }
      return post;
    });

    console.log('🟢 All normalized posts:', normalizedPosts.map(p => ({
      id: p._id,
      model: p.createdBy?.model,
      hospitalId: p.createdBy?.id?.toString()
    })));

    // Extract hospital IDs for population
    const hospitalIds = normalizedPosts
      .filter(post => post.createdBy && post.createdBy.model === 'Hospital')
      .map(post => post.createdBy.id.toString());

    // Get unique hospital IDs
    const uniqueHospitalIds = [...new Set(hospitalIds)];

    console.log('🟢 Unique Hospital IDs to fetch:', uniqueHospitalIds);

    // Fetch hospital data
    const hospitals = await Hospital.find({ _id: { $in: uniqueHospitalIds } })
      .select('hospitalName name district phone email')
      .lean();

    console.log('🟢 Hospitals fetched:', hospitals.map(h => ({ id: h._id.toString(), name: h.hospitalName })));

    // Map hospitals by ID for easy lookup
    const hospitalMap = {};
    hospitals.forEach(h => {
      hospitalMap[h._id.toString()] = h;
    });

    // Attach hospital data to posts where applicable, leave others as-is
    const populatedPosts = normalizedPosts.map(post => {
      if (
        post.createdBy &&
        post.createdBy.model === 'Hospital' &&
        hospitalMap[post.createdBy.id.toString()]
      ) {
        return {
          ...post,
          createdBy: {
            ...post.createdBy,
            id: hospitalMap[post.createdBy.id.toString()]
          }
        };
      }
      // For posts without hospital or different model, just return as is
      return post;
    });

    console.log('✅ Returning posts with populated hospital data where possible:');
    populatedPosts.forEach(p => {
      console.log({
        id: p._id,
        model: p.createdBy?.model,
        hospitalName: p.createdBy?.id?.hospitalName || 'N/A',
        message: p.message,
      });
    });

    res.json({
      message: 'Donation posts retrieved successfully',
      posts: populatedPosts,
    });
  } catch (error) {
    console.error('❌ Error fetching donation posts:', error);
    res.status(500).json({ message: 'Error fetching donation posts', error: error.message });
  }
};



// Get donation posts by blood type
exports.getPostsByBloodType = async (req, res) => {
  try {
    const { bloodType } = req.params;
    const posts = await DonationPost.find({
      bloodType,
      isExpired: false
    })
      .sort({ createdAt: -1 })
      .populate('donor', 'name bloodType location');

    res.json({
      message: 'Donation posts retrieved successfully',
      posts
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donation posts', error: error.message });
  }
};

// Get donation posts by location
exports.getPostsByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    const posts = await DonationPost.find({
      location: { $regex: location, $options: 'i' },
      isExpired: false
    })
      .sort({ createdAt: -1 })
      .populate('donor', 'name bloodType location');

    res.json({
      message: 'Donation posts retrieved successfully',
      posts
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donation posts', error: error.message });
  }
};

// Update donation post availability
exports.updatePostAvailability = async (req, res) => {
  try {
    const { availability } = req.body;
    const { postId } = req.params;

    if (!availability || !['available', 'not available'].includes(availability)) {
      return res.status(400).json({ message: 'Invalid availability status' });
    }

    const post = await DonationPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Donation post not found' });
    }

    // Check if user owns this post
    if (post.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    post.availability = availability;
    await post.save();

    res.json({
      message: 'Donation post updated successfully',
      post
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating donation post', error: error.message });
  }
};

// Delete donation post
exports.deleteDonationPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await DonationPost.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Donation post not found' });
    }

    // Check if user owns this post
    if (post.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();
    res.json({ message: 'Donation post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting donation post', error: error.message });
  }
};


