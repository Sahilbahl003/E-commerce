import React from 'react'
import {SwiperSlide,Swiper} from 'swiper/react'
import {Autoplay} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Hero from '../components/Hero';
import Categories from '../components/Categories';


const Home = () => {
  return (
    <div className='w-full h-screen flex justify-center'>
      {/* <Swiper slidesPerView={2.5} spaceBetween={50} autoplay={true} modules={[Autoplay]} className=' h-[270px] w-[100vw] mt-5 px-30 mr-20'>
        <SwiperSlide className='bg-orange-400 rounded-xl'><img src='img1.png' className='h-[270px] w-[580px] rounded-xl'/></SwiperSlide>
        <SwiperSlide className='bg-orange-400 rounded-xl'><img src='img2.png' className='h-[270px] w-[580px] rounded-xl'/></SwiperSlide>
        <SwiperSlide className='bg-orange-400 rounded-xl'><img src='img3.png' className='h-[270px] w-[580px] rounded-xl'/></SwiperSlide>
        <SwiperSlide className='bg-orange-400 rounded-xl'><img src='img4.png' className='h-[270px] w-[580px] rounded-xl'/></SwiperSlide>
      </Swiper> */}
      <div className='w-[1300px] mt-5'>
        <Hero/>
        <Categories/>
      </div>
      
    </div>
  )
}

export default Home