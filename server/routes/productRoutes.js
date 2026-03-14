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
  searchProducts,
} = require("../controllers/productControllers");


// Create Product
router.post(
  "/products",
  auth,
  upload.single("image"),
  createProduct
);

//router.get("/products/search", searchProducts);

router.get("/products", getAllProducts);

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

router.get("/search", searchProducts);

module.exports = router;