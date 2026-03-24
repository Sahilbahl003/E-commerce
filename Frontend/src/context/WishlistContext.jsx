import { createContext, useState, useEffect } from "react";
import {
  getWishlistService,
  toggleWishlistService
} from "../services/wishlist.service";
import { toast } from "react-toastify";

export const WishlistContext = createContext();

const WishlistContextProvider = ({ children }) => {

  const [wishlist, setWishlist] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // FIX: SAME INTERVAL LIKE USER CONTEXT
  useEffect(() => {

    const interval = setInterval(() => {

      const currentToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (currentToken !== token) {
        setToken(currentToken);
      }

      setUser(storedUser ? JSON.parse(storedUser) : null);

    }, 200);

    return () => clearInterval(interval);

  }, [token]);


  const fetchWishlist = async () => {

    const storedUser = localStorage.getItem("user");
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    if (!token || currentUser?.role !== "user") {
      setWishlist([]);
      return;
    }

    try {
      const data = await getWishlistService();
      setWishlist(data.products ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleWishlist = async (productId, showToast = true) => {

    const storedUser = localStorage.getItem("user");
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (currentUser?.role !== "user") {
      toast.error("Only users can add items to wishlist");
      return;
    }

    try {
      const res = await toggleWishlistService(productId);

      if (showToast) {
        toast.success(res.message);
      }

      fetchWishlist();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        fetchWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;