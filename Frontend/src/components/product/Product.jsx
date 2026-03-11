import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { getProductsService } from "../../services/products.service";

const Product = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      setLoading(true);

      const data = await getProductsService();
      console.log(data);

      setProducts(data.products || []);

      setLoading(false);

    } catch (error) {

      console.error("error fetching products:", error);
      setLoading(false);

    }

  };

  return (

    <div className='flex flex-col justify-center items-center w-[100vw] mt-25 mb-5'>

      <h1 className='text-3xl'>Products</h1>

      {loading ? (

        <div className='flex justify-center items-center h-[70vh]'>

          <ClipLoader color='#2563eb' size={50}/>

        </div>

      ) : (

        <div className='grid grid-cols-3 gap-10 mt-4 w-[80vw] flex-wrap justify-start'>

          {products.map((product) => (

            <div
              key={product._id}
              className='shadow-md shadow-zinc-400 p-5 w-[400px] hover:scale-105 hover:shadow-lg hover:shadow-zinc-800 transition-all duration-300 cursor-pointer'
              onClick={() => navigate(`/products/${product._id}`)}
            >

              <img src={product.image} width="300" height="300" />

              <h2 className='text-2xl pb-4 break-words [overflow-wrap:anywhere]'>
                {product.title}
              </h2>

              <div className='flex items-center gap-2 mt-2'>

                <p className='text-lg italic text-zinc-600'>
                  {product.description.length > 100
                    ? `${product.description.substring(0, 100)}...`
                    : product.description}
                </p>

              </div>

              <p className='text-sm mt-1'>
                ₹{product.price}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  )
}

export default Product