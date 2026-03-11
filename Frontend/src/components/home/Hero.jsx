import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col mt-15 w-full'>

     <div className='flex'>
           <div className='text-7xl font-sans font-bold w-100px text-zinc-800 '>

          <div className='flex'>
            <div className=' mt-10'>
                You can feel  
            </div>
            <span className='pl-10'>
                    <img src='/images/Hero1.png' width='130px'/>
            </span>
          </div>
             <div><span className='text-orange-300'>fashion </span>sense.</div>
        </div>
        <div className='ml-30'>
            <p className='text-zinc-500 mt-20  text-xl'>E-comzy is the best place for you to find your fashion <br/>clothes with reasonable price and trust</p>
            <div className='flex mt-5 gap-4 text-xs'>
                <button className='text-white bg-blue-500 w-[120px] py-4 font-semibold rounded-4xl '>Shop Now</button>
                <button className='text-zinc-700 border-1 border-zinc-700 font-semibold bg-white text-zinc-700 w-[120px] rounded-4xl '>Learn More</button>
            </div> 
        </div>
     </div>

     <div className='mt-20 flex w-[1300px]'>
        <img src='images/Hero2.png' className='w-[50%] ' />
        <img src='images/Hero3.png' className='w-[25%] mt-40 h-[450px]' />
        <img src='images/Hero4.png' className='w-[25%] mt-40 h-[450px]' />
     </div>
    
    </div>


  )
}

export default Hero