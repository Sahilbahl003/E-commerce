const cloudinary = require("../config/cloudinary");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { throwError, throwNotFoundError } = require("../utils/errors");

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "profiles" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(file.buffer);
  });
};

exports.getUser = async (userId) => {
  const newUser = await User.findById(userId).select("-password");

  if (!newUser) {
    throwNotFoundError("User");
  }

  return newUser;
};

exports.updateProfileFull = async (userId, data, file) => {
  const { name, currentPassword, newPassword } = data;

  const user = await User.findById(userId);

  if (!user) {
    throwNotFoundError("User");
  }

  let imageUrl = user.profileImage;

  if (file) {
    const result = await uploadToCloudinary(file);
    imageUrl = result.secure_url;
  }

  if (name) {
    user.name = name;
  }

  if (newPassword) {
    if (!currentPassword) {
      throwError("BAD_REQUEST");
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      throwError("BAD_REQUEST");
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
  }

  user.profileImage = imageUrl;

  await user.save();

  const safeUser = await User.findById(userId).select("-password");

  return safeUser;
};

exports.removeProfileImage = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throwNotFoundError("User");
  }

  if (user.profileImage) {

    const publicId = user.profileImage.split("/").slice(-1)[0].split(".")[0];
    await cloudinary.uploader.destroy(`profiles/${publicId}`);
  }

  user.profileImage = "";
  await user.save();

  return await User.findById(userId).select("-password");
};