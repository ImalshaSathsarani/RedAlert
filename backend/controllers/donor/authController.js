const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const emailService = require('../../utils/emailService');
const bcrypt =require('bcryptjs');


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.changePassword = async (req, res) => {
  console.log('Received change password request');
  console.log('User ID:', req.user.id);
  console.log('Current Password:', req.body.currentPassword);
  console.log('New Password:', req.body.newPassword);

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
    if (!isMatch) {
      console.error('Invalid current password');
      return res.status(400).json({ message: 'Invalid current password' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    console.log('Password changed successfully for user:', user._id);
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Error changing password', error: error.message });
  }
};

exports.registerUser = async (req, res) => {
  const { name, email, password, confirmPassword, mobileNo, bloodType } = req.body;

  // Validate required fields
  if (!name || !email || !password || !confirmPassword || !mobileNo || !bloodType) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Validate password match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ 
      name, 
      email, 
      password, 
      mobileNo,
      bloodType,
      medicalHistory: {
        illness: null,
        illnessStatus: null,
        smoking: null,
        alcohol: null,
        vaccinationStatus: null,
        vaccineType: '',
        doseCount: 0,
        lastVaccinationDate: null
      }
    });
    
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobileNo: user.mobileNo,
        bloodType: user.bloodType,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  console.log("requested");
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'No user with that email' });

    const token = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;
    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    await emailService(
      user.email,
      'Password Reset Request',
      `Click the link to reset your password: ${resetLink}`
    );

    res.json({ msg: 'Reset link sent to email' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const { userId } = req.user;

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Check if current password is correct
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) return res.status(400).json({ msg: 'Current password is incorrect' });

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ msg: 'New password and confirm password do not match' });
    }

    // Check password strength (optional)
    if (newPassword.length < 6) {
      return res.status(400).json({ msg: 'Password must be at least 6 characters' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Save the user
    await user.save();

    res.json({ msg: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Keep the existing resetPassword endpoint
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ msg: 'Invalid or expired token' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({ msg: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

