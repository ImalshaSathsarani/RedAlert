const User = require('../../models/User');
const MedicalHistory = require('../../models/MedicalHistory');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    console.log('Received update request for user:', req.user._id);
    console.log('Update data:', req.body);
    
    const updates = req.body;
    const userId = req.user._id;
    
    // Validate medical history data
    if (updates.medicalHistory) {
      const requiredFields = ['illness', 'illnessStatus', 'smoking', 'alcohol', 'vaccinationStatus'];
      const missingFields = requiredFields.filter(field => !updates.medicalHistory[field]);
      
      if (missingFields.length > 0) {
        console.log('Missing required fields:', missingFields);
        return res.status(400).json({ 
          message: 'Missing required fields',
          missing: missingFields 
        });
      }

      // Convert doseCount to number
      if (updates.medicalHistory.doseCount) {
        updates.medicalHistory.doseCount = parseInt(updates.medicalHistory.doseCount);
        console.log('Parsed doseCount:', updates.medicalHistory.doseCount);
      }

      // Handle date
      if (updates.medicalHistory.lastVaccinationDate) {
        try {
          updates.medicalHistory.lastVaccinationDate = new Date(updates.medicalHistory.lastVaccinationDate);
          console.log('Parsed date:', updates.medicalHistory.lastVaccinationDate);
        } catch (dateError) {
          console.error('Date parsing error:', dateError);
          return res.status(400).json({ 
            message: 'Invalid date format',
            error: dateError.message
          });
        }
      }

      // Update user
      const user = await User.findById(userId);
      if (!user) {
        console.log('User not found:', userId);
        return res.status(404).json({ message: 'User not found' });
      }

      // Validate and set medical history fields
      try {
        // Validate illness
        if (!['None', 'Diabetes', 'Hypertension', 'Asthma', 'Other'].includes(updates.medicalHistory.illness)) {
          return res.status(400).json({ 
            message: 'Invalid illness value',
            validValues: ['None', 'Diabetes', 'Hypertension', 'Asthma', 'Other']
          });
        }

        // Validate illnessStatus
        if (!['Ongoing', 'Recovered', 'Managed'].includes(updates.medicalHistory.illnessStatus)) {
          return res.status(400).json({ 
            message: 'Invalid illness status',
            validValues: ['Ongoing', 'Recovered', 'Managed']
          });
        }

        // Validate smoking/alcohol
        if (!['never', 'occasional', 'regular'].includes(updates.medicalHistory.smoking) ||
            !['never', 'occasional', 'regular'].includes(updates.medicalHistory.alcohol)) {
          return res.status(400).json({ 
            message: 'Invalid smoking/alcohol value',
            validValues: ['never', 'occasional', 'regular']
          });
        }

        // Validate vaccination status
        if (!['not_vaccinated', 'partial', 'fully'].includes(updates.medicalHistory.vaccinationStatus)) {
          return res.status(400).json({ 
            message: 'Invalid vaccination status',
            validValues: ['not_vaccinated', 'partial', 'fully']
          });
        }

        // Check if medical history already exists for this user
        let medicalHistory = await MedicalHistory.findOne({ userId });
        
        const medicalHistoryData = {
          userId,
          illness: updates.medicalHistory.illness,
          illnessStatus: updates.medicalHistory.illnessStatus,
          smoking: updates.medicalHistory.smoking,
          alcohol: updates.medicalHistory.alcohol,
          vaccinationStatus: updates.medicalHistory.vaccinationStatus,
          vaccineType: updates.medicalHistory.vaccineType || '',
          doseCount: updates.medicalHistory.doseCount || 0,
          lastVaccinationDate: updates.medicalHistory.lastVaccinationDate ? new Date(updates.medicalHistory.lastVaccinationDate) : null
        };

        if (medicalHistory) {
          // Update existing medical history
          Object.assign(medicalHistory, medicalHistoryData);
          medicalHistory = await medicalHistory.save();
        } else {
          // Create new medical history
          medicalHistory = await MedicalHistory.create(medicalHistoryData);
        }

        // Update user with medical history reference
        user.medicalHistory = medicalHistory._id;
        const updatedUser = await user.save();
        
        // Return the updated user with medical history
        const populatedUser = await User.findById(userId)
          .populate('medicalHistory')
          .select('-password');
          
        console.log('Profile updated successfully for user:', userId);
        console.log('Updated medical history:', medicalHistory);
        
        return res.status(200).json(populatedUser);
      } catch (validationError) {
        console.error('Validation error:', validationError);
        return res.status(400).json({ 
          message: 'Validation failed',
          error: validationError.message
        });
      }
    } else {
      return res.status(400).json({ message: 'No medical history data provided' });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    
    // Check if validation error
    if (error.name === 'ValidationError') {
      console.error('Validation error:', error.errors);
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: error.errors
      });
    }

    console.error('Database error:', error);
    res.status(500).json({ 
      message: 'Update Failed',
      error: error.message 
    });
  }
};

exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a unique filename
    const fileExt = path.extname(req.file.originalname).toLowerCase();
    const filename = `profile-${user._id}-${uuidv4()}${fileExt}`;
    const filePath = path.join(uploadsDir, filename);

    // Save the file
    fs.writeFileSync(filePath, req.file.buffer);

    // Update user's profile picture
    const imageUrl = `/uploads/${filename}`;
    user.profilePicture = imageUrl;
    await user.save();

    res.status(200).json({ 
      success: true, 
      imageUrl,
      message: 'Profile image uploaded successfully' 
    });

  } catch (error) {
    console.error('Error uploading profile image:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error uploading profile image',
      error: error.message 
    });
  }
};