const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const {auth} = require("../middlewares/Auth");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");


// Create Product
router.post(
  "/products",
  auth,
  upload.single("image"),
  createProduct
);


// Get All Products
router.get("/products", getAllProducts);


// Get Product By Id
router.get("/products/:id", getProductById);


// Update Product
router.put(
  "/products/:id",
  auth,
  upload.single("image"),   // allows updating image
  updateProduct
);


// Delete Product
router.delete(
  "/products/:id",
  auth,
  deleteProduct
);

module.exports = router;