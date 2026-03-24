import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { PiShoppingCartSimple } from "react-icons/pi";
import { AiOutlineHeart } from "react-icons/ai"; 
import { getCategoriesService } from "../../services/categories.service";
import { searchProductsService } from "../../services/products.service";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { WishlistContext } from "../../context/WishlistContext"; 
import useDebounce from "../../hooks/useDebounce";

const Navbar = () => {

const navigate = useNavigate();

const { cart } = useContext(CartContext);
const { wishlist } = useContext(WishlistContext); 
const { user, token } = useContext(UserContext);

const [categories,setCategories] = useState([]);
const [subCategoriesMap, setSubCategoriesMap] = useState({});

const [search,setSearch] = useState("");

const [results,setResults] = useState({
products:[],
categories:[]
});

const debouncedSearch = useDebounce(search,500);

const cartCount = cart.length;
const wishlistCount = wishlist.length; 


useEffect(() => {

  const fetchCategories = async () =>{
    try{
      const data = await getCategoriesService(1, 10, null);

      if(data.success){
        const mainCategories = data.categories.filter(cat => !cat.parentId);
        setCategories(mainCategories);
        fetchSubCategories(mainCategories);
      }

    }catch(err){
      console.log(err);
    }
  };

  fetchCategories();

},[]);

const fetchSubCategories = async (categories) => {
  try {

    const map = {};

    for (let cat of categories) {

      const data = await getCategoriesService(1, 20, cat._id);

      if (data.success) {
        map[cat._id] = data.categories.filter(sub => sub.parentId);
      }

    }

    setSubCategoriesMap(map);

  } catch (err) {
    console.log(err);
  }
};


useEffect(()=>{

const fetchSearch = async () =>{

if(!debouncedSearch.trim()){
setResults({products:[],categories:[]});
return;
}

try{

const data = await searchProductsService(debouncedSearch);

if(data.success){
setResults({
products:data.products || [],
categories:data.categories || []
});
}

}catch(err){
console.log(err);
}

};

fetchSearch();

},[debouncedSearch]);

return (

<div className="fixed top-0 left-0 w-full bg-white border-b border-zinc-200 z-50 flex justify-center">

<div className="w-full max-w-[1200px] px-4 py-4 flex justify-between items-center text-zinc-700 font-semibold">

{/* LOGO */}

<div
onClick={()=>navigate("/")}
className="flex items-center gap-2 text-blue-400 text-2xl font-bold cursor-pointer"
>
<span className="text-zinc-500 text-3xl">
<BsCart4/>
</span>
E-comzy
</div>


{/* CATEGORIES */}

<div className="flex items-center gap-6 mr-80">

{/*  ALL BUTTON (ADDED) */}
<div
  onClick={()=>navigate("/product")}
  className="cursor-pointer hover:text-blue-400 hover:border-blue-400 hover:border-b-2 transition"
>
  All
</div>

{/* MAIN CATEGORIES */}
{[...categories].reverse().map((cat)=>(

<div className="dropdown" key={cat._id}>
    
  <div
    onClick={()=>navigate(`/category/${cat._id}`)}
    className="dropbtn cursor-pointer hover:text-blue-400 hover:border-blue-400 hover:border-b-2 transition"
  >
    {cat.name}
  </div>

  <div className="dropdown-content">

    {subCategoriesMap[cat._id]?.length > 0 ? (

      subCategoriesMap[cat._id].map((sub)=>(
        <div
          key={sub._id}
          onClick={() => navigate(`/category/${sub._id}`)}
          className="p-2 hover:bg-gray-200 cursor-pointer"
        >
          {sub.name}
        </div>
      ))

    ) : (

      <div className="p-2 text-gray-400">No subcategories</div>

    )}

  </div>

</div>

))}

</div>


{/* RIGHT SECTION */}

<div className="flex items-center gap-5">


{/* SEARCH */}

<div className="relative">

<div className="absolute right-5 -top-4 w-75 bg-zinc-100 rounded-lg">

<input
type="text"
placeholder="Search products..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="p-2 w-full outline-none"
/>

{(results.products.length>0 || results.categories.length>0) && (

<div className="max-h-60 overflow-y-auto">

{/* CATEGORY RESULTS */}

{results.categories.map((cat)=>(

<div
key={cat._id}
onClick={()=>{
navigate(`/category/${cat._id}`);
setSearch("");
}}
className="p-2 hover:bg-gray-100 cursor-pointer font-semibold"
>
Category: {cat.name}
</div>

))}

{/* PRODUCT RESULTS */}

{results.products.map((product)=>(

<div
key={product._id}
onClick={()=>{
navigate(`/product/${product._id}`);
setSearch("");
}}
className="p-2 hover:bg-gray-100 cursor-pointer"
>
{product.title}
</div>

))}

</div>

)}

</div>

</div>


{/* WISHLIST */}

<div className="relative">

<AiOutlineHeart
className="text-2xl cursor-pointer"
onClick={()=>navigate("/wishlist")}
/>

{wishlistCount>0 && (
<span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-[2px] rounded-full">
{wishlistCount}
</span>
)}

</div>


{/* CART */}

<div className="relative">

<PiShoppingCartSimple
className="text-2xl cursor-pointer"
onClick={()=>navigate("/cart")}
/>

{cartCount>0 && (
<span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-[2px] rounded-full">
{cartCount}
</span>
)}

</div>


{/* LOGIN */}

{(!token || user?.role==="admin") && (

<button
onClick={()=>navigate("/login")}
className="border border-blue-400 text-blue-400 px-4 py-2 rounded hover:bg-blue-400 hover:text-white transition cursor-pointer"
>
Login
</button>

)}


{/* PROFILE */}

{token && user?.role==="user" && (

<div
onClick={()=>navigate("/profile")}
className="cursor-pointer"
>

{user?.profileImage ? (

<img
src={user.profileImage}
alt="profile"
className="w-10 h-10 rounded-full object-cover"
/>

):( 

<div className="w-10 h-10 bg-zinc-300 rounded-full flex items-center justify-center font-bold">
{user?.name?.charAt(0)}
</div>

)}

</div>

)}

</div>

</div>

<style>
{`
.dropbtn {
  font-size: 16px;
  border: none;
}

.dropdown {
  position: relative;
  display: inline-block;
}

/* 🔥 FIX STARTS HERE */
.dropdown-content {
  display: none;
  position: absolute;
  top: 100%; /* attach directly below */
  left: 0;
  background-color: #f1f1f1;
  min-width: 600px;
  /* ❌ removed margin-top */
  padding-top: 10px; /* ✅ creates space WITHOUT breaking hover */
  box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
  z-index: 1;
}

/* 🔥 invisible hover bridge (VERY IMPORTANT) */
.dropdown::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 10px; /* small bridge */
}

/* hover works on both */
.dropdown:hover .dropdown-content {
  display: block;
}
/*  FIX ENDS HERE */
`}
</style>

</div>

);

};

export default Navbar;