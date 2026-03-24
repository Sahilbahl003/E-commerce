import React, { useEffect, useState } from "react";
import { getMyOrdersService } from "../../services/order.service";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
  const res = await getMyOrdersService();
  console.log("my order response", res);
  console.log("res order", res.orders)

  if (res.success) {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user",user);

   const myOrders = res.orders.filter(
  (order) =>
    order.user === user._id || order.user?._id === user._id
);


console.log("my orders", myOrders);
    setOrders(myOrders);
  }
};

  return (
    <div className="max-w-[1200px] mx-auto mt-10">
      <h2 className="text-xl font-bold mb-5">My Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          onClick={() => navigate(`/orders/${order._id}`)}
          className="border p-4 mb-3 cursor-pointer"
        >
          <p>Order ID: {order._id}</p>
          <p>Total: ₹{order.total}</p>
          <p>Status: {order.status}</p>
          <p></p>
        </div>
      ))}
    </div>
  );
};

export default Orders;