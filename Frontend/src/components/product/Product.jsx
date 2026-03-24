import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { getProductsService } from "../../services/products.service";
import { getCategoriesService } from "../../services/categories.service";
import FilterSidebar from "../layout/FilterSidebar";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
  title: "",
  minPrice: 0,
  maxPrice: 10000,
  sort: "",
  category: [],
  subCategory: []
});


  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProductsService(1, 100);
      setProducts(data.products || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // FETCH CATEGORIES
  const fetchCategories = async () => {
    try {
      const data = await getCategoriesService(1, 100);
      if (data.success) {
        setCategories(data.categories);

        // extract subcategories
        const uniqueSubs = Array.from(
  new Map(subs.map(item => [item.name, item])).values()
);

setSubCategories(uniqueSubs);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // FILTER LOGIC
  const filteredProducts = products
  .filter((p) =>
    p.title.toLowerCase().includes(filters.title.toLowerCase())
  )
  .filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice)
  .filter((p) => {
    if (filters.subCategory.length > 0) {
      return filters.subCategory.includes(p.subcategory?._id);
    }

    if (filters.category.length > 0) {
      return filters.category.includes(p.category?._id);
    }

    return true;
  })
  .sort((a, b) => {
    if (filters.sort === "priceLow") return a.price - b.price;
    if (filters.sort === "priceHigh") return b.price - a.price;
    return 0;
  });

  return (
    <div className="flex gap-5 px-5 mt-10 mb-20">
      
      {/* SIDEBAR */}
     <FilterSidebar
  filters={filters}
  setFilters={setFilters}
  categories={categories}
/>


      {/* PRODUCTS */}
      <div className="flex-1">
        <h2 className="text-3xl font-semibold mb-6">All Products</h2>

        {loading ? (
          <div className="flex justify-center items-center h-[70vh]">
            <ClipLoader color="#2563eb" size={50} />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {filteredProducts.length === 0 ? (
              <p>No products found</p>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="bg-white p-4 shadow hover:shadow-lg cursor-pointer rounded-lg transition-all"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-40 w-full object-contain mb-3"
                  />

                  <h3 className="text-sm line-clamp-2 h-[40px]">
                    {product.title}
                  </h3>

                  <p className="text-lg font-bold text-green-600 mt-2">
                    ₹{product.price}
                  </p>

                  <p className="text-xs text-gray-500">
                    {product.category?.name}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;