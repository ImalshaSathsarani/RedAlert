const jwt = require("jsonwebtoken");
const { signupSchema, signinSchema } = require("../middlewares/validator");
const Hospital = require("../models/hospital");
const { doHash, doHashValidation } = require("../utils/hashing");
const bcrypt = require("bcryptjs");
const { changePasswordSchema } = require("../middlewares/validator");

/*exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error, value } = signupSchema.validate({ email, password });

    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await doHash(password, 12);

    const newUser = new User({
      email,
      password: hashedPassword,
    });
    const result = await newUser.save();
    result.password = undefined;
    res.status(201).json({
      success: true,
      message: "Your account has been created successfully",
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error, value } = signinSchema({ email, password });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email }).select("+passowrd");
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User does not exists!" });
    }
    const result = await doHashValidation(password, existingUser.password);
    if (!result) {
      return res
        .status(401)
        .json({ success: false, message: "invaild credentials" });
    }
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        verified: existingUser.verified,
      },
      process.env.TOKEN_SECRET
    );

    res
      .cookie("Authorization", "Bearer" + token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        token,
        message: "logged in successfully",
      });
  } catch (error) {
    console.log(error);
  }
};*/

exports.signup = async (req, res) => {
  const {
    hospitalName,
    type,
    registrationNumber,
    district,
    address,
    name,
    phone,
    designation,
    email,
    password,
  } = req.body;

  const registrationDocument = req.files?.registrationDocument?.[0]?.path;
  const officeLetter = req.files?.officeLetter?.[0]?.path;

  try {
    const { error } = signupSchema.validate({ email, password });
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    const existing = await Hospital.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Hospital already registered" });
    }

    const hashedPassword = await doHash(password, 12);

    const newHospital = new Hospital({
      hospitalName,
      type,
      registrationNumber,
      district,
      address,
      name,
      phone,
      designation,
      email,
      password: hashedPassword,
      registrationDocument,
      officeLetter,
    });

    const result = await newHospital.save();
    result.password = undefined;

    res.status(201).json({
      success: true,
      message: "Hospital registration request send successfully",
      result,
      hospitalId: result._id,
    });

    // 5. Generate JWT token (same structure as signin)
    // const token = jwt.sign(
    //   { id: result._id, email: result.email, role: "hospital" },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1d" }
    // );

    // res.cookie('token', token,{
    //   httpOnly: true,
    //   secure: false, // Set to true in production with HTTPS
    //   sameSite: 'Lax',
    //   maxAge: 24 * 60 * 60 * 1000, // 1 day
    // });

    //   // 7. Response
    // res.status(201).json({
    //   success: true,
    //   message: "Hospital registered successfully",
    //   token, // optional (you already stored cookie)
    //   hospital: {
    //     id: result._id,
    //     hospitalName: result.hospitalName,
    //     email: result.email,
    //     isApproved: result.isApproved,
    //   },
    // });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/*exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error } = signinSchema.validate({ email, password });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }

    const hospital = await Hospital.findOne({ email }).select("+password");
    if (!hospital) {
      return res
        .status(401)
        .json({ success: false, message: "Hospital not found" });
    }

    const valid = await doHashValidation(password, hospital.password);
    if (!valid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { hospitalId: hospital._id, email: hospital.email },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res
      .cookie("Authorization", "Bearer " + token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({
        success: true,
        token,
        message: "Logged in successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};*/

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find hospital by email
    const hospital = await Hospital.findOne({ email });
    if (!hospital) {
      return res
        .status(404)
        .json({ success: false, message: "Hospital not found" });
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, hospital.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

     // 3. Check if hospital is approved
    if (!hospital.isApproved) {
      return res.status(403).json({
        success: false,
        message: "Your account is not approved yet. Please wait for admin approval.",
      });
    }

    // 4. Check if hospital is inactive
    if (hospital.status === "inactive") {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive. Please contact the administrator."
      });
    }

    // 5. Generate token
    const token = jwt.sign(
      { id: hospital._id, email: hospital.email, role: "hospital" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 6. Set token in HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      hospital: {
        id: hospital._id,
        hospitalName: hospital.hospitalName,
        email: hospital.email,
        isApproved: hospital.isApproved,
        status: hospital.status
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.signout = async (req, res) => {
  res
    .clearCookie("Authorization")
    .status(200)
    .json({ success: true, message: "logged out successfully" });
};

exports.changePassword = async (req, res) => {
  const { id } = req.user;
  const { oldPassword, newPassword } = req.body;
  try {
    const { error } = changePasswordSchema.validate({
      oldPassword,
      newPassword,
    });
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
    const hospital = await Hospital.findById(id).select("+password");
    if (!hospital) {
      return res
        .status(404)
        .json({ success: false, message: "Hospital not found" });
    }
    const isMatch = await bcrypt.compare(oldPassword, hospital.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invaild current password!" });
    }
    const hashed = await bcrypt.hash(newPassword, 12);
    hospital.password = hashed;
    await hospital.save();
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Change Password Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
