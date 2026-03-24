const { addToCartService, getCartService, updateQuantityService, removeCartItemService, mergeCartService } = require("../services/cartServices");

exports.addToCart = async (req, res) => {

  try {

    //  BLOCK ADMIN
    if (req.user.role === "admin") {
      return res.status(403).json({
        success: false,
      });
    }

    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const cart = await addToCartService(userId, productId, quantity);

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.getCart = async (req, res) => {

  try {

    const userId = req.user.id;

    const cart = await getCartService(userId);

    res.status(200).json({
      success: true,
      cart
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.updateQuantity = async (req, res) => {

  try {

    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const cart = await updateQuantityService(userId, productId, quantity);

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cart
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.removeItem = async (req, res) => {

  try {

    const userId = req.user.id;
    const productId = req.params.id;

    const cart = await removeCartItemService(userId, productId);

    res.status(200).json({
      success: true,
      message: "Item removed",
      cart
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.mergeCart = async (req, res) => {

  try {

    const userId = req.user.id;
    const guestCart = req.body.items;

    const cart = await mergeCartService(userId, guestCart);

    res.status(200).json({
      success: true,
      message: "Cart merged",
      cart
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};