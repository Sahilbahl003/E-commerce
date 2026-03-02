import React from 'react'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col justify-center items-center'>
        <h2 className=' text-5xl font-semibold text-zinc-800 mt-10 mb-10'>Popular categories</h2>
        <div className='flex gap-x-6'>
            <div onClick={()=>navigate("/men")}  className='w-36 h-60 flex flex-col justify-start pt-5 rounded-[70px] items-center bg-amber-50 shadow-2xl hover:scale-105 transition duration-500'>
                <img src='/images/Cat-1.png' className='w-32 h-32 rounded-full object-cover '/>
                <p className='text-lg font-semibold text-zinc-800 py-5'>Men</p>
            </div>
            <div onClick={()=>navigate("/wommen")} className='w-36 h-60 flex flex-col justify-start pt-5 rounded-[70px] items-center bg-amber-50 shadow-2xl hover:scale-105 transition duration-500'>
                <img src='/images/Cat-2.png' className='w-32 h-32 rounded-full object-cover'/>
                <p className='text-lg font-semibold text-zinc-800 py-5'>Women</p>
            </div>
            <div onClick={()=>navigate("/children")} className='w-36 h-60 flex flex-col justify-start pt-5 rounded-[70px] items-center bg-amber-50 shadow-2xl hover:scale-105 transition duration-500'>
                <img src='/images/Cat-3.png' className='w-32 h-32 rounded-full object-cover'/>
                <p className='text-lg font-semibold text-zinc-800 py-5'>Children</p>
            </div>
             <div className='w-36 h-60 flex flex-col justify-start pt-5 rounded-[70px] items-center bg-amber-50 shadow-2xl hover:scale-105 transition duration-500'>
                <img src='/images/Cat-4.png' className='w-32 h-32 rounded-full object-cover'/>
                <p className='text-lg font-semibold text-zinc-800 py-5'>Aged</p>
            </div>
             <div className='w-36 h-60 flex flex-col justify-start pt-5 rounded-[70px] items-center bg-amber-50 shadow-2xl hover:scale-105 transition duration-500'>
                <img src='/images/Cat-555.png' className='w-32 h-32 rounded-full object-cover'/>
                <p className='text-lg font-semibold text-zinc-800 py-5'>Summer</p>
            </div>
             <div className='w-36 h-60 flex flex-col justify-start pt-5 rounded-[70px] items-center bg-amber-50 shadow-2xl hover:scale-105 transition duration-500'>
                <img src='/images/Cat-6.png' className='w-32 h-32 rounded-full object-cover'/>
                <p className='text-lg font-semibold text-zinc-800 py-5'>Winter</p>
            </div>
        </div>
    </div>
  )
}

export default Categories