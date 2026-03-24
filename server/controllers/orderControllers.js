const orderService = require("../services/orderServices");

const {
  createStripeCheckoutSession
} = require("../services/orderServices");

exports.createOrder = async (req, res) => {
  try {

    const { paymentMethod } = req.body;

    const order = await orderService.createOrder(req.body, req.user.id);

    // COD - directly place order
    if (paymentMethod === "cod") {

      return res.status(201).json({
        success: true,
        message: "Order placed successfully",
        order
      });

    }

    // UPI or Card - open Stripe Checkout
    if (paymentMethod === "upi" || paymentMethod === "card") {

      const session = await createStripeCheckoutSession(order);

      return res.status(200).json({
        success: true,
        checkoutUrl: session.url,
        orderId: order._id
      });

    }

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};


exports.getMyOrders = async (req, res) => {
  try {

    const orders = await orderService.getUserOrders(req.user.id);

    res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


exports.getOrder = async (req, res) => {
  try {

    const order = await orderService.getOrderById(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      order
    });

  } catch (error) {

    res.status(404).json({
      success: false,
      message: error.message
    });

  }
};


