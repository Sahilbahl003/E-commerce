const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const { auth } = require("../middlewares/Auth");
const { isAdmin } = require("../middlewares/isAdmin"); // ✅ added

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require("../controllers/productControllers");


// CREATE PRODUCT (ADMIN ONLY)
router.post(
  "/products",
  auth,
  isAdmin,
  upload.single("image"),
  createProduct
);

// GET ALL PRODUCTS (PUBLIC)
router.get("/products", getAllProducts);

//  GET SINGLE PRODUCT (PUBLIC)
router.get("/products/:id", getProductById);

//  UPDATE PRODUCT (ADMIN ONLY)
router.put(
  "/products/:id",
  auth,
  isAdmin,
  upload.single("image"),
  updateProduct
);

//  DELETE PRODUCT (ADMIN ONLY)
router.delete(
  "/products/:id",
  auth,
  isAdmin,
  deleteProduct
);

//  SEARCH (PUBLIC)
router.get("/search", searchProducts);

module.exports = router;