const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const { auth } = require("../middlewares/Auth.js");
const isAdmin = require("../middlewares/isAdmin");


router.get("/stats", auth, isAdmin, async (req, res) => {

  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();

  res.json({
    totalUsers,
    totalProducts,
    totalOrders
  });

});


router.get("/users", auth, isAdmin, async (req, res) => {

  const users = await User.find();

  res.json(users);

});


router.delete("/user/:id", auth, isAdmin, async (req, res) => {

  await User.findByIdAndDelete(req.params.id);

  res.json({
    message: "User deleted"
  });

});


router.get("/products", auth, isAdmin, async (req, res) => {

  const products = await Product.find();

  res.json(products);

});


router.post("/product", auth, isAdmin, async (req, res) => {

  const product = await Product.create(req.body);

  res.json(product);

});


router.put("/product/:id", auth, isAdmin, async (req, res) => {

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(product);

});


router.delete("/product/:id", auth, isAdmin, async (req, res) => {

  await Product.findByIdAndDelete(req.params.id);

  res.json({
    message: "Product deleted"
  });

});


router.get("/orders", auth, isAdmin, async (req, res) => {

  const orders = await Order.find()
    .populate("user")
    .populate("products.product");

  res.json(orders);

});


router.put("/order/:id", auth, isAdmin, async (req, res) => {

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(order);

});

module.exports = router;