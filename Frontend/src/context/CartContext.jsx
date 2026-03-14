import React, { createContext, useState, useEffect } from "react";
import {
  getCartService,
  mergeCartService,
  updateCartService,
  removeCartItemService
} from "../services/cart.service";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));



  // 🔥 WATCH TOKEN CHANGE (LOGIN / LOGOUT) INSTANTLY
  useEffect(() => {

    const interval = setInterval(() => {

      const currentToken = localStorage.getItem("token");

      setToken((prev) => {
        if (prev !== currentToken) {
          return currentToken;
        }
        return prev;
      });

    }, 200);

    return () => clearInterval(interval);

  }, []);




  // 🔥 INITIALIZE CART
  useEffect(() => {

    const initCart = async () => {

      const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];

      // GUEST USER
      if (!token) {
        setCart(localCart);
        return;
      }

      try {

        // MERGE GUEST CART
        if (localCart.length > 0) {
          await mergeCartService(localCart);
          localStorage.removeItem("cartItems");
        }

        const data = await getCartService();

        const items =
          data?.cart?.items?.map((item) => ({
            _id: item.product._id,
            title: item.product.title,
            price: item.product.price,
            image: item.product.image,
            quantity: item.quantity,
          })) || [];

        // 🔥 MERGE DUPLICATE PRODUCTS
        const merged = items.reduce((acc, item) => {

          const exist = acc.find((p) => p._id === item._id);

          if (exist) {
            exist.quantity += item.quantity;
          } else {
            acc.push({ ...item });
          }

          return acc;

        }, []);

        setCart(merged);

      } catch (error) {
        console.log(error);
      }

    };

    initCart();

  }, [token]);




  // ADD TO CART
  const addToCart = (product) => {

    setCart((prev) => {

      const exist = prev.find((item) => item._id === product._id);

      if (exist) {

        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

      }

      return [...prev, { ...product, quantity: 1 }];

    });

  };




  // INCREASE QTY
  const increaseQty = async (id) => {

    const item = cart.find((p) => p._id === id);
    if (!item) return;

    const newQty = item.quantity + 1;

    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: newQty }
          : item
      )
    );

    if (token) {
      try {
        await updateCartService({
          productId: id,
          quantity: newQty,
        });
      } catch (error) {
        console.log(error);
      }
    }

  };




  // DECREASE QTY
  const decreaseQty = async (id) => {

    const item = cart.find((p) => p._id === id);
    if (!item) return;

    const newQty = item.quantity - 1;

    let updatedCart;

    if (newQty <= 0) {
      updatedCart = cart.filter((item) => item._id !== id);
    } else {
      updatedCart = cart.map((item) =>
        item._id === id
          ? { ...item, quantity: newQty }
          : item
      );
    }

    setCart(updatedCart);

    if (token) {
      try {

        if (newQty <= 0) {
          await removeCartItemService(id);
        } else {
          await updateCartService({
            productId: id,
            quantity: newQty,
          });
        }

      } catch (error) {
        console.log(error);
      }
    }

  };




  // REMOVE ITEM
  const removeFromCart = async (id) => {

    const updatedCart = cart.filter((item) => item._id !== id);

    setCart(updatedCart);

    if (token) {
      try {
        await removeCartItemService(id);
      } catch (error) {
        console.log(error);
      }
    }

  };




  // STORE GUEST CART
  useEffect(() => {

    if (!token) {

      if (cart.length === 0) {
        localStorage.removeItem("cartItems");
      } else {
        localStorage.setItem("cartItems", JSON.stringify(cart));
      }

    }

  }, [cart, token]);




  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart
      }}
    >

      {children}

    </CartContext.Provider>

  );

};

export default CartContextProvider;