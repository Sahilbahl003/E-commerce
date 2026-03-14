const Cart = require("../models/Cart");

exports.addToCartService = async (userId, productId, quantity) => {

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [{ product: productId, quantity }]
    });

    return cart;
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {

    cart.items[itemIndex].quantity += quantity;

  } else {

    cart.items.push({
      product: productId,
      quantity
    });

  }

  await cart.save();

  return cart;

};


exports.getCartService = async (userId) => {

  const cart = await Cart.findOne({ user: userId })
    .populate("items.product");

  return cart;

};


exports.updateQuantityService = async (userId, productId, quantity) => {

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find(
    (i) => i.product.toString() === productId
  );

  if (!item) {
    throw new Error("Item not found in cart");
  }

  item.quantity = quantity;

  await cart.save();

  return cart;

};


exports.removeCartItemService = async (userId, productId) => {

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();

  return cart;

};


exports.mergeCartService = async (userId, guestCart) => {

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: []
    });
  }

  guestCart.forEach((guestItem) => {

    const index = cart.items.findIndex(
      (item) =>
        item.product.toString() === guestItem.productId
    );

    if (index > -1) {

      cart.items[index].quantity += guestItem.quantity;

    } else {

      cart.items.push({
        product: guestItem.productId,
        quantity: guestItem.quantity
      });

    }

  });

  await cart.save();

  return cart;

};