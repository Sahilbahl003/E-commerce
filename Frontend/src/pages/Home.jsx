import React from 'react'
import {SwiperSlide,Swiper} from 'swiper/react'
import {Autoplay} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const Home = () => {
  return (
    <div className='w-full h-screen text-4xl flex justify-center'>
      <Swiper slidesPerView={2.5} spaceBetween={50} autoplay={true} modules={[Autoplay]} className=' h-[270px] w-[100vw] mt-5 px-30 mr-20'>
        <SwiperSlide className='bg-orange-400 rounded-xl'><img src='img1.png' className='h-[270px] w-[580px] rounded-xl'/></SwiperSlide>
        <SwiperSlide className='bg-orange-400 rounded-xl'><img src='img2.png' className='h-[270px] w-[580px] rounded-xl'/></SwiperSlide>
        <SwiperSlide className='bg-orange-400 rounded-xl'><img src='img3.png' className='h-[270px] w-[580px] rounded-xl'/></SwiperSlide>
        <SwiperSlide className='bg-orange-400 rounded-xl'><img src='img4.png' className='h-[270px] w-[580px] rounded-xl'/></SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Home