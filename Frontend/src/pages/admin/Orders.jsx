import { useEffect, useState } from "react";
import {getMyOrdersService,updateOrderStatusService} from "../../services/order.service";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";

const Orders = () => {

const [orders, setOrders] = useState([]);
const [totalPages, setTotalPages] = useState(1);

const navigate = useNavigate();
const location = useLocation();

const [currentPage, setCurrentPage] = useState(() => {
  const savedPage = localStorage.getItem("orders_page");
  return savedPage ? parseInt(savedPage) : 1;
});

  const fetchOrders = async (page) => {

  try {

    const data = await getMyOrdersService(page);

    console.log("Orders API Response:", data);
    console.log("data orders", data.orders);
    console.log("data total pages", data.totalPages);
    console.log("data current pages",data.currentPage)

    setOrders(data.orders || []);
    setTotalPages(data.totalPages || 1);

    setCurrentPage(data.currentPage || page);
    localStorage.setItem("orders_page", data.currentPage || page);

  } catch (error) {
    console.log("Error fetching orders", error);
  }

};

useEffect(() => {

  localStorage.setItem("orders_page", currentPage);

  navigate(`?page=${currentPage}`, { replace: true });

  fetchOrders(currentPage);

}, [currentPage, navigate]);


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
              <th className="p-4">Payment Mode</th>
              <th className="p-4">Payment Status</th>
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
                   {String(order._id).slice(-6)}
                  </td>

                  <td className="p-4">
                    {order.user?.email || "N/A"}
                  </td>

                  <td className="p-4">
                    ₹{order.total || 0}
                  </td>

                  <td className="p-4">
                    {order.paymentMethod}
                  </td>

                  <td className="p-4">Successful</td>

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
                      <option value="cancelled">Cancelled</option>
                      <option value="delivered">Delivered</option>

                    </select>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) => setCurrentPage(page)}
      />

    </div>

  );

};

export default Orders;