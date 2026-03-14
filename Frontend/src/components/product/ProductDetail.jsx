import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductByIdService } from "../../services/products.service";
import { addToCartService } from "../../services/cart.service";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { CartContext } from "../../context/CartContext";
import WishlistButton from "../../components/ui/buttons/WishlistButton";

const ProductDetail = () => {

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const { addToCart } = useContext(CartContext);

  const fetchProduct = async () => {

    try {

      setLoading(true);

      const data = await getProductByIdService(id);

      if (data.success) {
        setProduct(data.product);
      }

      setLoading(false);

    } catch (error) {

      console.error("Error fetching product:", error);
      setLoading(false);

    }

  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleClick = async () => {

    try {

      addToCart(product);

      await addToCartService({
        productId: product._id,
        quantity: 1
      });

      setIsClicked(true);

      toast.success("Item added to cart");

      setTimeout(() => {
        setIsClicked(false);
      }, 1000);

    } catch (error) {

      console.error("Add to cart error:", error);

    }

  };

  const buttonClasses = isClicked
    ? "bg-gray-500"
    : "bg-blue-500";

  return (

    <div>

      {loading ? (

        <div className="flex justify-center items-center h-[70vh]">
          <ClipLoader color="#2563eb" size={50} />
        </div>

      ) : product ? (

        <div className="flex gap-x-10 justify-center items-start mt-10 mb-10">

          <div className="shadow-md shadow-zinc-400 p-5 w-[400px]">

            <img src={product.image} alt={product.title} width="400" />

          </div>

          <div className="w-[400px] flex flex-col gap-y-5">

            <h2 className="text-2xl font-bold">{product.title}</h2>

            <p className="text-gray-600">{product.description}</p>

            <p className="text-xl font-bold">
              ₹ {product.price.toFixed(2)}
            </p>

            {/* Buttons row */}
            <div className="flex gap-4">

              <button
                onClick={handleClick}
                className={`${buttonClasses} text-white px-6 py-2 rounded-md transition`}
              >
                Add to Cart
              </button>

              <WishlistButton product={product} />

            </div>

          </div>

        </div>

      ) : (
        <p>Product not found</p>
      )}

    </div>

  );

};

export default ProductDetail;