import React from "react";
import slide1 from "../../assets/slider-image-1.jpeg";
import slide2 from "../../assets/slider-image-2.jpeg";
import slide3 from "../../assets/slider-image-3.jpeg";
import slide4 from "../../assets/grocery-banner.png";
import slide5 from "../../assets/grocery-banner-2.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <div className="row  mb-0">
        <div className="w-3/4">
          <Slider {...settings}>
            <img
              src={slide1}
              className="w-full h-[400px] object-cover"
              alt="slider-image-1"
            />
            <img
              src={slide4}
              className="w-full h-[400px] object-cover"
              alt="slider-image-1"
            />
            <img
              src={slide5}
              className="w-full h-[400px] object-cover"
              alt="slider-image-1"
            />
          </Slider>
        </div>
        <div className="w-1/4">
          <img src={slide2} className="w-full h-[200px]" alt="slider-image-2" />
          <img src={slide3} className="w-full h-[200px]" alt="slider-image-3" />
        </div>
      </div>
      {/* <Slider {...settings}></Slider> */}
    </>
  );
}
