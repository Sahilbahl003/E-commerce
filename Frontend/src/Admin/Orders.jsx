import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
const Orders = () => {  
    const [orders, setOrders] = useState([]);
  useEffect(() => {    
    axios.get("/admin/orders").then((res) => setOrders(res.data));  }, []);

  const updateStatus = async (id, status) => {    
    const res = await axios.put(`/admin/order/${id}`, { status });    
    setOrders(orders.map((o) => (o._id === id ? res.data : o)));  };
  return (    
       <div>      
        <h1 className="text-xl font-bold mb-4 mt-40 px-30">Orders</h1>
         {orders.map((order) => (        
           <div key={order._id} className="bg-white p-4 shadow mb-2">          
           <p>User: {order.user.email}</p>          <p>Status: {order.status}</p>
          <select            onChange={(e) => updateStatus(order._id, e.target.value)}            className="border p-1 mt-2"          >            
          <option>pending</option>            
          <option>shipped</option>            
          <option>delivered</option>          
          </select>        
          </div>      ))}    
          </div>  );};
export default Orders;