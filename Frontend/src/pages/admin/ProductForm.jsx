import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

import { getCategoriesService } from "../../services/categories.service";

import {
  getProductsService,
  createProductService,
  updateProductService
} from "../../services/products.service";

const ProductForm = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = !!id;

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [stock,setStock] = useState("");
  const [category,setCategory] = useState("");
  const [categories,setCategories] = useState([]);
  const [imagePreview,setImagePreview] = useState(null);

  const fileRef = useRef();

  // Fetch categories
  useEffect(() => {

    const fetchCategories = async () => {

      try {

        const data = await getCategoriesService();

        setCategories(data.categories || []);

      } catch (error) {
        console.log("Error fetching categories", error);
      }

    };

    fetchCategories();

  },[]);


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
          setCategory(product.category?._id || "");
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
      setImagePreview(URL.createObjectURL(file) || null);
    }

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);

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

      console.log("Product error:", error.message);

    }

  };


  return (

<div className="p-6">

{/* Header */}

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

{/* Product Name */}

<div>

<label className="block mb-2 font-medium">
Product Name
</label>

<input
type="text"
value={title}
onChange={(e)=>setTitle(e.target.value)}
className="border rounded p-2 w-full"
maxLength={50}
/>

</div>

{/* Description */}

<div>

<label className="block mb-2 font-medium">
Product Description
</label>

<textarea
value={description}
onChange={(e)=>setDescription(e.target.value)}
className="border rounded p-2 w-full h-32"
maxLength={300}
/>

</div>

{/* Category Dropdown */}

<div>

<label className="block mb-2 font-medium">
Category
</label>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
className="border rounded p-2 w-full"
>

<option value="">Select Category</option>

{categories.map((cat)=>(
<option key={cat._id} value={cat._id}>
{cat.name}
</option>
))}

</select>

</div>

{/* Price & Stock */}

<div className="grid grid-cols-2 gap-4">

<div>

<label className="block mb-1">Price</label>

<input
  type="text"
  inputMode="numeric"
  value={price}
  onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ''))}
  className="border rounded p-2 w-full"
  maxLength={10}
/>


</div>

<div>

<label className="block mb-1">Stock</label>

<input
type="text"
value={stock}
onChange={(e)=>setStock(e.target.value.replace(/[^0-9]/g, ''))}
className="border rounded p-2 w-full"
maxLength={10}
/>

</div>

</div>

{/* Image Upload */}

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

<input
type="file"
ref={fileRef}
onChange={handleImageChange}
className="hidden"
/>

</div>

{/* Submit */}

<button
type="submit"
className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
>
{isEdit ? "Update Product" : "Publish Product"}
</button>

</form>

</div>

  );
};

export default ProductForm;