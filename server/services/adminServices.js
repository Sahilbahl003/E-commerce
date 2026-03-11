const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Category = require("../models/Category");
const { throwNotFoundError, throwError } = require("../utils/errors");

exports.getDashboardStats = async () => {
  const totalUsers = await User.countDocuments({ role: "user" });
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalCategories = await Category.countDocuments();
  const totalRevenue = 0;

  return {
    users: totalUsers,
    products: totalProducts,
    orders: totalOrders,
    categories: totalCategories,
    revenue: totalRevenue[0]?.revenue || 0
  };
};

exports.getAllUsers = async () => {
  return await User.find({ role: "user" }).select("-password");
};

exports.deleteUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throwNotFoundError("User");
  }

  await User.findByIdAndDelete(id);
};

exports.getAllProductsAdmin = async () => {
  return await Product.find().populate("seller", "name email");
};

exports.deleteProductAdmin = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throwNotFoundError("Product");
  }

  await Product.findByIdAndDelete(id);
};

exports.getAllOrders = async () => {
  return await Order.find().populate("user", "name email");
};

exports.updateOrderStatus = async (id, status) => {
  const order = await Order.findById(id);

  if (!order) {
    throwNotFoundError("Order");
  }

  order.status = status;
  await order.save();
  return order;
};

exports.toggleUserStatus = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throwNotFoundError("User");
  }

  if (user.role === "admin") {
    throwError("FORBIDDEN");
  }

  user.isActive = !user.isActive;

  await user.save();

  return user;
};