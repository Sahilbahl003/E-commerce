import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryByIdService, getCategoriesService } from "../../services/categories.service";
import { getProductsService } from "../../services/products.service";
import ClipLoader from "react-spinners/ClipLoader";
import FilterSidebar from "../../components/layout/FilterSidebar";
import useDebounce from "../../hooks/useDebounce";
import WishlistButton from "../ui/buttons/WishlistButton";

const Category = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [subCategories, setSubCategories] = useState([]);

  
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem("filters");

    return savedFilters
      ? JSON.parse(savedFilters)
      : {
          title: "",
          minPrice: 0,
          maxPrice: 10000,
          sort: "",
          page: 1,
          limit: 9,
          subCategory: [] 
        };
  });


  const debouncedFilters = useDebounce(filters, 1000);

  // Save filters
  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  // fetch category
  const fetchCategory = async () => {
    try {
      const data = await getCategoryByIdService(id);

      if (data.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetch subcategories
  const fetchSubCategories = async () => {
    try {
      const data = await getCategoriesService(1, 50, id);

      if (data.success) {
        setSubCategories(data.categories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetch products
  // fetch products
const fetchProducts = async () => {
  try {
    setLoading(true);

    // Prepare category filter: always include main category + any selected subcategories
    const categoryIds = [id]; // main category

    if (filters.subCategory && filters.subCategory.length > 0) {
      categoryIds.push(...filters.subCategory); // add selected subcategories
    }

    const data = await getProductsService({
      ...debouncedFilters,
      category: categoryIds // send array of IDs
    });

    if (data.success) {
      setProducts(data.products);
    }

    setLoading(false);
  } catch (error) {
    console.error(error);
    setLoading(false);
  }
};

  // init
  useEffect(() => {
    fetchCategory();
    fetchSubCategories();
  }, [id]);

  // refetch on filters change
  useEffect(() => {
  if (subCategories.length >= 0) {
    fetchProducts();
  }
}, [debouncedFilters, id, subCategories]);

  return (

    <div className="flex w-full gap-8 mt-[90px] mb-20 px-6">

      {/*  PASS subCategories */}
      <FilterSidebar
        filters={filters}
        setFilters={setFilters}
        subCategories={subCategories}
      />

      <div className="flex-1">

        <h2 className="text-4xl font-semibold mb-6">
          {category?.name}
        </h2>

        <div className="relative">

          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-white/60 z-10">
              <ClipLoader color="#2563eb" size={40} />
            </div>
          )}

          <div className="grid grid-cols-3 gap-6">

            {products.length > 0 ? (

              products.map((product) => (
                <div
                  key={product._id}
                  className="shadow-md p-4 hover:scale-105 transition cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >

                  <img
                    src={product.image}
                    width="300"
                    height="100"
                    alt={product.title}
                  />

                  <h3 className="text-xl mt-2">
                    {product.title}
                  </h3>

                  <p className="text-zinc-600 text-sm">
                    {product.description.substring(0, 80)}...
                  </p>

                  <p className="text-green-600 mt-2 font-semibold">
                    ₹{product.price}
                  </p>

                  <div
                    className="mt-3 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <WishlistButton product={product} />
                  </div>

                </div>
              ))

            ) : (

              <p className="text-lg text-gray-500">
                No products found
              </p>

            )}

          </div>

        </div>

      </div>

    </div>

  );

};

export default Category;