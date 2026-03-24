import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import {  useLocation } from "react-router-dom";
import { deleteCategoryService, getCategoriesService } from "../../services/categories.service";

import Pagination from "../../components/pagination/Pagination";

const Categories = () => {
  const navigate = useNavigate();
  const location = useLocation();

  
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("categoryPage");
    return savedPage ? parseInt(savedPage) : 1;
  });
  
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCategories = async (page) => {
  try {
    const data = await getCategoriesService(page, 5, "null");

    setCategories(data.categories || []);

    // Sync local state and storage with backend
    setCurrentPage(data.currentPage || page);
    localStorage.setItem("categoryPage", data.currentPage || page);

    setTotalPages(data.totalPages || 1);

  } catch (error) {
    console.error("Failed to fetch categories");
  } 
};


  useEffect(() => {
  localStorage.setItem("categoryPage", currentPage);
  navigate(`?page=${currentPage}`, { replace: true });

  fetchCategories(currentPage);
}, [currentPage, navigate]);


  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this category?")) {
      try {
        const data = await deleteCategoryService(id);
        if (data.success) {
          fetchCategories(currentPage);
        }
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  // --- FILTER LOGIC ---
  
  //const mainCategories = categories.filter(cat => !cat.parentId);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Category List</h1>

        <div className="flex gap-3">
          
          <button
            onClick={() => navigate("/admin/subcategories")}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 cursor-pointer border border-gray-300"
          >
            View Sub-Categories
          </button>
          
          <button
            onClick={() => navigate("/admin/add-category")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Add Category
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Category Name</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
           
            {categories.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No main categories found.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat._id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-12 h-12 rounded object-cover border border-gray-200"
                    />
                  </td>

                  <td className="p-4 font-medium text-gray-800">{cat.name}</td>

                  <td className="p-4 space-x-3">
                    <button
                      onClick={() => navigate(`/admin/edit-category/${cat._id}`)}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl"
                      title="Edit"
                    >
                      <GoPencil />
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer text-xl"
                      title="Delete"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Categories;










// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { GoPencil } from "react-icons/go";
// import { MdDelete } from "react-icons/md";
// import { deleteCategoryService, getCategoriesService } from "../../services/categories.service";

// import Pagination from "../../components/pagination/Pagination";

// const Categories = () => {
//   const navigate = useNavigate();
  
  
//   const [currentPage, setCurrentPage] = useState(() => {
//     const savedPage = localStorage.getItem("categoryPage");
//     return savedPage ? parseInt(savedPage) : 1;
//   });
  
//   const [categories, setCategories] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchCategories = async (page) => {
//     try {
//       const data = await getCategoriesService(page);
      
//       if (data.success) {
//         setCategories(data.categories || []);
//         // Update total pages from backend
//         setTotalPages(data.totalPages || 1);
        
//         // if backend on a different page, update it
//         if (data.currentPage && data.currentPage !== page) {
//           setCurrentPage(data.currentPage);
//           localStorage.setItem("categoryPage", data.currentPage);
//         }
//       } else {
//         console.error("Failed to fetch categories");
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   //Watch for page changes to fetch data and save to LocalStorage
//   useEffect(() => {
//     localStorage.setItem("categoryPage", currentPage);
//     fetchCategories(currentPage);
//   }, [currentPage]);


//   const handleDelete = async (id) => {
//     try {
//       const data = await deleteCategoryService(id);
//       if (data.success) {
//         // Refresh the current page to update the list
//         fetchCategories(currentPage);
//       }
//     } catch (error) {
//       console.error("Delete failed", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Category List</h1>

//         <button
//           onClick={() => navigate("/admin/add-category")}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
//         >
//           Add Category
//         </button>
//       </div>

//       {/* Table */}
//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-4 text-left">Image</th>
//               <th className="p-4 text-left">Category Name</th>
//               <th className="p-4 text-left">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {categories.length === 0 ? (
//               <tr>
//                 <td colSpan="3" className="p-4 text-center">
//                   No categories found
//                 </td>
//               </tr>
//             ) : (
//               categories.map((cat) => (
//                 <tr key={cat._id} className="border-t">
//                   <td className="p-4">
//                     <img
//                       src={cat.image}
//                       alt={cat.name}
//                       className="w-12 h-12 rounded object-cover"
//                     />
//                   </td>

//                   <td className="p-4">{cat.name}</td>

//                   <td className="p-4 space-x-3">
//                     <button
//                       onClick={() => navigate(`/admin/edit-category/${cat._id}`)}
//                       className="text-blue-500 cursor-pointer"
//                     >
//                       <GoPencil />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(cat._id)}
//                       className="text-red-500 cursor-pointer"
//                     >
//                       <MdDelete />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={(page) => setCurrentPage(page)}
//       />
//     </div>
//   );
// };

// export default Categories;