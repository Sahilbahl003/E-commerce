import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../../context/WishlistContext";
import { CartContext } from "../../context/CartContext";
import { AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import { PiShoppingCartSimple } from "react-icons/pi";

const Wishlist = () => {

  const navigate = useNavigate();

  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const token = localStorage.getItem("token");


  // MOVE TO CART
  const moveToCart = async (product) => {

  if (!token) {
    navigate("/login");
    return;
  }

  const res = await addToCart(product);   // backend message

  await toggleWishlist(product._id, false); // remove silently

  if (res?.message) {
    toast.success(res.message);
  }

};


  // REMOVE FROM WISHLIST
  const removeFromWishlist = (id) => {

    if (!token) {
      navigate("/login");
      return;
    }

    toggleWishlist(id);

  };


  return (

    <div className="max-w-[1100px] mx-auto mt-28 p-6">

      <h1 className="text-3xl font-bold mb-8 text-center">
        My Wishlist
      </h1>

      {wishlist.length === 0 && (
        <div className="flex flex-col items-center">
            <p className="text-center text-lg text-gray-500">No items in wishlist</p>
            <button className="text-blue-500 border-blue-500 border-1 px-4 py-2 mt-2 max-w-[190px] cursor-pointer"  onClick={() => navigate("/product")}>Continue Shopping</button>
        </div>
        
      )}

      <div className="grid grid-cols-4 gap-6">

        {wishlist.map((product) => (

          <div
            key={product._id}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition bg-white"
          >

            {/* IMAGE */}
            <div className="w-full h-48 flex items-center justify-center bg-gray-50">

              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />

            </div>

            {/* TITLE */}
            <h3 className="mt-3 font-semibold line-clamp-2">
              {product.title}
            </h3>

            {/* PRICE */}
            <p className="text-gray-600 mt-1">
              ₹{product.price}
            </p>

            {/* MOVE TO CART */}
            <button
              onClick={() => moveToCart(product)}
              className="mt-3 cursor-pointer w-full bg-blue-500 flex gap-2 px-2 items-center justify-center text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Move to Cart
              <PiShoppingCartSimple
              className="text-2xl cursor-pointer"
              />
            </button>

            {/* REMOVE */}
            <button
              onClick={() => removeFromWishlist(product._id)}
              className="mt-2 w-full cursor-pointer bg-pink-500  px-2 text-white py-2 rounded hover:bg-pink-600 transition flex gap-2 justify-center items-center"
            >
              Remove from Wishlist 
              <AiOutlineHeart className="text-xl" />
            </button>

          </div>

        ))}

      </div>

    </div>

  );

};

export default Wishlist;