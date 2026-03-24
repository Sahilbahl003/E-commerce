import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const OrderSummary = ({
  paymentMethod,
  setPaymentMethod,
  showPaymentMethods = false
}) => {

  const { cart } = useContext(CartContext);

  // subtotal
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingFee = subtotal > 0 ? 100 : 0;
  const tax = subtotal * 0.05;

  const total = subtotal + shippingFee + tax;

  return (

    <div className="w-full max-w-md mx-auto shadow-lg rounded-lg p-6 bg-white">

      {/* Title */}
      <h2 className="text-xl font-semibold mb-4">
        Order Summary
      </h2>

      {/* Products */}
      <div className="space-y-3 border-b pb-4">

        {cart.map((item) => (
          <div key={item._id} className="flex justify-between text-sm">

            <p className="text-gray-700">
              {item.title} (x{item.quantity})
            </p>

            <p className="font-medium">
              ₹{item.price * item.quantity}
            </p>

          </div>
        ))}

      </div>

      {/* Pricing */}
      <div className="mt-4 space-y-2 text-sm">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span>₹{shippingFee.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax (5%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>

      </div>

      {/* Total */}
      <div className="flex justify-between font-semibold text-lg mt-4 border-t pt-4">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

      {/* Payment Method (only on checkout page) */}
      {showPaymentMethods && (
        <div className="mt-6">

          <h3 className="font-medium mb-2">
            Payment Method
          </h3>

          <div className="flex items-center gap-4">

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              UPI
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Card
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>

          </div>

        </div>
      )}

    </div>
  );
};

export default OrderSummary;