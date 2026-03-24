import React, { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const PaymentSuccess = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useContext(CartContext);

  const orderId = searchParams.get("orderId");

  useEffect(() => {

  console.log("Payment success page loaded");

  if (!orderId) return;

  const handleSuccess = async () => {

    console.log("Clearing cart...");

    await clearCart();

    console.log("Cart cleared");

    setTimeout(() => {
      navigate(`/orders/${orderId}`);
    }, 2000);

  };

  handleSuccess();

}, [orderId]);

  return (

    <div className="flex flex-col items-center justify-center h-[70vh]">

      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful 
      </h1>

      <p className="text-gray-600 mt-2">
        Your order has been placed.
      </p>

      <p className="text-gray-500 mt-1">
        Redirecting to order details...
      </p>

    </div>

  );
};

export default PaymentSuccess;