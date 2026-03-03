import { Swiper, SwiperSlide } from 'swiper/react'
import {Mousewheel,Autoplay} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaQuoteLeft } from "react-icons/fa";
import { quoteItems } from '../helpers/constant';
import { FaQuoteRight } from "react-icons/fa";


const Testimonials = () => {
  return (
    <div className='about w-[1300px] items-center justify-center mt-15'>
      <div className="w-[1300px] items-center justify-center">

          <div className="clients-review w-[1300px] items-center justify-center gap-y-10">
            <div className=" w-[1300px] flex items-center justify-center">
                <p className='text-4xl font-semibold text-zinc-800'>What our clients say</p>
            </div>
            <div className="quotes items-center justify-center">
            <Swiper  slidesPerView={1} spaceBetween={50} mousewheel={{forceToAxis: true,sensitivity: 1,releaseOnEdges: true,}} modules={[Mousewheel,Autoplay]} >
              {
                quoteItems.map((item,index)=>(
                <SwiperSlide className="quotes" key={index} >
                  <div className="quote-border flex flex-col items-center justify-center gap-y-5">
                   <div className='quote-img px-15 flex justify-start w-[1000px] text-blue-300 text-xl'>
                    <FaQuoteLeft/>
                   </div> 
                    <div className="quote1 px-20 w-[1000px] italic text-xl">{item.quote}</div>
                    <div className='quote-img px-15 flex justify-end w-[1000px] text-blue-300 text-xl'>
                    <FaQuoteRight/>
                   </div>
                    <div className='quote-by px-20 text-lg'>{item.author}<span className='address'>{item.location}</span></div>
                  </div>
                </SwiperSlide>

                ))
              }
            </Swiper> 
            </div>
          </div>

          {/* <div className="circles">
            {
              colorShades.map((item,index)=>(
                <div className='orange-circle' style={{background:item}}  key={index}></div>
              ))
            }
          </div> */}
        </div>
    </div>
  )
}

export default Testimonials