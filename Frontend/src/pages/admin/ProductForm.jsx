import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { validateField, validateForm } from "../../utils/validation";

import { getCategoriesService } from "../../services/categories.service";

import {
  getProductsService,
  createProductService,
  updateProductService
} from "../../services/products.service";
import { toast } from "react-toastify";

const ProductForm = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = !!id;

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [stock,setStock] = useState("");
  const [category,setCategory] = useState("");

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const [subCategory,setSubCategory] = useState("");
  const [subCategories,setSubCategories] = useState([]);

  const [categories,setCategories] = useState([]);
  const [imagePreview,setImagePreview] = useState(null);
  const [loading,setLoading] = useState(false);

  const fileRef = useRef();

  // VALIDATION HANDLERS
  const changeHandler = (e) => {

    const { name, value } = e.target;

    if(name === "title") setTitle(value);
    if(name === "description") setDescription(value);
    if(name === "price") setPrice(value);
    if(name === "stock") setStock(value);
    if(name === "category") setCategory(value);
    if(name === "subCategory") setSubCategory(value);

    const error = validateField(name,value);

    setErrors((prev)=>({...prev,[name]:error}));

  };

  const blurHandler = (e)=>{

    const { name,value } = e.target;

    const error = validateField(name,value);

    setErrors((prev)=>({...prev,[name]:error}));

  };


  // Fetch categories
  useEffect(() => {

    const fetchCategories = async () => {

      try {

        const data = await getCategoriesService(1, 100);

        const main = (data.categories || []).filter(c => !c.parentId);
        setCategories(main);

      } catch (error) {
        console.log("Error fetching categories", error);
      }

    };

    fetchCategories();

  },[]);


  // FETCH SUBCATEGORIES WHEN CATEGORY CHANGES
  useEffect(() => {

    const fetchSubCategories = async () => {

      if(!category){
        setSubCategories([]);
        setSubCategory("");
        return;
      }

      try {

        const data = await getCategoriesService(1, 100, category);

        if(data.success){
          setSubCategories(data.categories || []);
        }

      } catch (error) {
        console.log("Error fetching subcategories", error);
      }

    };

    fetchSubCategories();

  },[category]);


  // Fetch product when editing
  useEffect(() => {

    const fetchProduct = async () => {

      if (isEdit) {

        const data = await getProductsService();

        const product = data.products.find(p => p._id === id);

        if (product) {

          setTitle(product.title || "");
          setDescription(product.description || "");
          setPrice(product.price || "");
          setStock(product.stockQuantity || "");

          const catId =
            product.category?.parentId?._id ||
            product.category?._id || "";

          setCategory(catId);

          setSubCategory(
            product.category?.parentId
              ? product.category._id
              : ""
          );

          setImagePreview(product.image || null);

        }

      }

    };

    fetchProduct();

  },[id,isEdit]);


  const handleImageClick = () => {
    fileRef.current.click();
  };

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if(file){

      const error = validateField("image", file.name);

      if(error){
        setErrors((prev)=>({...prev,image:error}));
        setImagePreview(null);
        return;
      }

      setErrors((prev)=>({...prev,image:""}));

      setImagePreview(URL.createObjectURL(file) || null);

    }

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    const validationErrors = validateForm({
      title,
      description,
      price,
      stock,
      category
    });

    if(!imagePreview && !isEdit){
      validationErrors.image = "Image is required";
    }

    setErrors(validationErrors);

    if(Object.keys(validationErrors).length > 0){
      return;
    }

    setLoading(true);

    try {

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);

      formData.append("category", subCategory || category);
      formData.append("subCategory", subCategory || "");

      if (fileRef.current?.files[0]) {
        formData.append("image", fileRef.current.files[0]);
      }

      let data;

      if (isEdit) {
        data = await updateProductService(id, formData);
      } else {
        data = await createProductService(formData);
      }

      if(data.success){
        navigate("/admin/products");
      }

    } catch (error) {

      toast.error("All fields are required");
      console.log("Product error:", error.message);
      setLoading(false);

    }
    finally{
      setLoading(false);
    }

  };


  return (

<div className="p-6">

<div className="flex items-center gap-4 mb-6">

<button
onClick={() => navigate("/admin/products")}
className="text-3xl cursor-pointer"
>
<IoIosArrowBack />
</button>

<h1 className="text-2xl font-semibold">
{isEdit ? "Edit Product" : "Add Product"}
</h1>

</div>

<form onSubmit={handleSubmit} className="space-y-6">

<div>

<label className="block mb-2 font-medium">
Product Name
</label>

<input
type="text"
name="title"
value={title}
onChange={changeHandler}
onBlur={blurHandler}
className="border rounded p-2 w-full"
maxLength={50}
/>

{errors.title && <p className="text-red-600 text-xs">{errors.title}</p>}

</div>

<div>

<label className="block mb-2 font-medium">
Product Description
</label>

<textarea
name="description"
value={description}
onChange={changeHandler}
onBlur={blurHandler}
className="border rounded p-2 w-full h-32"
maxLength={300}
/>

{errors.description && <p className="text-red-600 text-xs">{errors.description}</p>}

</div>

<div>

<label className="block mb-2 font-medium">
Category
</label>

<select
name="category"
value={category}
onChange={(e)=>{
  changeHandler(e);
  setSubCategory("");
}}
onBlur={blurHandler}
className="border rounded p-2 w-full"
>

<option value="">Select Category</option>

{categories.map((cat)=>(
<option key={cat._id} value={cat._id}>
{cat.name}
</option>
))}

</select>

{errors.category && <p className="text-red-600 text-xs">{errors.category}</p>}

</div>

{subCategories.length > 0 && (

<div>

<label className="block mb-2 font-medium">
Sub Category
</label>

<select
name="subCategory"
value={subCategory}
onChange={changeHandler}
onBlur={blurHandler}
className="border rounded p-2 w-full"
>

<option value="">Select Sub Category</option>

{subCategories.map((sub)=>(
<option key={sub._id} value={sub._id}>
{sub.name}
</option>
))}

</select>

</div>

)}

<div className="grid grid-cols-2 gap-4">

<div>

<label className="block mb-1">Price</label>

<input
type="text"
name="price"
inputMode="numeric"
value={price}
onChange={(e)=>{
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
  changeHandler(e);
}}
onBlur={blurHandler}
className="border rounded p-2 w-full"
maxLength={10}
/>

{errors.price && <p className="text-red-600 text-xs">{errors.price}</p>}

</div>

<div>

<label className="block mb-1">Stock</label>

<input
type="text"
name="stock"
value={stock}
onChange={(e)=>{
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
  changeHandler(e);
}}
onBlur={blurHandler}
className="border rounded p-2 w-full"
maxLength={10}
/>

{errors.stock && <p className="text-red-600 text-xs">{errors.stock}</p>}

</div>

</div>

<div>

<label className="block mb-3 font-medium">
Product Image
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

<div className="text-center text-gray-500">
<p className="text-sm">Image Upload</p>
</div>

)}

</div>

{errors.image && <p className="text-red-600 text-xs">{errors.image}</p>}

<input
type="file"
ref={fileRef}
onChange={handleImageChange}
className="hidden"
/>

</div>

<button
disabled={loading}
type="submit"
className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
>
{loading ? (
<div className="flex gap-1 items-center justify-center">
<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
<p className="text-white">loading...</p>
</div>
) : (
isEdit ? "Update Product" : "Publish Product"
)}
</button>

{formError && (
<p className="text-red-600 text-sm mt-2">{formError}</p>
)}

</form>

</div>

  );
};

export default ProductForm;