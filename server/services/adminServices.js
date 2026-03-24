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

  const revenueData = await Order.aggregate([    
       { $group: 
         {   _id: null,        
          totalRevenue: { $sum: "$total" }     
         }    
        }  ]);

  const totalRevenue = revenueData[0]?.totalRevenue || 0;
  return {    
         users: totalUsers,    
         products: totalProducts,    
         orders: totalOrders,    
         categories: totalCategories,    
         revenue: totalRevenue  
        };
};

exports.getAllUsers = async (page, limit) => {

  const skip = (page - 1) * limit;
  
  const totalUsers = await User.countDocuments();

  const users = await User.find({ role: "user" }).select("-password").skip(skip)
    .limit(limit);

  const totalPages = Math.ceil(totalUsers / limit);

  return {
    users,
    totalPages
  }
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

exports.getAllOrders = async (page = 1, limit = 5) => {

  const skip = (page - 1) * limit;

  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalOrders = await Order.countDocuments();

  const totalPages = Math.ceil(totalOrders / limit);

  return {
    orders,
    totalPages
  };
};

exports.updateOrderStatus = async (id, status) => {
  const order = await Order.findById(id);

  if (!order) {
    throwNotFoundError("Order");
  }

  order.status = status;
  await order.save();

  
  await order.populate("user", "email");

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