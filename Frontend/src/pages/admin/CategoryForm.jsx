import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getCategoriesService,
  createCategoryService,
  updateCategoryService
} from "../../services/categories.service";

const CategoryForm = () => {

  const [name, setName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = !!id;

  useEffect(() => {

    const fetchCategory = async () => {

      if (isEdit) {

        const data = await getCategoriesService();

        const category = data.categories.find(c => c._id === id);

        if (category) {
          setName(category.name || "");
          setImagePreview(category.image || null);
        }

      }

    };

    fetchCategory();

  }, [id]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file) || null);
    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const imageFile = fileInputRef.current.files[0];

    const formData = new FormData();

    formData.append("name", name);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    let data;

    if (isEdit) {
      data = await updateCategoryService(id, formData);
    } else {
      data = await createCategoryService(formData);
    }

    if (data.success) {
      navigate("/admin/categories");
    }

  };

  return (

    <div className="p-6">

      <div className="flex items-center gap-4 mb-6">

        <button
          onClick={() => navigate("/admin/categories")}
          className="text-xl"
        >
          ✕
        </button>

        <h1 className="text-2xl font-semibold">
          {isEdit ? "Edit Category" : "Add New Category"}
        </h1>

      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>

          <label className="block mb-2 font-medium">
            Category Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded p-2 w-80"
            required
          />

        </div>

        <div>

          <label className="block mb-3 font-medium">
            Category Image
          </label>

          <div
            onClick={handleImageClick}
            className="w-40 h-40 border-2 border-dashed rounded flex items-center justify-center cursor-pointer"
          >

            {imagePreview ? (
              <img
                src={imagePreview}
                alt="preview"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <div className="text-gray-500 text-center">
                <p className="text-sm">Upload Image</p>
              </div>
            )}

          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {isEdit ? "Update Category" : "Publish Category"}
        </button>

      </form>

    </div>

  );

};

export default CategoryForm;