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

  useEffect(() => {

    const handleStorage = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };

  }, []);


  const fetchWishlist = async () => {

    if (!token) {
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


  const toggleWishlist = async (productId) => {

    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {

      const res = await toggleWishlistService(productId);

      toast.success(res.message);

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