import { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";

const Wishlist = () => {

  const { wishlist } = useContext(WishlistContext);

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        My Wishlist
      </h1>

      <div className="grid grid-cols-4 gap-6">

        {wishlist.length === 0 && (
          <p>No items in wishlist</p>
        )}

        {wishlist.map((product) => (

          <div key={product._id} className="border p-4 rounded">

            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover"
            />

            <h3 className="mt-2 font-semibold">
              {product.title}
            </h3>

            <p className="text-gray-600">
              ₹{product.price}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

};

export default Wishlist;