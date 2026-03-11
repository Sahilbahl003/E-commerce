import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { MdDelete } from "react-icons/md";

import {
  getProductsService,
  deleteProductService
} from "../../services/products.service";

const Products = () => {

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const data = await getProductsService();

        setProducts(data.products || []);

      } catch (error) {
        console.log("Error fetching products", error);
      }

    };

    fetchProducts();

  }, []);

  const deleteProduct = async (id) => {

    try {

      await deleteProductService(id);

      setProducts(products.filter((p) => p._id !== id));

    } catch (error) {

      console.log("Error deleting product", error);

    }

  };

  return (

    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">Product List</h1>

        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Add Product
        </button>

      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr className="text-left">

              <th className="p-4">Image</th>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr key={product._id} className="border-t">

                <td className="p-4">

                  <img
                    src={product.image || "https://via.placeholder.com/50"}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded"
                  />

                </td>

                <td className="p-4 font-medium">{product.title}</td>

                <td className="p-4">{product.category?.name || "N/A"}</td>

                <td className="p-4">₹{product.price}</td>

                <td className="p-4">{product.stockQuantity}</td>

                <td className="p-4 space-x-3">

                  <button
                    onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    <GoPencil />
                  </button>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-red-500 hover:underline cursor-pointer"
                  >
                    <MdDelete />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Products;