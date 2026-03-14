import { Routes, Route, Navigate } from "react-router-dom";

import UserLayout from "./components/layout/UserLayout";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedAdmin from "./components/routes/ProtectedAdmin";

import Home from "./pages/user/Home";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import Profile from "./pages/user/Profile";
import ForgotPassword from "./pages/user/ForgotPassword";
import ChangePassword from "./components/user/ChangePassword";


import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";
import AdminProfile from "./pages/admin/AdminProfile";
import Categories from "./pages/admin/Categories";
import CategoryForm from "./pages/admin/CategoryForm";
import ProductForm from "./pages/admin/ProductForm";
import Product from "./components/product/Product";
import Category from "./components/category/Category";
import ProductDetail from "./components/product/ProductDetail";
import Cart from "./pages/user/Cart";
import Pagination from "./components/pagination/Pagination";
import CategorySidebar from "./components/layout/CategorySidebar";
import Wishlist from "./pages/user/Wishlist";

function App() {
return ( <Routes className="overflow-x-hidden">


  {/* USER LAYOUT */}
  <Route element={<UserLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/change-password" element={<ChangePassword />} />
    <Route path="/product" element={<Product/>} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/category/:id" element={<Category />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/pagi" element={<Pagination/>}/>
    <Route path="/catSidebar" element={<CategorySidebar/>}/>
    <Route path="/wishlist" element={<Wishlist/>}/>
  </Route>

  {/* ADMIN LAYOUT */}
  <Route
    path="/admin"
    element={
      <ProtectedAdmin>
        <AdminLayout />
      </ProtectedAdmin>
    }
  >
    <Route index element={<Navigate to="dashboard" />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="users" element={<Users />} />
    <Route path="products" element={<Products />} />
    <Route path="add-product" element={<ProductForm />} />
    <Route path="edit-product/:id" element={<ProductForm />} />
    <Route path="categories" element={<Categories />} />
    <Route path="add-category" element={<CategoryForm />} />  {/* NEW ROUTE */}
    <Route path="edit-category/:id" element={<CategoryForm />} />
    <Route path="orders" element={<Orders />} />
    <Route path="profile" element={<AdminProfile />} />
  </Route>

  {/* 404 */}
  <Route path="*" element={<Navigate to="/" />} />

</Routes>


);
}

export default App;
