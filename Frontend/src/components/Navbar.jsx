import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BsCart4 } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { PiShoppingCartSimple } from "react-icons/pi";

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div className='fixed top-0 flex py-8 justify-between bg-white text-zinc-700 font-semibold w-[1300px]'>
        <div onClick={()=>navigate("/")} className='text-blue-400 text-2xl font-bold flex gap-3 cursor-pointer'><span className='text-zinc-500 text-4xl font-bold'><BsCart4 /></span>E-comzy</div>
        <div className='flex justify-center items-center gap-4'>
            <div className='cursor-pointer' onClick={()=>navigate("/men")}>Men</div>
            <div className='cursor-pointer' onClick={()=>navigate("/women")}>Women</div>
            <div className='cursor-pointer' onClick={()=>navigate("/children")}>Children</div>
            <div className='cursor-pointer' onClick={()=>navigate("/")}>All</div>
            
        </div>
        <div className='flex gap-8 items-center justify-center'>
            <div><FiSearch className='text-2xl' /></div>
            {/* <div><GoPerson className='text-2xl' /></div> */}
            <button  className=' cursor-pointer bg-white text-blue-400 rounded-sm font-semibold border border-blue-400 hover:bg-blue-400 hover:text-white px-4 py-2' onClick={()=>navigate("/login")}>Login</button>
            <div><PiShoppingCartSimple className='text-2xl' /></div>
        </div>
    </div>
  )
}

export default Navbar