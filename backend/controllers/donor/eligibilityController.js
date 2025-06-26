const Eligibility = require('../../models/Eligibility');

// Helper function to check eligibility criteria
const checkEligibility = (eligibilityData) => {
  // Basic eligibility criteria
  const MIN_WEIGHT = 50; // kg
  const MIN_AGE = 18;
  const MAX_AGE = 65;
  const MIN_DAYS_BETWEEN_DONATIONS = 90; // 3 months

  // Check weight
  if (eligibilityData.weight < MIN_WEIGHT) {
    return false;
  }

  // Check age
  if (eligibilityData.age < MIN_AGE || eligibilityData.age > MAX_AGE) {
    return false;
  }

  // Check last donation date if provided
  if (eligibilityData.lastDonationDate) {
    const daysSinceLastDonation = Math.floor(
      (Date.now() - eligibilityData.lastDonationDate) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceLastDonation < MIN_DAYS_BETWEEN_DONATIONS) {
      return false;
    }
  }

  // Check medical conditions
  if (eligibilityData.chronicIllness || 
      eligibilityData.onMedication || 
      eligibilityData.recentIllness || 
      eligibilityData.recentSurgery || 
      eligibilityData.knownAllergies) {
    return false;
  }

  return true;
};

// Create new eligibility check
exports.createEligibilityCheck = async (req, res) => {
  try {
    const eligibilityData = req.body;
    
    // Validate required fields
    if (!eligibilityData.weight || !eligibilityData.age || !eligibilityData.gender) {
      return res.status(400).json({ message: 'Weight, age, and gender are required' });
    }

    // Check eligibility
    const isEligible = checkEligibility(eligibilityData);
    eligibilityData.isEligible = isEligible;

    // Create new eligibility record
    const eligibility = new Eligibility(eligibilityData);
    await eligibility.save();

    res.status(201).json({
      message: 'Eligibility check created successfully',
      eligibility: {
        ...eligibilityData,
        isEligible,
        id: eligibility._id
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error checking eligibility', error: error.message });
  }
};

// Get eligibility check by ID
exports.getEligibilityCheck = async (req, res) => {
  try {
    const eligibility = await Eligibility.findById(req.params.id);
    if (!eligibility) {
      return res.status(404).json({ message: 'Eligibility check not found' });
    }
    res.json(eligibility);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching eligibility check', error: error.message });
  }
};
