import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  let getCategories = () => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h2 className="font-semibold text-gray-600">Shop Popular Categories</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category.name}>
            <Link to={`${category._id}`}>
              <img
                src={category.image}
                className="w-full h-[200px] object-cover"
                alt={category.name}
              />
              <h4>{category.name}</h4>
            </Link>
          </div>
        ))}
      </Slider>
    </>
  );
}
