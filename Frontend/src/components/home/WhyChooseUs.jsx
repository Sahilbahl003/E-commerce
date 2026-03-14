import React from 'react'
import { useNavigate } from 'react-router-dom'

const WhyChooseUs = () => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center w-[1300px] mt-20'>
        <div className='flex justify-between w-[1300px] px-30'>
            <div className='text-4xl font-semibold text-zinc-800'>Why choose us</div>
            <button onClick={() => navigate("/product")} className='text-white bg-blue-500 w-[120px] py-4 font-semibold rounded-4xl cursor-pointer'>Shop Now</button>
        </div>
        <div className='flex w-[1300px] mt-10 px-30'>
            <div className='flex flex-col w-1/4 gap-5 hover:bg-zinc-200 duration-300 transition-all px-10 py-10'>
                <img src='/images/fast-delivery.png' className='w-32 h-32 rounded-full object-cover bg-zinc-100 '/>
                <div className='text-xl text-zinc-800 font-semibold'>Fast Delivery</div>
                <p>We take care of the set-up process,aggregating all your existing online.</p>
            </div>
            <div className='flex flex-col w-1/4 gap-5 hover:bg-zinc-200 duration-300 transition-all px-10 py-10'>
                <img src='/images/247-support.png' className='w-32 h-32 rounded-full object-cover bg-zinc-100 '/>
                <div className='text-xl text-zinc-800 font-semibold'>24/7 Online Support</div>
                <p>Respond and resolve your customer queries instantly by implementing live chat</p>
            </div>
            <div className='flex flex-col w-1/4 gap-5 hover:bg-zinc-200 duration-300 transition-all px-10 py-10'>
                 <img src='/images/star1.png' className='w-32 h-32 rounded-full object-cover bg-zinc-100 '/>
                <div className='text-xl text-zinc-800 font-semibold'>4.9 Ratings</div>
                <p>We take care of the set-up process,aggregating all your existing online.</p>
            </div>
            <div className='flex flex-col w-1/4 gap-5 hover:bg-zinc-200 duration-300 transition-all px-10 py-10'>
                 <img src='/images/trophy1.png' className='w-32 h-32 rounded-full object-cover bg-zinc-100 '/>
                <div className='text-xl text-zinc-800 font-semibold'>10 Years Services</div>
                <p>We take care of the set-up process,aggregating all your existing online.</p>
            </div>
        </div>
    </div>
  )
}

export default WhyChooseUs