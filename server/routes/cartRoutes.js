const express = require("express");
const router = express.Router();


const {auth} = require("../middlewares/Auth");
const { addToCart, getCart, updateQuantity, removeItem, mergeCart } = require("../controllers/cartControllers");


// Add item to cart
router.post("/cart/add", auth, addToCart);

// Get logged in user's cart
router.get("/cart", auth, getCart);

// Update item quantity
router.put("/cart/update", auth, updateQuantity);

// Remove item from cart
router.delete("/cart/:id", auth, removeItem);

// Merge guest cart after login
router.post("/cart/merge", auth, mergeCart);


module.exports = router;