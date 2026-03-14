import { useContext } from "react";
import { WishlistContext } from "../../../context/WishlistContext";

const WishlistButton = ({ product }) => {

  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const isWishlisted = wishlist.some(
  (item) => item._id?.toString() === product._id?.toString()
);

  return (

    <button
      onClick={() => toggleWishlist(product._id)}
      className="bg-pink-500 text-white px-3 py-1 rounded"
    >

      {isWishlisted ? "Remove Wishlist" : "Add Wishlist"}

    </button>

  );

};

export default WishlistButton;