import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { PiShoppingCartSimple } from "react-icons/pi";
import { getCategoriesService } from "../../services/categories.service";
import { searchProductsService } from "../../services/products.service";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import useDebounce from "../../hooks/useDebounce";

const Navbar = () => {

const navigate = useNavigate();

const { cart } = useContext(CartContext);
const { user, token } = useContext(UserContext);

const [categories,setCategories] = useState([]);

const [search,setSearch] = useState("");

const [results,setResults] = useState({
products:[],
categories:[]
});

const debouncedSearch = useDebounce(search,500);

const cartCount = cart.length;


useEffect(()=>{

const fetchCategories = async () =>{
try{

const data = await getCategoriesService(1,6);

if(data.success){
setCategories(data.categories);
}

}catch(err){
console.log(err);
}

};

fetchCategories();

},[]);


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

{[...categories].reverse().map((cat)=>(

<div
key={cat._id}
onClick={()=>navigate(`/category/${cat._id}`)}
className="cursor-pointer hover:text-blue-400 hover:border-blue-400 hover:border-b-2 transition"
>

{cat.name}

</div>

))}

<div
onClick={()=>navigate("/product")}
className="cursor-pointer hover:text-blue-400 transition"
>
All
</div>

</div>


{/* RIGHT SECTION */}

<div className="flex items-center gap-5">


{/* SEARCH */}

<div className="relative">

<div className="absolute right-10 -top-4 w-75 bg-zinc-100 rounded-lg">

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
className="border border-blue-400 text-blue-400 px-4 py-2 rounded hover:bg-blue-400 hover:text-white transition"
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

</div>

);

};

export default Navbar;