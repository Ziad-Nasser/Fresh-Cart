import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function ProductDetails() {
  const { id, category } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  let getProduct = (id) => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((error) => {
        return error;
      });
  };

  let getAllProducts = () => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter(
          (product) => product.category.name == category,
        );
        setRelatedProducts(related);
      })
      .catch((res) => {});
  };

  useEffect(() => {
    getProduct(id);
    getAllProducts();
  }, [id, category]); //update

  return (
    <>
      <div className="row items-center">
        <div className="w-1/4">
          <Slider {...settings}>
            {product?.images.map((src) => (
              <img key={product.id} src={src} className="w-full"></img>
            ))}
          </Slider>
        </div>
        <div className="w-3/4 p-4 ">
          <h3 className="font-semibold capitalize text-2xl">
            {product?.title}
          </h3>
          <h4 className="text-gray-700 my-4">{product?.description}</h4>
          <h4 className="">{product?.category.name}</h4>
          <div className="flex justify-between p-3 my-5">
            <span>{product?.price} EGP</span>
            <span>
              <i className="fas fa-star text-yellow-400"></i>
              {product?.ratingsAverage}
            </span>
          </div>
          <button className="btn">Add To Cart</button>
        </div>
      </div>

      <div className="row">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <div key={product.id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6">
              <div className="product p-2 my-2">
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <img
                    src={product.imageCover}
                    className="w-full "
                    alt={product.name}
                  />
                  <h3 className="productCategory text-emerald-700">
                    {product.category.name}
                  </h3>
                  <h3 className="font-semibold mb-1 overflow-hidden">
                    {product.title.split(" ").slice(0, 2).join("")}
                  </h3>
                  <div className="flex justify-between p-3">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-400"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button className="btn">Add To Cart</button>
              </div>
            </div>
          ))
        ) : (
          <div className="sk-fading-circle">
            <div className="sk-circle1 sk-circle"></div>
            <div className="sk-circle2 sk-circle"></div>
            <div className="sk-circle3 sk-circle"></div>
            <div className="sk-circle4 sk-circle"></div>
            <div className="sk-circle5 sk-circle"></div>
            <div className="sk-circle6 sk-circle"></div>
            <div className="sk-circle7 sk-circle"></div>
            <div className="sk-circle8 sk-circle"></div>
            <div className="sk-circle9 sk-circle"></div>
            <div className="sk-circle10 sk-circle"></div>
            <div className="sk-circle11 sk-circle"></div>
            <div className="sk-circle12 sk-circle"></div>
          </div>
        )}
      </div>
    </>
  );
}
