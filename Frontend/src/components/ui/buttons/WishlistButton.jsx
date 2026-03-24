import { useContext } from "react";
import { toast } from "react-toastify";
import { WishlistContext } from "../../../context/WishlistContext";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

const WishlistButton = ({ product }) => {

  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  console.log(token);
  console.log(user);

  const isWishlisted = wishlist.some(
    (item) => item._id?.toString() === product._id?.toString()
  );

  const handleWishlist = () => {

    if (!token) {
      toast.error("Please login first");
      return;
    }
    console.log(token);
    

    toggleWishlist(product._id);

  };

  return (

    <button
      onClick={handleWishlist}
      className={`cursor-pointer text-white px-3 py-1 rounded flex gap-2 items-center justify-center 
  ${isWishlisted ? "bg-gray-500" : "bg-pink-500"}`} 
>

    

      {isWishlisted ? "Wishlisted" : "Add Wishlist"}
      {isWishlisted?<AiFillHeart className="text-xl text-pink-500" />:<AiOutlineHeart className="text-xl text-white" />}

    </button>

  );

};

export default WishlistButton;