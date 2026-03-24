import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoPencil, GoChevronDown, GoChevronRight } from "react-icons/go";
import { MdDelete, MdFolder } from "react-icons/md"; // Added Folder icon for parent
import { deleteCategoryService, getCategoriesService } from "../../services/categories.service";
import Pagination from "../../components/pagination/Pagination";
import { toast } from "react-toastify";


const SubCategories = () => {
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState([]); // Holds the flat list from API
  const [totalPages, setTotalPages] = useState(1);
  const [expandedRows, setExpandedRows] = useState([]); // Tracks which main categories are open

  const fetchSubCategories = async (page) => {
    try {
      // Fetching with a larger limit to ensure we get parents and children together
      const data = await getCategoriesService(page, 20); 
      if (data.success) {
        setAllData(data.categories || []);
        setTotalPages(data.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSubCategories(currentPage);
  }, [currentPage]);

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id) => {
    if (toast.error("Sub category deleted")) {
      try {
        const data = await deleteCategoryService(id);
        if (data.success) fetchSubCategories(currentPage);
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  // Logic to separate Main Categories from their Children
  const mainCategories = allData.filter((cat) => !cat.parentId);
  
  const getChildren = (parentId) => {
    return allData.filter((cat) => 
      (cat.parentId?._id === parentId) || (cat.parentId === parentId)
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sub-Category Management</h1>
        <button
          onClick={() => navigate("/admin/add-subcategory")}
          className="bg-indigo-600 text-white px-5 py-2  hover:bg-indigo-700 transition cursor-pointer"
        >
         Add New Sub-Category
        </button>
      </div>

      <div className="bg-white shadow-md overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-600 w-16">View</th>
              <th className="p-4 font-semibold text-gray-600">Main Category / Sub-Category Name</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {mainCategories.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-10 text-center text-gray-400">
                  No main categories found to display sub-categories.
                </td>
              </tr>
            ) : (
              mainCategories.map((parent) => {
                const subCats = getChildren(parent._id);
                const isExpanded = expandedRows.includes(parent._id);

                return (
                  <React.Fragment key={parent._id}>
                    {/* Parent Row - Acts as a Header for Subcategories */}
                    <tr className="bg-gray-50/50 border-b">
                      <td className="p-4">
                        <button 
                          onClick={() => toggleRow(parent._id)}
                          className="p-1 hover:bg-gray-200 cursor-pointer transition"
                        >
                          {isExpanded ? <GoChevronDown size={20}/> : <GoChevronRight size={20}/>}
                        </button>
                      </td>
                      <td className="p-4 flex items-center gap-2 font-bold text-gray-700">
                        {/* <MdFolder className="text-amber-500" size={20} /> */}
                        {parent.name}
                        <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                          {subCats.length} Items
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        
                      </td>
                    </tr>

                    {/* Sub-Category Nested Rows */}
                    {isExpanded && (
                      subCats.length > 0 ? (
                        subCats.map((sub) => (
                          <tr key={sub._id} className="border-b hover:bg-blue-50/20 transition">
                            <td className="p-4 text-center">
                               <div className="w-0.5 h-8 bg-gray-200 mx-auto"></div>
                            </td>
                            <td className="p-4 pl-10 text-gray-600">
                              <span className="text-gray-300 mr-2"></span> {sub.name}
                            </td>
                            <td className="p-4 text-right space-x-4">
                              <button
                                onClick={() => navigate(`/admin/edit-subcategory/${sub._id}`)}
                                className="text-indigo-600 hover:text-indigo-800 transition cursor-pointer"
                                title="Edit Subcategory"
                              >
                                <GoPencil size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(sub._id)}
                                className="text-red-500 hover:text-red-700 transition cursor-pointer"
                                title="Delete Subcategory"
                              >
                                <MdDelete size={20} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className="bg-gray-50/30">
                          <td></td>
                          <td colSpan="2" className="p-3 pl-10 text-sm italic text-gray-400">
                            No sub-categories found under this category.
                          </td>
                        </tr>
                      )
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default SubCategories;