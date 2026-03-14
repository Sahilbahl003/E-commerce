const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    profileImage: {
      type: String,
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },

  
    isActive: {
      type: Boolean,
      default: true,
    },

    cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart"
},

    otp: {
      type: String,
    },

    otpExpire: {
      type: Date,
    },

    isOtpVerified: {
      type: Boolean,
      default: false,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    otpLastSentAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);