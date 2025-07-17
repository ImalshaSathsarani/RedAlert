const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/authMiddleware');
const { 
  createDonationPost, 
  getAllDonationPosts,
  getPostsByBloodType,
  getPostsByLocation,
  updatePostAvailability,
  deleteDonationPost,
} = require('../../controllers/donor/donationPostController');

// Create new donation post
router.post('/', protect, createDonationPost);

// Get all active donation posts
router.get('/', protect, getAllDonationPosts);

// Get donation posts by blood type
router.get('/bloodtype/:bloodType', protect, getPostsByBloodType);

// Get donation posts by location
router.get('/location/:location', protect, getPostsByLocation);

// Update donation post availability
router.put('/:postId/availability', protect, updatePostAvailability);

// Delete donation post
router.delete('/:postId', protect, deleteDonationPost);

module.exports = router;
