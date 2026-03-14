import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const Cart = () => {

  const { cart, increaseQty, decreaseQty, removeFromCart } = useContext(CartContext);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-[1100px] mx-auto mt-28 p-6">

      <h2 className="text-3xl font-bold mb-8 text-center">Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          Your cart is empty
        </div>
      ) : (
        <>
          <div className="border rounded-lg overflow-hidden shadow">

            {/* Header */}
            <div className="grid grid-cols-5 bg-gray-100 font-semibold p-4 text-center">
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
                className="grid grid-cols-5 items-center p-4 border-t text-center"
              >

                <div className="flex justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                  />
                </div>

                <div className="font-medium">{item.title}</div>

                <div>₹ {item.price}</div>

                <div className="flex items-center justify-center gap-3">

                  <button
                    onClick={() => decreaseQty(item._id)}
                    className="w-8 h-8 bg-gray-200 rounded-full text-lg"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item._id)}
                    className="w-8 h-8 bg-gray-200 rounded-full text-lg"
                  >
                    +
                  </button>

                </div>

                <div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>

              </div>

            ))}

          </div>

          <div className="flex justify-end mt-6">

            <div className="text-xl font-bold">
              Total : ₹ {total}
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default Cart;