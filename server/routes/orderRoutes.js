const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/Auth");

const {
  createOrder,
  getMyOrders,
  getOrder
} = require("../controllers/orderControllers");

// CREATE ORDER
router.post("/orders", auth, createOrder);

// GET USER ORDERS
router.get("/orders", auth, getMyOrders);

// GET SINGLE ORDER
router.get("/orders/:id", auth, getOrder);

module.exports = router;