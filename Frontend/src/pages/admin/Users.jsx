import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import {
  getUsersService,
  toggleUserStatusService,
} from "../../services/users.service";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/ui/ConfirmModal";

import Pagination from "../../components/pagination/Pagination";

const Users = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. Logic to get initial page from LocalStorage (fallback to 1)
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("users_page");
    return savedPage ? parseInt(savedPage) : 1;
  });

  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);  

  const fetchUsers = async (page) => {
      try {
        console.log("page", page);
        const data = await getUsersService(page);
        console.log("data", data);
        setUsers(data.users || []);

        // Sync local state and storage with backend response
        setCurrentPage(data.currentPage || page);
        localStorage.setItem("users_page", data.currentPage || page);
        
        setTotalPages(data.totalPages || 1);
        console.log("data.current page", data.currentPage);
        
      } catch (error) {
        toast.error("Failed to fetch users");
      }
    };

  // 2. Watch for page changes to update storage and fetch data
  useEffect(() => {
    localStorage.setItem("users_page", currentPage);
    // Optional: Keep URL in sync too if you want the URL to look clean
    navigate(`?page=${currentPage}`, { replace: true });
    
    fetchUsers(currentPage);
  }, [currentPage, navigate]);

  const openToggleModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleToggleStatus = async () => {
    if (!selectedUser) return;

    try {
      const data = await toggleUserStatusService(selectedUser._id);

      if (data.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === selectedUser._id
              ? { ...user, isActive: !user.isActive }
              : user
          )
        );

        toast.success("User status updated");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update user status");
    }

    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Users List</h1>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-4">Profile</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="p-4 font-medium">
                    <img
                      src={user.profileImage || null}
                      alt="profile"
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </td>

                  <td className="p-4 font-medium">{user.name}</td>

                  <td className="p-4">{user.email}</td>

                  <td className="p-4">
                    {/* Toggle Switch */}
                    <label className="inline-flex items-center  cursor-pointer">
                      <input
                        type="checkbox"
                        checked={user.isActive}
                        onChange={() => openToggleModal(user)}
                        className="sr-only peer"
                      />

                      <div className="w-11 h-6 bg-red-500 rounded-full peer peer-checked:bg-green-600 relative z-10 transition">
                        <div
                          className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-transform ${
                            user.isActive ? "translate-x-5" : ""
                          }`}
                        ></div>
                      </div>

                      <span
                        className={`ml-3 text-sm font-medium ${
                          user.isActive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </label>
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

      {/* Confirm Modal */}
      {showModal && selectedUser && (
        <ConfirmModal
          title={
            selectedUser.isActive
              ? "Deactivate User"
              : "Activate User"
          }
          message={
            selectedUser.isActive
              ? "This user will not be able to login. Continue?"
              : "This user will be able to login again."
          }
          confirmText={
            selectedUser.isActive ? "Deactivate" : "Activate"
          }
          cancelText="Cancel"
          onConfirm={handleToggleStatus}
          onCancel={() => {
            setShowModal(false);
            setSelectedUser(null);
          }}
        />
      )}

    </div>
  );
};

export default Users;

//i want exact same logic of pagination in the Category list but the difference is category is not in admin controllers and user is in admin controller but i made seperate controller for category controller so how can i do it without changing the existing logic 