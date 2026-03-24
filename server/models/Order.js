const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  title: String,
  price: Number,
  quantity: Number,
  image: String
});

const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [orderItemSchema],

  shippingAddress: {
    name: String,
    address: String,
    city: String,
    phone: String
  },

  paymentMethod: {
    type: String,
    enum: ["upi", "card", "cod"],
    default: "cod"
  },

  subtotal: Number,
  shippingFee: Number,
  tax: Number,
  total: Number,

  status: {
    type: String,
    enum: ["pending", "cancelled","delivered"],
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);