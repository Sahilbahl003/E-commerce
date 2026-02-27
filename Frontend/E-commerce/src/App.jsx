import { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Register from './pages/Register'
import Login from './pages/Login'
import Products from './pages/Products'
import About from './pages/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ForgetPassword from './pages/ForgetPassword'


function App() {
  return (
    <div>
    <div className='flex flex-col w-full items-center justify-center'>
      <Navbar/>
      <hr className='w-[1300px]'/>
    </div>
    
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/forgot-password' element={<ForgetPassword/>}/>
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
