const jwt = require('jsonwebtoken');
const User = require("../models/User.js");
const bcrypt = require('bcrypt');
const { validateLogin } = require("../utils/validation");
const { registerSchema } = require("../validators/authValidator");
const { formatZodErrors } = require("../utils/zodErrorFormatter");
const Otp = require("../models/Otp");
const sendMail = require("../utils/sendMail");


exports.register = async (req, res) => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        errors: formatZodErrors(parsed.error),
      });
    }

    const { name, email, password } = parsed.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        errors: { email: "User already exists" },
      });
    }

    

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email:email,
      password: hashedPassword,
      role: "user",
    });

    const payload = {
      email: user.email,
      role: user.role,
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    return res.status(200).json({
      message: "Registered Successfully",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validateLogin(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        errors: { email: "User not exist" },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        errors: { password: "Password Incorrect" },
      });
    }

    const payload = {
      email: user.email,
      role: user.role,
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    return res.status(200).json({
      success: true,
      message: "User Login Successfully",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      
      error: error.message,
    });
  }
};


exports.sendRegisterOtp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const existingOtp = await Otp.findOne({ email });

    if (existingOtp) {
      const diff = Date.now() - existingOtp.createdAt.getTime();
      if (diff < 60000) {
        return res.status(429).json({
          msg: "Wait 60 seconds before requesting new OTP",
        });
      }
      await Otp.deleteMany({ email });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashed = await bcrypt.hash(password, 10);

    await Otp.create({
      email,
      otp,
      userData: { name, email, password: hashed },
    });

    await sendMail(email, otp, "Verify Your Email - Ecomzy");

    res.json({ msg: "OTP sent to email" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error sending OTP" });
  }
};

exports.verifyRegisterOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email, otp });

    if (!record) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    const { name, password } = record.userData;

    await User.create({
      name,
      email,
      password,
      isEmailVerified: true,
    });

    await Otp.deleteMany({ email });

    res.json({ msg: "Account created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Verification failed" });
  }
};

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpire = Date.now() + 15 * 60 * 1000;
    user.isOtpVerified = false;

    await user.save();
    await sendMail(email, otp, "Reset Your Password - Blog App");

    res.json({ msg: "OTP sent successfully" });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.otp !== otp)
      return res.status(400).json({ msg: "Invalid OTP" });

    if (user.otpExpire < Date.now())
      return res.status(400).json({ msg: "OTP expired" });

    user.isOtpVerified = true;
    await user.save();

    res.json({ msg: "OTP verified successfully" });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (!user.isOtpVerified)
      return res.status(403).json({ msg: "Verify OTP first" });

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    user.otp = null;
    user.otpExpire = null;
    user.isOtpVerified = false;

    await user.save();

    res.json({ msg: "Password updated successfully" });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};
