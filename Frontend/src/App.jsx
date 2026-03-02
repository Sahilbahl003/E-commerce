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
import Men from './pages/Men'
import { Women } from './pages/Women'
import Children from './pages/Children'
import ForgotPassword from './pages/ForgotPassword'
import ScrollToTop from './components/ScrollToTop'


function App() {
  return (
    <div>
    <div className='flex flex-col w-full items-center justify-center mb-20'>
      <Navbar/>
      <hr className='w-[1300px]'/>
    </div>
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/men' element={<Men/>}/>
        <Route path='/women' element={<Women/>}/>
        <Route path='/children' element={<Children/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </ScrollToTop>
      <div className='mt-300'>
        <Footer/>
      </div>
    </div>
  )
}

export default App
