const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

const { auth } = require("../middlewares/auth");


// Create Product
router.post("/createProduct", auth, createProduct);

// Get All Products
router.get("/getAll", getAllProducts);

// Get Product By Id
router.get("/getAll/:id", getProductById);

// Update Product
router.put("/getAll/:id", auth, updateProduct);

// Delete Product
router.delete("/delete/:id", auth, deleteProduct);

module.exports = router;
