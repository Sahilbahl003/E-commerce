import { createContext, useState, useEffect } from "react";
import {
  getCartService,
  addToCartService,
  updateCartService,
  removeCartItemService,
  mergeCartService
} from "../services/cart.service";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      setToken(currentToken);
      setUser(storedUser ? JSON.parse(storedUser) : null);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("cartMerged");
    }
  }, [token]);

  const fetchCart = async () => {

    const storedUser = localStorage.getItem("user");
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    if (!token) {
      const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCart(localCart);
      return;
    }

    if (currentUser?.role !== "user") {
      setCart([]);
      return;
    }

    try {
      const data = await getCartService();

      const items =
        data?.cart?.items?.map((item) => ({
          _id: item.product._id,
          title: item.product.title,
          price: item.product.price,
          image: item.product.image,
          quantity: item.quantity,
        })) || [];

      setCart(items);

    } catch (error) {
      console.log(error);
    }
  };

  const mergeCartOnLogin = async () => {

    const alreadyMerged = localStorage.getItem("cartMerged");

    const storedUser = localStorage.getItem("user");
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (
      token &&
      currentUser?.role === "user" &&
      localCart.length > 0 &&
      !alreadyMerged
    ) {
      try {

        const formattedCart = localCart.map(item => ({
          productId: item._id,
          quantity: item.quantity
        }));

        await mergeCartService(formattedCart);

        localStorage.removeItem("cartItems");

        localStorage.setItem("cartMerged", "true");

      } catch (error) {
        console.log(error);
      }
    }
  };

  const addToCart = async (product) => {

    const storedUser = localStorage.getItem("user");
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    if (!token) {
      const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];

      const exist = localCart.find(item => item._id === product._id);

      let updatedCart;

      if (exist) {
        updatedCart = localCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...localCart, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      setCart([...updatedCart]);
      return;
    }

    if (currentUser?.role !== "user") return;

    try {
      await addToCartService({
        productId: product._id,
        quantity: 1
      });

      fetchCart();

    } catch (error) {
      console.log(error);
    }
  };

  const increaseQty = async (id) => {

    const item = cart.find(p => p._id === id);
    if (!item) return;

    if (!token) {
      const updatedCart = cart.map(item =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      setCart([...updatedCart]);
      return;
    }

    try {
      await updateCartService({
        productId: id,
        quantity: item.quantity + 1
      });

      fetchCart();

    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQty = async (id) => {

    const item = cart.find(p => p._id === id);
    if (!item) return;

    if (!token) {
      let updatedCart;

      if (item.quantity <= 1) {
        updatedCart = cart.filter(i => i._id !== id);
      } else {
        updatedCart = cart.map(i =>
          i._id === id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        );
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      setCart([...updatedCart]);
      return;
    }

    try {
      if (item.quantity <= 1) {
        await removeCartItemService(id);
      } else {
        await updateCartService({
          productId: id,
          quantity: item.quantity - 1
        });
      }

      fetchCart();

    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (id) => {

    if (!token) {
      const updatedCart = cart.filter(item => item._id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      setCart([...updatedCart]);
      return;
    }

    try {
      await removeCartItemService(id);
      fetchCart();

    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = async () => {

  console.log("CLEAR CART START");

  try {

    // always fetch latest cart from backend
    const res = await getCartService();

    console.log("Backend cart:", res);

    const items = res?.cart?.items || [];

    for (const item of items) {

      const productId = item.product._id;

      console.log("Removing:", productId);

      await removeCartItemService(productId);

    }

    console.log("All items removed");

    setCart([]);

  } catch (error) {

    console.log("CLEAR CART ERROR:", error);

  }

};

  useEffect(() => {

    const run = async () => {

      const storedUser = localStorage.getItem("user");
      const currentUser = storedUser ? JSON.parse(storedUser) : null;

      if (!token) {
        const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCart(localCart);
        return;
      }

      if (currentUser?.role !== "user") {
        setCart([]);
        return;
      }

      await mergeCartOnLogin();
      await fetchCart();

    };

    run();

  }, [token]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        fetchCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
























// import { createContext, useState, useEffect } from "react";
// import {
//   getCartService,
//   addToCartService,
//   updateCartService,
//   removeCartItemService,
//   mergeCartService
// } from "../services/cart.service";

// export const CartContext = createContext();

// const CartContextProvider = ({ children }) => {

//   const [cart, setCart] = useState([]);
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   // ✅ INTERVAL (kept same, just stable)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const currentToken = localStorage.getItem("token");
//       const storedUser = localStorage.getItem("user");

//       setToken(currentToken);
//       setUser(storedUser ? JSON.parse(storedUser) : null);
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   // ✅ RESET MERGE FLAG ON LOGOUT
//   useEffect(() => {
//     if (!token) {
//       localStorage.removeItem("cartMerged");
//     }
//   }, [token]);

//   // ✅ FETCH CART
//   const fetchCart = async () => {

//     const storedUser = localStorage.getItem("user");
//     const currentUser = storedUser ? JSON.parse(storedUser) : null;

//     // GUEST
//     if (!token) {
//       const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
//       setCart(localCart);
//       return;
//     }

//     // BLOCK ADMIN
//     if (currentUser?.role !== "user") {
//       setCart([]);
//       return;
//     }

//     try {
//       const data = await getCartService();

//       const items =
//         data?.cart?.items?.map((item) => ({
//           _id: item.product._id,
//           title: item.product.title,
//           price: item.product.price,
//           image: item.product.image,
//           quantity: item.quantity,
//         })) || [];

//       setCart(items);

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ✅ MERGE CART (FIXED PROPERLY)
//   const mergeCartOnLogin = async () => {

//     const alreadyMerged = localStorage.getItem("cartMerged");

//     const storedUser = localStorage.getItem("user");
//     const currentUser = storedUser ? JSON.parse(storedUser) : null;

//     const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];

//     if (
//       token &&
//       currentUser?.role === "user" &&
//       localCart.length > 0 &&
//       !alreadyMerged
//     ) {
//       try {

//         const formattedCart = localCart.map(item => ({
//           productId: item._id,
//           quantity: item.quantity
//         }));

//         await mergeCartService(formattedCart);

//         localStorage.removeItem("cartItems");

//         localStorage.setItem("cartMerged", "true");

//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   // ✅ ADD TO CART
//   const addToCart = async (product) => {

//     const storedUser = localStorage.getItem("user");
//     const currentUser = storedUser ? JSON.parse(storedUser) : null;

//     // GUEST
//     if (!token) {
//       const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];

//       const exist = localCart.find(item => item._id === product._id);

//       let updatedCart;

//       if (exist) {
//         updatedCart = localCart.map(item =>
//           item._id === product._id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         updatedCart = [...localCart, { ...product, quantity: 1 }];
//       }

//       localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//       setCart([...updatedCart]); // ✅ force re-render
//       return;
//     }

//     // BLOCK ADMIN
//     if (currentUser?.role !== "user") return;

//     try {
//       await addToCartService({
//         productId: product._id,
//         quantity: 1
//       });

//       fetchCart();

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ✅ INCREASE QTY
//   const increaseQty = async (id) => {

//     const item = cart.find(p => p._id === id);
//     if (!item) return;

//     if (!token) {
//       const updatedCart = cart.map(item =>
//         item._id === id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );

//       localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//       setCart([...updatedCart]);
//       return;
//     }

//     try {
//       await updateCartService({
//         productId: id,
//         quantity: item.quantity + 1
//       });

//       fetchCart();

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ✅ DECREASE QTY
//   const decreaseQty = async (id) => {

//     const item = cart.find(p => p._id === id);
//     if (!item) return;

//     if (!token) {
//       let updatedCart;

//       if (item.quantity <= 1) {
//         updatedCart = cart.filter(i => i._id !== id);
//       } else {
//         updatedCart = cart.map(i =>
//           i._id === id
//             ? { ...i, quantity: i.quantity - 1 }
//             : i
//         );
//       }

//       localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//       setCart([...updatedCart]);
//       return;
//     }

//     try {
//       if (item.quantity <= 1) {
//         await removeCartItemService(id);
//       } else {
//         await updateCartService({
//           productId: id,
//           quantity: item.quantity - 1
//         });
//       }

//       fetchCart();

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ✅ REMOVE ITEM
//   const removeFromCart = async (id) => {

//     if (!token) {
//       const updatedCart = cart.filter(item => item._id !== id);
//       localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//       setCart([...updatedCart]);
//       return;
//     }

//     try {
//       await removeCartItemService(id);
//       fetchCart();

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ✅ MAIN EFFECT (FIXED FLOW)
//   useEffect(() => {

//     const run = async () => {

//       const storedUser = localStorage.getItem("user");
//       const currentUser = storedUser ? JSON.parse(storedUser) : null;

//       if (!token) {
//         const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
//         setCart(localCart);
//         return;
//       }

//       if (currentUser?.role !== "user") {
//         setCart([]);
//         return;
//       }

//       await mergeCartOnLogin();
//       await fetchCart();

//     };

//     run();

//   }, [token]);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         increaseQty,
//         decreaseQty,
//         removeFromCart,
//         fetchCart
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartContextProvider;







































































// // import { createContext, useState, useEffect } from "react";
// // import {
// //   getCartService,
// //   addToCartService,
// //   updateCartService,
// //   removeCartItemService,
// //   mergeCartService
// // } from "../services/cart.service";

// // export const CartContext = createContext();

// // const CartContextProvider = ({ children }) => {

// //   const [cart, setCart] = useState([]);
// //   const [token, setToken] = useState(localStorage.getItem("token"));

// //   const [user, setUser] = useState(() => {
// //     const storedUser = localStorage.getItem("user");
// //     return storedUser ? JSON.parse(storedUser) : null;
// //   });

// //   //  SAME AS WISHLIST (interval based)
// //   useEffect(() => {

// //     const interval = setInterval(() => {

// //       const currentToken = localStorage.getItem("token");
// //       const storedUser = localStorage.getItem("user");

// //       if (currentToken !== token) {
// //         setToken(currentToken);
// //       }

// //       setUser(storedUser ? JSON.parse(storedUser) : null);

// //     }, 200);

// //     return () => clearInterval(interval);

// //   }, [token]);



// //   // FETCH CART (LIKE WISHLIST)
// //   const fetchCart = async () => {

// //     // NOT LOGGED IN
// //     if (!token) {
// //       const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
// //       setCart(localCart);
// //       return;
// //     }

// //     //  BLOCK ADMIN
// //     if (user?.role !== "user") {
// //       setCart([]);
// //       return;
// //     }

// //     try {

// //       const data = await getCartService();
// //       console.log("data",data);

// //       const items =
// //         data?.cart?.items?.map((item) => ({
// //           _id: item.product._id,
// //           title: item.product.title,
// //           price: item.product.price,
// //           image: item.product.image,
// //           quantity: item.quantity,
// //         })) || [];
// //         console.log("items",items);

// //       setCart(items);

// //     } catch (error) {
// //       console.log(error);
// //     }

// //   };



// //   //  MERGE ON LOGIN
// //   const mergeCartOnLogin = async () => {

// //     const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
// //     console.log("local cart",localCart);

// //     if (token && user?.role === "user" && localCart.length > 0) {

// //       try {

// //         const formattedCart = localCart.map(item => ({
// //           productId: item._id,
// //           quantity: item.quantity
// //         }));

// //         console.log("formatted cart",formattedCart);

// //         await mergeCartService(formattedCart);

// //         localStorage.removeItem("cartItems");

// //       } catch (error) {
// //         console.log(error);
// //       }

// //     }

// //   };



// //   //  ADD TO CART
// //   const addToCart = async (product) => {

// //     //  GUEST
// //     if (!token) {

// //       const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
// //       console.log("localCart",localCart)
// //       const exist = localCart.find(item => item._id === product._id);

// //       let updatedCart;

// //       if (exist) {
// //         updatedCart = localCart.map(item =>
// //           item._id === product._id
// //             ? { ...item, quantity: item.quantity + 1 }
// //             : item
// //         );
// //       } else {
// //         updatedCart = [...localCart, { ...product, quantity: 1 }];
// //       }

// //       localStorage.setItem("cartItems", JSON.stringify(updatedCart));
// //       setCart(updatedCart);
// //       return;
// //     }

// //     // BLOCK ADMIN
// //     if (user?.role !== "user") {
// //       return;
// //     }

// //     try {

// //       await addToCartService({
// //         productId: product._id,
// //         quantity: 1
// //       });

// //       fetchCart(); // same as wishlist refresh

// //     } catch (error) {
// //       console.log(error);
// //     }

// //   };



// //   // INCREASE QTY
// //   const increaseQty = async (id) => {

// //     const item = cart.find(p => p._id === id);
// //     if (!item) return;

// //     if (!token) {

// //       const updatedCart = cart.map(item =>
// //         item._id === id
// //           ? { ...item, quantity: item.quantity + 1 }
// //           : item
// //       );

// //       localStorage.setItem("cartItems", JSON.stringify(updatedCart));
// //       setCart(updatedCart);
// //       return;
// //     }

// //     try {

// //       await updateCartService({
// //         productId: id,
// //         quantity: item.quantity + 1
// //       });

// //       fetchCart();

// //     } catch (error) {
// //       console.log(error);
// //     }

// //   };



// //   // DECREASE QTY
// //   const decreaseQty = async (id) => {

// //     const item = cart.find(p => p._id === id);
// //     if (!item) return;

// //     if (!token) {

// //       let updatedCart;

// //       if (item.quantity <= 1) {
// //         updatedCart = cart.filter(i => i._id !== id);
// //       } else {
// //         updatedCart = cart.map(i =>
// //           i._id === id
// //             ? { ...i, quantity: i.quantity - 1 }
// //             : i
// //         );
// //       }

// //       localStorage.setItem("cartItems", JSON.stringify(updatedCart));
// //       setCart(updatedCart);
// //       return;
// //     }

// //     try {

// //       if (item.quantity <=1) {
// //         await removeCartItemService(id);
// //       } else {
// //         await updateCartService({
// //           productId: id,
// //           quantity: item.quantity - 1
// //         });
// //       }

// //       fetchCart();

// //     } catch (error) {
// //       console.log(error);
// //     }

// //   };



// //   // REMOVE ITEM
// //   const removeFromCart = async (id) => {

// //     if (!token) {

// //       const updatedCart = cart.filter(item => item._id !== id);
// //       localStorage.setItem("cartItems", JSON.stringify(updatedCart));
// //       setCart(updatedCart);
// //       return;
// //     }

// //     try {

// //       await removeCartItemService(id);
// //       fetchCart();

// //     } catch (error) {
// //       console.log(error);
// //     }

// //   };



// //   //  MAIN EFFECT (LIKE WISHLIST)
// //   useEffect(() => {

// //     const run = async () => {

// //       if (token && user?.role === "user") {
// //         await mergeCartOnLogin();
// //       }

// //       if (!token) {
// //         //  LOGOUT → EMPTY CART
// //         setCart([]);
// //         localStorage.removeItem("cartItems");
// //         return;
// //       }

// //       fetchCart();

// //     };

// //     run();

// //   }, [token]);



// //   return (
// //     <CartContext.Provider
// //       value={{
// //         cart,
// //         addToCart,
// //         increaseQty,
// //         decreaseQty,
// //         removeFromCart,
// //         fetchCart
// //       }}
// //     >
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };

// // export default CartContextProvider;