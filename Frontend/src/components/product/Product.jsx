import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { getProductsService } from "../../services/products.service";
import { getCategoriesService } from '../../services/categories.service';

const Product = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {

    try {

      const data = await getCategoriesService(1,100);
      console.log(data);

      if (data.success) {
        setCategories(data.categories);
      } else {
        console.error(data.message || "Failed to fetch categories");
      }

    } catch (error) {
      console.error("Error fetching categories:", error);
    }

  };

  const fetchProducts = async () => {

    try {

      setLoading(true);

      const data = await getProductsService(1,100);
      console.log(data);

      setProducts(data.products || []);
      setLoading(false);


    } catch (error) {

      console.error("error fetching products:", error);
      setLoading(false);

    }

  };

  return (

    <div className='flex flex-col justify-center items-center w-[100vw] mt-10 mb-20'>

      <h2 className="text-5xl font-semibold text-zinc-800 mb-10">
        All Products
      </h2>

      {loading ? (

        <div className='flex justify-center items-center h-[70vh]'>
          <ClipLoader color='#2563eb' size={50}/>
        </div>

      ) : (

        <div className='w-[85vw] flex flex-col gap-16'>

          {categories.map((category) => {

            const categoryProducts = products.filter(
              (product) => product.category?._id === category._id
            );

            if (categoryProducts.length === 0) return null;

            return (

              <div key={category._id} className='bg-blue-400 flex flex-col items-center justify-center pb-10 rounded-2xl'>
                   
                <div className='w-full flex justify-between'>
                  <h2 className='text-3xl font-semibold text-white mb-6 w-full flex justify-start p-3'>
                  {category.name}
                </h2>
                 <div onClick={()=>navigate(`/category/${category._id}`)} className='bg-white w-20 h-10 rounded-3xl mt-3 mr-3 flex items-center justify-center cursor-pointer'>
                  <p className='text-2xl'>➜</p>
                 </div>
                </div>   
                
                <div className='grid grid-cols-5 gap-10 w-[80vw] bg-white px-5 py-5 shadow shadow-zinc-400 rounded-2xl'>

                  {categoryProducts.map((product) => (

                    <div
                      key={product._id}
                      className='shadow-md bg-zinc-100 shadow-zinc-400 p-5 w-[200px] hover:scale-105 hover:shadow-lg hover:shadow-zinc-800 transition-all duration-300 cursor-pointer rounded-2xl'
                      onClick={() => navigate(`/product/${product._id}`)}
                    >

                      <img src={product.image} width="300" height="100" />
                       
                       <div className='bg-white p-2'>
                        <h2 className='text-sm pb-4 break-words [overflow-wrap:anywhere]  p-2'>
                        {product.title}
                      </h2>
                      <p className='text-xl mt-1 font-bold text-green-500'>
                        ₹{product.price}
                      </p>
                       </div>
                      

                      {/* <div className='flex items-center gap-2 mt-2'>
                        <p className='text-lg italic text-zinc-600'>
                          {product.description.length > 100
                            ? `${product.description.substring(0, 100)}...`
                            : product.description}
                        </p>
                      </div> */}

                      

                    </div>

                  ))}

                </div>

              </div>

            );

          }).reverse()}

        </div>

      )}

    </div>

  )

}

export default Product