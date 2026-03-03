const  cloudinary  = require("../config/cloudinary");
const User = require("../models/User");


exports.getUser=async(req,res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        if(!user)
        {
            return res.status(404).json({
               success:false,
               message:"User not found"
            })
        }

        res.status(200).json({
            success:true,
            user
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error fetching user"
        })
    }
};

exports.updateProfileFull = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let imageUrl = user.profileImage;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "profiles" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    if (name) {
      user.name = name;
    }

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: "Current password required",
        });
      }

      const isMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      const hashed = await bcrypt.hash(newPassword, 10);
      user.password = hashed;
      user.confirmPassword = hashed;
    }

    user.profileImage = imageUrl;

    await user.save();

    const safeUser = await User.findById(userId).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: safeUser,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Profile update failed",
      error: error.message,
    });
  }
};

exports.removeProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.profileImage = "";
    await user.save();

    const safeUser = await User.findById(userId).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile image removed",
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to remove image",
      error: error.message,
    });
  }
};