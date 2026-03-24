const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/Auth");
const { isAdmin } = require("../middlewares/isAdmin"); // ✅ important
const upload = require("../config/multer");

const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryControllers");


// CREATE CATEGORY (ADMIN ONLY)
router.post(
  "/categories",
  auth,
  isAdmin,
  upload.single("image"),
  createCategory
);

//  GET ALL (PUBLIC)
router.get("/categories", getCategories);

// GET ONE (PUBLIC)
router.get("/categories/:id", getCategory);

// UPDATE CATEGORY (ADMIN ONLY)
router.put(
  "/categories/:id",
  auth,
  isAdmin,
  upload.single("image"),
  updateCategory
);

//  DELETE CATEGORY (ADMIN ONLY)
router.delete(
  "/categories/:id",
  auth,
  isAdmin,
  deleteCategory
);

module.exports = router;