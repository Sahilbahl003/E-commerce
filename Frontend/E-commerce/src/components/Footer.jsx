import React from 'react'
import { MdLocalPhone } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";
import { BsCart4 } from "react-icons/bs";

const Footer = () => {
  return (
    <div className='w-full h-[250px] bg-purple-300 pt-4 flex justify-evenly'>
        <div className=''>
            <div  className='text-purple-700 text-3xl pt-4 flex gap-3'><span className='text-purple-700 text-3xl'><BsCart4 /></span>Ecomzy</div>
            <div className='text-purple-700 pt-4 hover:text-purple-600 flex items-center justify-start cursor-pointer'><span className='text-purple-700 text-lg'><MdLocalPhone /></span>+91-9817766364</div>
            <div className='text-purple-700 pt-4 hover:text-purple-600 flex items-center justify-start cursor-pointer'><span className='text-purple-700 text-lg'><MdOutlineMailOutline /></span>sahilbahl003@gmail.com</div>
        </div>

        <div className='text-purple-700'>
            <div className='text-2xl pt-4 pb-2'>Social Links</div>
            <div className='flex items-center cursor-pointer'><span className='pr-2 text-lg text-pink-400'><FaInstagram /></span>Instagram</div>
            <div className='flex items-center cursor-pointer'><span className='pr-2 text-lg '><FaXTwitter /></span>Twitter</div>
            <div className='flex items-center cursor-pointer'><span className='pr-2 text-lg text-blue-500'><ImFacebook2  /></span>Facebook</div>
        </div>

        <div className='text-purple-700'>
            <div className='text-2xl pt-4 pb-2'>Address</div>
            <div className='flex items-center cursor-pointer'><span className=' text-lg'></span>Ecomzy , Supreme Tower</div>
            <div className='flex items-center cursor-pointer'><span className=' text-lg '></span>Sector-67, Mohali-160062</div>
            <div className='flex items-center cursor-pointer'><span className=' text-lg '></span>India</div>
        </div>
    </div>
  )
}

export default Footer