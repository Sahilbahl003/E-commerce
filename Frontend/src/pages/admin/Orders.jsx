import { useEffect, useState } from "react";
import {
  getOrdersService,
  updateOrderStatusService
} from "../../services/orders.service";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const data = await getOrdersService();

        setOrders(data.orders || []);

      } catch (error) {
        console.log("Error fetching orders", error);
      }

    };

    fetchOrders();

  }, []);


  const updateStatus = async (id, status) => {

    try {

      const data = await updateOrderStatusService(id, status);

      setOrders(
        orders.map((o) =>
          o._id === id ? data.order : o
        )
      );

    } catch (error) {

      console.log("Error updating order", error);

    }

  };


  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Orders List
      </h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr className="text-left">

              <th className="p-4">Order ID</th>
              <th className="p-4">User</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Update</th>

            </tr>

          </thead>

          <tbody>

            {orders.length === 0 ? (

              <tr>
                <td colSpan="5" className="p-4 text-center">
                  No orders found
                </td>
              </tr>

            ) : (

              orders.map((order) => (

                <tr key={order._id} className="border-t">

                  <td className="p-4 text-sm">
                    {order._id.slice(-6)}
                  </td>

                  <td className="p-4">
                    {order.user?.email || "N/A"}
                  </td>

                  <td className="p-4">
                    ₹{order.totalPrice || 0}
                  </td>

                  <td className="p-4 capitalize">
                    {order.status}
                  </td>

                  <td className="p-4">

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      className="border rounded p-1"
                    >

                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>

                    </select>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Orders;