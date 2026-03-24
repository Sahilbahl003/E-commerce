import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";

import {
  getCategoriesService,
  createCategoryService,
  updateCategoryService
} from "../../services/categories.service";

import { validateField, validateForm } from "../../utils/validation";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  // Fetch category if editing
  useEffect(() => {
    const fetchCategory = async () => {
      if (isEdit) {
        try {
          const data = await getCategoriesService();
          const category = data.categories.find(c => c._id === id);

          if (category) {
            setName(category.name || "");
            setImagePreview(category.image || null);
          }
        } catch (error) {
          console.error("Fetch category error:", error);
        }
      }
    };

    fetchCategory();
  }, [id, isEdit]);

  // Input handlers with validation
  const changeHandler = (e) => {
    const { name: fieldName, value } = e.target;

    if (fieldName === "name") setName(value);

    const error = validateField(fieldName, value);
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const blurHandler = (e) => {
    const { name: fieldName, value } = e.target;
    const error = validateField(fieldName, value);
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleImageClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const error = validateField("image", file.name);
      if (error) {
        setErrors((prev) => ({ ...prev, image: error }));
        setImagePreview(null);
        return;
      } else {
        setErrors((prev) => ({ ...prev, image: "" }));
      }

      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm({ name });
    if (!imagePreview && !isEdit) {
      validationErrors.image = "Image is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setLoading(true);

    try {
      const imageFile = fileInputRef.current.files[0];
      const formData = new FormData();
      formData.append("name", name);
      if (imageFile) formData.append("image", imageFile);

      let data;
      if (isEdit) {
        data = await updateCategoryService(id, formData);
      } else {
        data = await createCategoryService(formData);
      }

      if (data.success) {
        toast.success(`Category ${isEdit ? "updated" : "created"} successfully`);
        navigate("/admin/categories");
      }
    } catch (error) {
      console.error("Category error:", error);
      
      //setFormError(error.message);
      toast.error("Duplicate Category not allowed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/admin/categories")}
          className="text-3xl cursor-pointer"
        >
          <IoIosArrowBack />
        </button>
        <h1 className="text-2xl font-semibold">
          {isEdit ? "Edit Category" : "Add New Category"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name Input */}
        <div>
          <label className="block mb-2 font-medium">Category Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={changeHandler}
            onBlur={blurHandler}
            className="border rounded p-2 w-80"
            maxLength={50}
            required
          />
          {errors.name && <p className="text-red-600 text-xs">{errors.name}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-3 font-medium">Category Image</label>
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
          {errors.image && <p className="text-red-600 text-xs">{errors.image}</p>}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-md h-10 mt-2 transition flex justify-center items-center cursor-pointer disabled:opacity-70"
        >
          {loading ? (
            <div className="flex gap-1 items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white">loading...</p>
            </div>
          ) : (
            isEdit ? "Update Category" : "Publish Category"
          )}
        </button>

        {formError && (
          <p className="text-red-600 text-sm mt-2">{formError}</p>
        )}
      </form>
    </div>
  );
};

export default CategoryForm;


