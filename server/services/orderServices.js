const Order = require("../models/Order");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createOrder = async (data, userId) => {

  const {
    items,
    shippingAddress,
    paymentMethod,
    subtotal,
    shippingFee,
    tax,
    total,
    status
  } = data;

  if (!items || items.length === 0) {
    throw new Error("No items in order");
  }

  const order = await Order.create({
    user: userId,
    items,
    shippingAddress,
    paymentMethod,
    subtotal,
    shippingFee,
    tax,
    total,
    status
  });

  return order;
};


exports.getUserOrders = async (userId) => {
  const orders = await Order.find({ user: userId })
    .populate("user", "_id email")           
    .populate("items.product", "title image")
    .sort({ createdAt: -1 });

  return orders;
};


exports.getOrderById = async (id, userId) => {

  const order = await Order.findById(id)
    .populate("items.product", "title image");

  if (!order) throw new Error("Order not found");

  return order;
};

exports.createStripeCheckoutSession = async (order) => {

  const session = await stripe.checkout.sessions.create({

    payment_method_types: ["card", "upi"],

    mode: "payment",

    line_items: order.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),

    success_url: `${process.env.CLIENT_URL}/success?orderId=${order._id}`,
    cancel_url: `${process.env.CLIENT_URL}/checkout`,
  });

  return session;
};


