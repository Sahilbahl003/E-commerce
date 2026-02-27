const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    rating:{
        type:Number
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
