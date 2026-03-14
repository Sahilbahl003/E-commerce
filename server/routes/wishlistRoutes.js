const express = require("express");

const router = express.Router();

const {
  toggleWishlist,
  getWishlist
} = require("../controllers/wishlistControllers");

const { auth } = require("../middlewares/Auth");

router.post("/wishlist/toggle", auth, toggleWishlist);

router.get("/wishlist", auth, getWishlist);

module.exports = router;