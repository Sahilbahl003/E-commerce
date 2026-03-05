import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
const Products = () => {  
    const [products, setProducts] = useState([]);  
    const [title, setTitle] = useState("");  
    const [price, setPrice] = useState("");
  useEffect(() => {    
    axios.get("/admin/products").then((res) => setProducts(res.data));  }, []);

  const createProduct = async () => {    
    const res = await axios.post("/admin/product", { title, price });   
     setProducts([...products, res.data]);  };

  return (    <div className="px-30">      
            <h1 className="text-xl font-bold mb-4 mt-50">Products</h1>
      <div className="mb-4">       
      <input          placeholder="Title"          className="border p-2 mr-2"          onChange={(e) => setTitle(e.target.value)}        />        
      <input          placeholder="Price"          className="border p-2 mr-2"          onChange={(e) => setPrice(e.target.value)}        />       
     <button onClick={createProduct} className="bg-black text-white px-4 py-2">          Add        </button>      </div>
      {products.map((p) => (        
    <div key={p._id} className="bg-white p-4 shadow mb-2">          
    {p.title} - ₹{p.price}        </div>      ))}    
    </div>  );};
export default Products;