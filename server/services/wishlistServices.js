const Wishlist = require("../models/Wishlist");

exports.toggleWishlistService = async (userId, productId) => {

  let wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {

    wishlist = await Wishlist.create({
      user: userId,
      products: [productId]
    });

    return {
      message: "Product added to wishlist"
    };
  }

  const exists = wishlist.products.some(
    (id) => id.toString() === productId.toString()
  );

  if (exists) {

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId.toString()
    );

    await wishlist.save();

    return { message: "Product removed from wishlist" };

  }

  wishlist.products.push(productId);

  await wishlist.save();

  return { message: "Product added to wishlist" };

};


exports.getWishlistService = async (userId) => {

  const wishlist = await Wishlist
    .findOne({ user: userId })
    .populate("products");

  if (!wishlist) {
    return { products: [] };
  }

  return { products: wishlist.products };

};