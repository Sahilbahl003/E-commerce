import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";

import {
  getCategoriesService,
  createCategoryService,
  updateCategoryService,
  getCategoryByIdService
} from "../../services/categories.service";

import { validateField, validateForm } from "../../utils/validation";

const SubCategoryForm = () => {

  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [mainCategories, setMainCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  useEffect(() => {

    const initForm = async () => {

      try {

        const catData = await getCategoriesService(1, 100);

        const topLevel = (catData.categories || []).filter(c => !c.parentId);
        setMainCategories(topLevel);

        if (isEdit) {

          const data = await getCategoryByIdService(id);

          if (data.success) {
            setName(data.category.name || "");
            setImagePreview(data.category.image || null);

            setParentId(
              data.category.parentId?._id ||
              data.category.parentId ||
              ""
            );
          }
        }

      } catch (err) {
        console.error(err);
      }

    };

    initForm();

  }, [id, isEdit]);


  // INPUT CHANGE
  const changeHandler = (e) => {

    const { name: fieldName, value } = e.target;

    let updatedName = name;
    let updatedParent = parentId;

    if (fieldName === "name") {
      setName(value);
      updatedName = value;
    }

    if (fieldName === "parentId") {
      setParentId(value);
      updatedParent = value;
    }

    // validate full form so dependent fields show errors
    const validationErrors = validateForm({
      name: updatedName,
      parentId: updatedParent
    });

    setErrors(validationErrors);

  };


  // BLUR VALIDATION
  const blurHandler = (e) => {

    const { name: fieldName, value } = e.target;

    let updatedName = name;
    let updatedParent = parentId;

    if (fieldName === "name") updatedName = value;
    if (fieldName === "parentId") updatedParent = value;

    const validationErrors = validateForm({
      name: updatedName,
      parentId: updatedParent
    });

    setErrors(validationErrors);

  };


  const handleImageClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      const error = validateField("image", file.name);

      if (error) {
        setErrors(prev => ({ ...prev, image: error }));
        setImagePreview(null);
        return;
      }

      setErrors(prev => ({ ...prev, image: "" }));

      setImagePreview(URL.createObjectURL(file));

    }

  };


  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    const validationErrors = validateForm({
      name,
      parentId
    });

    if (!imagePreview && !isEdit) {
      validationErrors.image = "Image is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("parentId", parentId);

    if (fileInputRef.current?.files[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    try {

      const data = isEdit
        ? await updateCategoryService(id, formData)
        : await createCategoryService(formData);

      if (data.success) {
        toast.success(`SubCategory ${isEdit ? "updated" : "created"} successfully`);
        navigate("/admin/categories");
      }

    } catch (error) {

      console.error(error);
      toast.error("Duplicate SubCategory not allowed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="p-6 max-w-2xl">

      <div className="flex items-center gap-4 mb-6">

        <button
          onClick={() => navigate(-1)}
          className="text-3xl cursor-pointer"
        >
          <IoIosArrowBack />
        </button>

        <h1 className="text-2xl font-bold">
          {isEdit ? "Edit Sub-Category" : "Create Sub-Category"}
        </h1>

      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-sm border space-y-4">

        {/* Parent Category */}
        <div>

          <label className="block font-medium mb-1">Select Main Category</label>

          <select
            name="parentId"
            value={parentId}
            onChange={changeHandler}
            onBlur={blurHandler}
            className="w-full border p-2"
            required
          >

            <option value="">-- Choose Parent --</option>

            {mainCategories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}

          </select>

          {errors.parentId && (
            <p className="text-red-600 text-xs">{errors.parentId}</p>
          )}

        </div>


        {/* Name */}
        <div>

          <label className="block font-medium mb-1">Sub-Category Name</label>

          <input
            type="text"
            name="name"
            value={name}
            onChange={changeHandler}
            onBlur={blurHandler}
            className="w-full border p-2 rounded"
            maxLength={50}
            placeholder="e.g. Running Shoes"
            required
          />

          {errors.name && (
            <p className="text-red-600 text-xs">{errors.name}</p>
          )}

        </div>


        {/* Image */}
        <div>

          <label className="block font-medium mb-1">Display Image</label>

          <div
            onClick={handleImageClick}
            className="w-full h-32 border-2 border-dashed flex items-center justify-center cursor-pointer rounded"
          >

            {imagePreview ? (
              <img
                src={imagePreview}
                className="h-full object-contain"
              />
            ) : (
              "Click to upload"
            )}

          </div>

          {errors.image && (
            <p className="text-red-600 text-xs">{errors.image}</p>
          )}

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />

        </div>


        {/* Submit */}
        <button
          disabled={loading}
          className="w-full bg-indigo-600 cursor-pointer text-white py-2 rounded font-semibold disabled:bg-gray-400"
        >
          {loading ? "Saving..." : isEdit ? "Update Sub-Category" : "Create Sub-Category"}
        </button>

        {formError && (
          <p className="text-red-600 text-sm mt-2">{formError}</p>
        )}

      </form>

    </div>

  );

};

export default SubCategoryForm;