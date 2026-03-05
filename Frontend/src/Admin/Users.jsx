import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
const Users = () => {  
    const [users, setUsers] = useState([]);
  useEffect(() => {    
    axios.get("/admin/users")
    .then((res) => setUsers(res.data));  }, []);
  
    const deleteUser = async (id) => {    await axios.delete(`/admin/user/${id}`);    
    setUsers(users.filter((u) => u._id !== id));  };
  return (    <div className="px-50">      
     <h1 className="text-xl font-bold mb-4 mt-30">Users</h1>
      {users.map((user) => (<div key={user._id} className="bg-white p-4 shadow mb-2 flex justify-between">          <span>{user.email}</span>          <button            onClick={() => deleteUser(user._id)}            className="bg-red-500 text-white px-3 py-1"          >            Delete          </button>        </div>      ))}    </div>  );};
export default Users;