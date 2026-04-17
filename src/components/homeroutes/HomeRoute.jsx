import React from 'react';
import HeroSlider from './HeroSlider/HeroSlider';
import AboutUs from './AboutUs/AboutUs';
import FeaturedWorks from './FeaturedWorks/FeaturedWorks';
import HoverSliders from './HoverSliders/HoverSliders';
import OurProcess from './OurProcess/OurProcess';
import WhyChooseUs from './WhyChooseUs/WhyChooseUs';

export default function HomeRoute() {
  return (
    <div className="home-route">
      <HeroSlider />
      <AboutUs />
      <FeaturedWorks />
      <HoverSliders />
      <OurProcess />
      <WhyChooseUs />
    </div>
  );
}
