const express = require("express");

const {isAdmin} = require("../middlewares/isAdmin");
const {auth} = require("../middlewares/Auth");

const {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllProductsAdmin,
  deleteProductAdmin,
  getAllOrders,
  updateOrderStatus,
  toggleUserStatus
} = require("../controllers/adminControllers");

const router = express.Router();

router.get("/dashboard", auth, isAdmin, getDashboardStats);

router.get("/users", auth, isAdmin, getAllUsers);

router.put("/users/:id/toggle-status", auth, isAdmin, toggleUserStatus);

router.delete("/users/:id", auth, isAdmin, deleteUser);

router.get("/products", auth, isAdmin, getAllProductsAdmin);

router.delete("/products/:id", auth, isAdmin, deleteProductAdmin);

router.get("/orders", auth, isAdmin, getAllOrders);

router.put("/orders/:id", auth, isAdmin, updateOrderStatus);

module.exports = router;