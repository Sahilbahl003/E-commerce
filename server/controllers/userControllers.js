const userService = require("../services/userServices");

exports.getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProfileFull = async (req, res) => {
  try {
    const user = await userService.updateProfileFull(
      req.user.id,
      req.body,
      req.file
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    if (
      error.message === "Current password required" ||
      error.message === "Current password is incorrect"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Profile update failed",
      error: error.message,
    });
  }
};

exports.removeProfileImage = async (req, res) => {
  try {
    const user = await userService.removeProfileImage(req.user.id);

    res.status(200).json({
      success: true,
      message: "Profile image removed",
      user,
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};