import React from 'react'
import { MdLocalPhone } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { SiFacebook } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsCart4 } from "react-icons/bs";


const Footer = () => {
  return (
<div className='w-full h-[350px]  pt-4 flex flex-col '>
    <div className='top flex bg-sky-950 py-10'>
        <div className='w-1/2 flex px-40 gap-20'>

            <div className='text-white flex flex-col gap-3'>
                <div className='text-2xl pt-4 pb-2'>Links</div>
                <div className='flex items-center cursor-pointer'><span className='pr-2 text-lg '></span>Home</div>
                <div className='flex items-center cursor-pointer'><span className='pr-2 text-lg '></span>Services</div>
                <div className='flex items-center cursor-pointer'><span className='pr-2 text-lg '></span>Shop</div>
                <div className='flex items-center cursor-pointer'><span className='pr-2 text-lg '></span>Sale</div>
            </div>

            <div className='text-white flex flex-col gap-3'>
                <div className='text-2xl pt-4 pb-2'>Categories</div>
                <div className='flex items-center cursor-pointer'><span className='pr-2 text-lg '></span>Men</div>
                <div className='flex items-center cursor-pointer'><span className='pr-2 text-lg '></span>Women</div>
                <div className='flex items-center cursor-pointer'><span className='pr-2 text-lg '></span>Children</div>
                <div className='flex items-center cursor-pointer'><span className='pr-2 text-lg '></span>Winter</div>
            </div>

            <div className='text-white flex flex-col gap-3'>
                <div className='text-2xl pt-4 pb-2'>Shop</div>
                <div className='flex items-center cursor-pointer'><span className='pr-2 text-lg '></span>Contact</div>
                <div className='flex items-center cursor-pointer'><span className='pr-2 text-lg '></span>Help</div>
                <div className='flex items-center cursor-pointer'><span className='pr-2 text-lg '></span>Customers</div>
                <div className='flex items-center cursor-pointer'><span className='pr-2 text-lg '></span>Forum</div>
            </div>
            
        </div>

        <div className=' border-r-2 border-white'></div>
         
        <div className='text-white flex gap-10 w-1/2  px-20'>
                <div>
                    <div  className=' text-3xl pt-4 flex gap-3'><span className=' text-3xl'><BsCart4 /></span>Ecomzy</div>
                    <div className=' pt-4  flex items-center justify-start cursor-pointer'><span className=' text-lg'><MdLocalPhone /></span>+91-9817766364</div>
                    <div className='pt-4  flex items-center justify-start cursor-pointer'><span className=' text-lg'><MdOutlineMailOutline /></span>sahilbahl003@gmail.com</div>
                </div>

                <div>
                    <div className='text-xl pt-4 pb-2'>Address</div>
                    <div className='flex items-center cursor-pointer'><span className=' text-lg'></span>Ecomzy , Supreme Tower</div>
                    <div className='flex items-center cursor-pointer'><span className=' text-lg '></span>Sector-67, Mohali-160062</div>
                    <div className='flex items-center cursor-pointer'><span className=' text-lg '></span>India</div>
                </div>
            
                
        </div>
    </div>

    <div className='bottom bg-slate-950 w-full h-[60px] flex items-center justify-center'>
          <div className='text-white flex gap-5 text-2xl'>
              <SiFacebook />
              <FaXTwitter />
              <FaInstagram />
              <BiLogoLinkedin />
          </div>
    </div>
        
          
            

            
</div>

        

        
        
    
  )
}

export default Footer