import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { PiShoppingCartSimple } from "react-icons/pi";
import { getCategoriesService } from "../../services/categories.service";
import { searchProductsService } from "../../services/products.service";
import { CartContext } from "../../context/CartContext";
import useDebounce from "../../hooks/useDebounce";


const Navbar = () => {

const navigate = useNavigate();
const location = useLocation();
const { cart } = useContext(CartContext);

const [token,setToken] = useState(localStorage.getItem("token"));
const [user,setUser] = useState(null);
const [categories,setCategories] = useState([]);

const [showSearch,setShowSearch] = useState(true);
const [search,setSearch] = useState("");

const [results,setResults] = useState({
products:[],
categories:[]
});

const debouncedSearch = useDebounce(search,500);

const cartCount = cart.length;


useEffect(()=>{
const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

setToken(storedToken);

if(storedUser){
setUser(JSON.parse(storedUser));
}else{
setUser(null);
}

},[location.pathname]);

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

{/* <FiSearch
className="text-xl cursor-pointer"
onClick={()=>setShowSearch(!showSearch)}
/> */}



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
setShowSearch(false);
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
setShowSearch(false);
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


















































// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { BsCart4 } from "react-icons/bs";
// import { FiSearch } from "react-icons/fi";
// import { PiShoppingCartSimple } from "react-icons/pi";
// import { getCategoriesService } from "../../services/categories.service";
// import { searchProductsService } from "../../services/products.service";
// import { CartContext } from "../../context/CartContext";
// import useDebounce from "../../hooks/useDebounce";

// const Navbar = () => {

//   const navigate = useNavigate();
//   const location = useLocation();

//   const { cart } = useContext(CartContext);

//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [user, setUser] = useState(null);
//   const [categories, setCategories] = useState([]);

//   const [showSearch, setShowSearch] = useState(false);
//   const [search, setSearch] = useState("");

//   const [results, setResults] = useState({
//     products: [],
//     categories: []
//   });

//   const debouncedSearch = useDebounce(search, 500);

  
//   const cartCount = cart.length;

//   useEffect(() => {

//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("token");

//     setToken(storedToken);

//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       setUser(null);
//     }

//   }, [location.pathname]);

//   useEffect(() => {

//     const fetchCategories = async () => {

//       try {

//         const data = await getCategoriesService(1, 6);

//         if (data.success) {
//           setCategories(data.categories);
//         }

//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }

//     };

//     fetchCategories();

//   }, []);

  
//   useEffect(() => {

//     const fetchSearch = async () => {

//       if (!debouncedSearch.trim()) {

//         setResults({
//           products: [],
//           categories: []
//         });

//         return;
//       }

//       try {

//         const data = await searchProductsService(debouncedSearch);

//         if (data.success) {

//           setResults({
//             products: data.products || [],
//             categories: data.categories || []
//           });

//         }

//       } catch (error) {
//         console.error(error);
//       }

//     };

//     fetchSearch();

//   }, [debouncedSearch]);

//   return (

//     <div className="fixed top-0 left-0 w-full bg-white border-b border-zinc-200 z-50 flex justify-center">

//       <div className="w-full max-w-[1200px] px-4 py-4 flex justify-between items-center text-zinc-700 font-semibold">

//         {/* Logo */}
//         <div
//           onClick={() => navigate("/")}
//           className="flex items-center gap-2 text-blue-400 text-2xl font-bold cursor-pointer"
//         >
//           <span className="text-zinc-500 text-3xl">
//             <BsCart4 />
//           </span>
//           E-comzy
//         </div>

//         {/* Categories */}
//         <div className="flex items-center gap-6">

//           {[...categories].reverse().map((cat) => (
//             <div
//               key={cat._id}
//               onClick={() => navigate(`/category/${cat._id}`)}
//               className="cursor-pointer hover:text-blue-400 transition"
//             >
//               {cat.name}
//             </div>
//           ))}

//           <div
//             onClick={() => navigate("/product")}
//             className="cursor-pointer hover:text-blue-400 transition"
//           >
//             All
//           </div>

//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-5">

//           {/* Search */}
//           <div className="relative">

//             <FiSearch
//               className="text-xl cursor-pointer"
//               onClick={() => setShowSearch(!showSearch)}
//             />

//             {showSearch && (
//               <div className="absolute right-8 -top-1 w-40 bg-zinc-50 shadow-md rounded-2xl">

//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="p-2 w-full rounded-2xl"
//                 />

//                 {(results.categories.length > 0 || results.products.length > 0) && (

//                   <div className="max-h-60 overflow-y-auto">

//                     {/* Categories */}
//                     {results.categories.map((cat) => (

//                       <div
//                         key={cat._id}
//                         onClick={() => {
//                           navigate(`/category/${cat._id}`);
//                           setShowSearch(false);
//                           setSearch("");
//                           setResults({ products: [], categories: [] });
//                         }}
//                         className="p-2 border-b hover:bg-gray-100 cursor-pointer font-semibold"
//                       >
//                         Category: {cat.name}
//                       </div>

//                     ))}

//                     {/* Products */}
//                     {results.products.map((product) => (

//                       <div
//                         key={product._id}
//                         onClick={() => {
//                           navigate(`/product/${product._id}`);
//                           setShowSearch(false);
//                           setSearch("");
//                           setResults({ products: [], categories: [] });
//                         }}
//                         className="p-2 border-b hover:bg-gray-100 cursor-pointer"
//                       >
//                         {product.title}
//                       </div>

//                     ))}

//                   </div>

//                 )}

//               </div>
//             )}

//           </div>

//           {/* Cart */}
//           <div className="relative">

//             <PiShoppingCartSimple
//               className="text-2xl cursor-pointer"
//               onClick={() => navigate("/cart")}
//             />

//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-[2px] rounded-full">
//                 {cartCount}
//               </span>
//             )}

//           </div>

//           {/* Login Button */}
//           {(!token || user?.role === "admin") && (
//             <button
//               onClick={() => navigate("/login")}
//               className="border border-blue-400 text-blue-400 px-4 py-2 rounded hover:bg-blue-400 hover:text-white transition"
//             >
//               Login
//             </button>
//           )}

//           {/* User Profile */}
//           {token && user?.role === "user" && (
//             <div
//               onClick={() => navigate("/profile")}
//               className="cursor-pointer"
//             >

//               {user?.profileImage ? (

//                 <img
//                   src={user.profileImage}
//                   alt="profile"
//                   className="w-10 h-10 rounded-full object-cover"
//                 />

//               ) : (

//                 <div className="w-10 h-10 bg-zinc-300 rounded-full flex items-center justify-center font-bold">
//                   {user?.name?.charAt(0)}
//                 </div>

//               )}

//             </div>
//           )}

//         </div>

//       </div>

//     </div>
//   );
// };

// export default Navbar;