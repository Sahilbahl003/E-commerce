import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderByIdService } from "../../services/order.service";

const OrderDetails = () => {

  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await getOrderByIdService(id);
      if (res.success) setOrder(res.order);
    } catch (error) {
      console.log(error);
    }
  };

  if (!order) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Loading order...
      </div>
    );
  }

  return (

    <div className="max-w-[1100px] mx-auto mt-10 mb-16 px-4">

      {/* ORDER HEADER */}
      <div className="border p-5 rounded-lg bg-green-50 mb-6">

        <h2 className="text-2xl font-semibold text-green-700">
          Order Placed Successfully 
        </h2>

        <p className="text-gray-600 mt-1">
          Order ID: <span className="font-medium">{order._id}</span>
        </p>

        <p className="text-gray-600">
          Payment Method: <span className="font-medium">{order.paymentMethod}</span>
        </p>

        <p className="text-gray-600">
          Status: <span className="text-green-600 font-medium">{order.status}</span>
        </p>

      </div>


      {/* PRODUCTS */}
      <div className="border rounded-lg p-5 mb-6">

        <h3 className="text-xl font-semibold mb-4">
          Items in your order
        </h3>

        {order.items.map((item) => (

          <div
            key={item._id}
            className="flex gap-5 border-b py-4 last:border-none"
          >

            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex flex-col justify-center">

              <p className="font-medium">{item.title}</p>

              <p className="text-gray-600">
                ₹{item.price} × {item.quantity}
              </p>

              <p className="font-semibold text-gray-800">
                ₹{item.price * item.quantity}
              </p>

            </div>

          </div>

        ))}

      </div>


      {/* SHIPPING ADDRESS */}
      <div className="border rounded-lg p-5 mb-6">

        <h3 className="text-xl font-semibold mb-3">
          Shipping Address
        </h3>

        <p>{order.shippingAddress.name}</p>
        <p>{order.shippingAddress.address}</p>
        <p>
          {order.shippingAddress.city}, {order.shippingAddress.state}
        </p>
        <p>{order.shippingAddress.pincode}</p>
        <p>Phone: {order.shippingAddress.phone}</p>

      </div>


      {/* ORDER SUMMARY */}
      <div className="border rounded-lg p-5">

        <h3 className="text-xl font-semibold mb-4">
          Order Summary
        </h3>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>₹{order.subtotal}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Shipping Fee</span>
          <span>₹{order.shippingFee}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>₹{order.tax}</span>
        </div>

        <div className="flex justify-between font-semibold text-lg border-t pt-3 mt-3">
          <span>Total</span>
          <span>₹{order.total}</span>
        </div>

      </div>

    </div>
  );
};

export default OrderDetails;