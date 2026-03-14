import { useEffect, useState } from "react";
import { getProductsService } from "../../services/products.service";

const CategorySidebar = ({ category }) => {

  const [products,setProducts] = useState([]);

  const [filters,setFilters] = useState({
    minPrice:"",
    maxPrice:"",
    title:"",
    page:1
  });

  const [totalPages,setTotalPages] = useState(1);

  const fetchProducts = async () => {

    const data = await getProductsService({
      category,
      ...filters
    });

    setProducts(data.products);
    setTotalPages(data.totalPages);

  };

  useEffect(()=>{
    fetchProducts();
  },[filters,category]);

  return (

    <div className="flex gap-6">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow p-4 rounded">

        <h2 className="font-bold mb-4">Filters</h2>

        {/* Title search */}
        <input
          type="text"
          placeholder="Search product"
          className="border p-2 w-full mb-3"
          onChange={(e)=>setFilters({...filters,title:e.target.value})}
        />

        {/* Price filter */}
        <input
          type="number"
          placeholder="Min price"
          className="border p-2 w-full mb-3"
          onChange={(e)=>setFilters({...filters,minPrice:e.target.value})}
        />

        <input
          type="number"
          placeholder="Max price"
          className="border p-2 w-full"
          onChange={(e)=>setFilters({...filters,maxPrice:e.target.value})}
        />

      </div>


      {/* Products */}
      <div className="flex-1">

        {/* Sort Dropdown */}
        <div className="mb-4">

          <select
          className="border p-2"
          onChange={(e)=>setFilters({...filters,sort:e.target.value})}
          >

            <option value="">Sort</option>
            <option value="priceLow">Price Low to High</option>
            <option value="priceHigh">Price High to Low</option>

          </select>

        </div>


        {/* Product Grid */}
        <div className="grid grid-cols-3 gap-6">

          {products.map(product=>(
            <div key={product._id} className="border p-4 rounded">

              <img
              src={product.image}
              alt={product.title}
              className="h-40 object-cover w-full"
              />

              <h3 className="font-semibold mt-2">
                {product.title}
              </h3>

              <p className="text-green-600">
                ₹{product.price}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>

  );

};

export default CategorySidebar;