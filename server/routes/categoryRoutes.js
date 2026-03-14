const express = require("express");
const router = express.Router();


const {auth} = require("../middlewares/Auth");
const upload = require("../config/multer");
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory, getCategoryById } = require("../controllers/categoryControllers");

router.post("/categories", auth, upload.single("image"), createCategory);

router.get("/categories", getCategories);

router.get("/categories/:id", getCategory);

router.put(
  "/categories/:id",
  auth,
  upload.single("image"),
  updateCategory
);

//router.get("/category/:id", getCategoryById);


router.delete("/categories/:id", auth, deleteCategory);

module.exports = router;