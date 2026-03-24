import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { useState } from "react";

const Cart = () => {

  const { cart, increaseQty, decreaseQty, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
   const [modalMessage, setModalMessage] = useState("");

  const handleCheckout = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    setModalMessage("Please login first");
    setShowModal(true);
    return;
  }

  navigate("/checkout");
};

  return (
    <div className="max-w-[1300px] mx-auto mt-8 p-6">

      <h2 className="text-3xl font-bold mb-8 text-center">
        Shopping Cart
      </h2>

      {cart.length === 0 ? (

        <div className="flex flex-col items-center">
          <div className="text-lg text-gray-500">
            Your cart is empty
          </div>

          <button
            className="text-blue-500 border border-blue-500 px-4 py-2 mt-3 cursor-pointer"
            onClick={() => navigate("/product")}
          >
            Continue Shopping
          </button>
        </div>

      ) : (

        //  FIXED LAYOUT
        <div className="flex gap-8 items-start">

          {/* 🟦 LEFT SIDE (Cart Items) */}
          <div className="flex-1 border rounded-lg overflow-hidden shadow">

            {/* Header */}
            <div className="grid grid-cols-5 bg-gray-100 font-semibold p-3 text-center">
              <div>Product</div>
              <div>Name</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Action</div>
            </div>

            {/* Items */}
            {cart.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-5 items-center p-3 border-t text-center"
              >

                <div className="flex justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                  />
                </div>

                <div className="font-medium">
                  {item.title}
                </div>

                <div>₹ {item.price}</div>

                <div className="flex items-center justify-center gap-3">

                  <button
                    onClick={() => decreaseQty(item._id)}
                    className="w-8 h-8 bg-gray-200 rounded-full cursor-pointer"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item._id)}
                    className="w-8 h-8 bg-gray-200 rounded-full cursor-pointer"
                  >
                    +
                  </button>

                </div>

                <div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

          </div>

          {/* RIGHT SIDE (Order Summary) */}
          <div className="w-[350px] flex flex-col  sticky top-[100px]">

            <OrderSummary showPaymentMethods={false} />
            <button
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-blue-500 hover:bg-blue-600 py-3 rounded-md transition text-white cursor-pointer">
                  Check Out
            </button>

          </div>

        </div>

      )}

      {showModal && (
              <ConfirmModal
                title="Login to Complete your Shopping"
                message=""
                cancelText="Login"
                hideConfirm={true}
                onCancel={() =>{ setShowModal(false); navigate("/login")}}
              />
      )}

    </div>
  );
};

export default Cart;