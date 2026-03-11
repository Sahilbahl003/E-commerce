const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Otp = require("../models/Otp");
const sendMail = require("../utils/sendMail");
const { registerSchema } = require("../validators/authValidator");
const { validateLogin } = require("../utils/validation");

const { throwError, throwNotFoundError } = require("../utils/errors");

exports.register = async (data) => {
  const parsed = registerSchema.safeParse(data);

  if (!parsed.success) {
    throwError("VALIDATION_ERROR");
  }

  const { name, email, password } = parsed.data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throwError("DUPLICATE_EMAIL");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
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

  return { user, token };
};

exports.login = async (data) => {
  const errors = validateLogin(data);

  if (Object.keys(errors).length > 0) {
    throwError("VALIDATION_ERROR");
  }

  const { email, password } = data;

  const user = await User.findOne({ email });

  if (!user) {
    throwNotFoundError("User");
  }

  if (!user.isActive) {
    throwError("FORBIDDEN");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throwError("BAD_REQUEST");
  }

  const payload = {
    email: user.email,
    role: user.role,
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "5h",
  });

  return { user, token };
};

exports.sendRegisterOtp = async ({ name, email, password }) => {
  const exists = await User.findOne({ email });

  if (exists) {
    throwError("DUPLICATE_EMAIL");
  }

  const existingOtp = await Otp.findOne({ email });

  if (existingOtp) {
    const diff = Date.now() - existingOtp.createdAt.getTime();

    if (diff < 60000) {
      throwError("BAD_REQUEST");
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

  return true;
};

exports.verifyRegisterOtp = async ({ email, otp }) => {
  const record = await Otp.findOne({ email, otp });

  if (!record) {
    throwError("BAD_REQUEST");
  }

  const { name, password } = record.userData;

  await User.create({
    name,
    email,
    password,
    isEmailVerified: true,
  });

  await Otp.deleteMany({ email });

  return true;
};

exports.sendOtp = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throwNotFoundError("User");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = otp;
  user.otpExpire = Date.now() + 15 * 60 * 1000;
  user.isOtpVerified = false;

  await user.save();

  await sendMail(email, otp, "Reset Your Password - Ecomzy");

  return true;
};

exports.verifyOtp = async ({ email, otp }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throwNotFoundError("User");
  }

  if (user.otp !== otp) {
    throwError("BAD_REQUEST");
  }

  if (user.otpExpire < Date.now()) {
    throwError("TOKEN_EXPIRED");
  }

  user.isOtpVerified = true;

  await user.save();

  return true;
};

exports.resetPassword = async ({ email, newPassword }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throwNotFoundError("User");
  }

  if (!user.isOtpVerified) {
    throwError("FORBIDDEN");
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  user.password = hashed;
  user.otp = null;
  user.otpExpire = null;
  user.isOtpVerified = false;

  await user.save();

  return true;
};

exports.changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);

  if (!user) {
    throwNotFoundError("User");
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    throwError("BAD_REQUEST");
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  user.password = hashed;

  await user.save();

  return true;
};