import React from "react";
import Hero from "../../components/home/Hero";
import Categories from "../../components/home/Categories";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import Testimonials from "../../components/home/Testimonials";

const Home = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1300px] px-6 pt-28 pb-16">
        <Hero />
        <Categories />
        <WhyChooseUs />
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;