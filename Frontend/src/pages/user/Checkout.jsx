import React, { useEffect, useState, useContext } from "react";
import OrderSummary from "./OrderSummary";
import { getProfileService } from "../../services/profile.service";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/auth";
import { toast } from "react-toastify";
import { createOrderService } from "../../services/order.service";
import { CartContext } from "../../context/CartContext";
import { validateField, validateForm } from "../../utils/validation";

const Checkout = () => {

const navigate = useNavigate();
const { cart, clearCart } = useContext(CartContext);

const [paymentMethod, setPaymentMethod] = useState("upi");

const [form, setForm] = useState({
name: "",
phone: "+91 ",
pinCode: "",
house: "",
area: "",
locality: "",
city: "",
state: "",
addressType: "home",
defaultAddress: false
});

const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);

useEffect(() => {

const token = getToken();

if (!token) {
navigate("/login");
return;
}

fetchProfile();

}, []);

const fetchProfile = async () => {

try {

const data = await getProfileService();

if (!data.success) {
toast.error(data.message);
return;
}

setForm((prev) => ({
...prev,
name: data.user?.name || ""
}));

} catch {
toast.error("Failed to load profile");
}

};

const handleChange = (e) => {

const { name, value, type, checked } = e.target;

const val = type === "checkbox" ? checked : value;

const updated = { ...form, [name]: val };

setForm(updated);

const error = validateField(name, val, updated);

setErrors((prev) => ({
...prev,
[name]: error
}));

};

const handlePinCode = (e) => {

const value = e.target.value.replace(/\D/g, "");

if (value.length <= 6) {

const updated = { ...form, pinCode: value };

setForm(updated);

const error = validateField("pinCode", value, updated);

setErrors((prev) => ({
...prev,
pinCode: error
}));

}

};

const handlePhone = (e) => {

let value = e.target.value.replace(/[^\d+]/g, "");

if (!value.startsWith("+91")) {
value = "+91 ";
}

if (value.length <= 14) {

const updated = { ...form, phone: value };

setForm(updated);

const error = validateField("phone", value, updated);

setErrors((prev) => ({
...prev,
phone: error
}));

}

};

const handlePlaceOrder = async () => {

const validationErrors = validateForm(form);

if (Object.keys(validationErrors).length > 0) {
setErrors(validationErrors);
toast.error("Please fill all required fields correctly");
return;
}

if (!cart.length) {
toast.error("Cart is empty");
return;
}

try {

setLoading(true);

const subtotal = cart.reduce(
(acc, item) => acc + item.price * item.quantity,
0
);

const shippingFee = subtotal > 0 ? 100 : 0;
const tax = subtotal * 0.05;
const total = subtotal + shippingFee + tax;

const orderData = {

items: cart.map((item) => ({
product: item._id,
title: item.title,
price: item.price,
quantity: item.quantity,
image: item.image
})),

shippingAddress: {
name: form.name,
phone: form.phone,
pinCode: form.pinCode,
house: form.house,
area: form.area,
locality: form.locality,
city: form.city,
state: form.state,
type: form.addressType
},

paymentMethod,
subtotal,
shippingFee,
tax,
total

};

const res = await createOrderService(orderData);


// Stripe Payment
if (res.checkoutUrl) {

window.location.href = res.checkoutUrl;
return;

}


// COD Order
if (res.success && res.order) {

toast.success("Order placed successfully");

await clearCart();

navigate(`/orders/${res.order._id}`);

}

} catch (error) {

toast.error(error.message);

} finally {

setLoading(false);

}

};

return (

<div className="max-w-[1300px] mx-auto mt-10 mb-10 px-6">

<div className="flex gap-10 items-start">

{/* LEFT ADDRESS FORM */}

<div className="flex-1 bg-white border rounded-lg p-6">

<h2 className="text-lg font-semibold mb-6">CONTACT DETAILS</h2>

<div className="space-y-4">

<input
name="name"
value={form.name}
onChange={handleChange}
placeholder="Name*"
className="w-full border p-3 rounded"
/>
{errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

<input
name="phone"
value={form.phone}
onChange={handlePhone}
placeholder="+91 Mobile Number*"
className="w-full border p-3 rounded"
/>
{errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

</div>

<h2 className="text-lg font-semibold mt-8 mb-6">ADDRESS</h2>

<div className="space-y-4">

<input
name="pinCode"
value={form.pinCode}
onChange={handlePinCode}
placeholder="Pin Code*"
className="w-full border p-3 rounded"
/>
{errors.pinCode && <p className="text-red-500 text-xs">{errors.pinCode}</p>}

<input
name="house"
value={form.house}
onChange={handleChange}
placeholder="House Number / Tower / Block*"
className="w-full border p-3 rounded"
/>
{errors.house && <p className="text-red-500 text-xs">{errors.house}</p>}

<input
name="area"
value={form.area}
onChange={handleChange}
placeholder="Address (locality, building, street)*"
className="w-full border p-3 rounded"
/>
{errors.area && <p className="text-red-500 text-xs">{errors.area}</p>}

<input
name="locality"
value={form.locality}
onChange={handleChange}
placeholder="Locality / Town*"
className="w-full border p-3 rounded"
/>
{errors.locality && <p className="text-red-500 text-xs">{errors.locality}</p>}

<div className="flex gap-4">

<input
name="city"
value={form.city}
onChange={handleChange}
placeholder="City / District*"
className="w-1/2 border p-3 rounded"
/>
{errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}

<input
name="state"
value={form.state}
onChange={handleChange}
placeholder="State*"
className="w-1/2 border p-3 rounded"
/>
{errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}

</div>

</div>

<h2 className="text-md font-semibold mt-8 mb-3">ADDRESS TYPE</h2>

<div className="flex gap-6">

<label className="flex items-center gap-2">

<input
type="radio"
name="addressType"
value="home"
checked={form.addressType === "home"}
onChange={handleChange}
/>

Home

</label>

<label className="flex items-center gap-2">

<input
type="radio"
name="addressType"
value="office"
checked={form.addressType === "office"}
onChange={handleChange}
/>

Office

</label>

</div>

<div className="mt-4">

<label className="flex items-center gap-2">

<input
type="checkbox"
name="defaultAddress"
checked={form.defaultAddress}
onChange={handleChange}
/>

Make this as my default address

</label>

</div>

</div>

{/* RIGHT ORDER SUMMARY */}

<div className="w-[350px] sticky top-20">

<OrderSummary
paymentMethod={paymentMethod}
setPaymentMethod={setPaymentMethod}
showPaymentMethods={true}
/>

<button
onClick={handlePlaceOrder}
disabled={loading}
className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded font-semibold"
>

{loading ? "Placing..." : "Place Order"}

</button>

</div>

</div>

</div>

);

};

export default Checkout;

// in Make this as my default address checkbox when user check it only then its addres should be save in data base as default address