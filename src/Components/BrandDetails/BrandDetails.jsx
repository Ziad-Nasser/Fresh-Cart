import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import useBrands from "../../Hooks/useBrands";

export default function BrandDetails() {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const { addProductToCart, setItemsNumber, ItemsNumber } =
    useContext(CartContext);
  const [loading, setLoading] = useState(false);
  let { isLoading } = useBrands();

  let getBrand = (id) => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
      .then((res) => {
        setBrand(res?.data?.data[0]?.brand);
        setProducts(res.data.data);
      })
      .catch((err) => {
        return err;
      });
  };
  async function addToCart(id) {
    toast.promise(addProductToCart(id), {
      loading: "Loading",
      success: "Product added to cart successfully",
      error: "Error in add Product try again ",
    });
    setItemsNumber(ItemsNumber + 1);
  }
  useEffect(() => {
    getBrand(id);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="row flex-col items-center">
        {brand && (
          <div>
            <img src={brand.image} className="w-full" alt={brand.name} />
          </div>
        )}
        {products.length > 0 ? (
          <div className="flex flex-wrap justify-center">
            {products.map((product, index) => (
              <div
                key={index}
                className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2"
              >
                <div className="categoryList product relative p-1 bg-white shadow rounded-lg">
                  <i
                    onClick={() => addToCart(product.id)}
                    className="fa-solid fa-cart-plus p-2 rounded bg-gray-800 text-white text-xl absolute top-2 right-2 shadow cursor-pointer"
                  ></i>
                  <Link
                    to={`/productdetails/${product.id}/${product.category.name}`}
                  >
                    <div className="p-3 bg-gray-100 rounded-lg mb-2">
                      <img
                        src={product.imageCover}
                        className="w-full"
                        alt={product.title}
                      />
                      {product.priceAfterDiscount < product.price &&
                        product.priceAfterDiscount > 0 && (
                          <span className="absolute top-2 left-2 bg-red-600 text-white text-sm px-2 py-1 rounded">
                            -
                            {(
                              (1 - product.priceAfterDiscount / product.price) *
                              100
                            ).toFixed(0)}
                            %
                          </span>
                        )}
                    </div>
                    <h2 className="text-sm font-bold text-blue-600">
                      {product.category.name}
                    </h2>
                    <h3 className="text-lg font-semibold">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="flex justify-between items-center px-1 mt-2">
                      {product.priceAfterDiscount ? (
                        <>
                          <p className="line-through text-gray-500">
                            {product.price} EGP
                          </p>
                          <p className="text-red-600">
                            {product.priceAfterDiscount} EGP
                          </p>
                        </>
                      ) : (
                        <p>{product.price} EGP</p>
                      )}
                      <p className="text-yellow-500">
                        <i className="fa-solid fa-star"></i>{" "}
                        {product.ratingsAverage}
                      </p>
                    </div>
                  </Link>
                  <button onClick={() => addToCart(product.id)} className="btn">
                    {loading && currentId == product.id ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      "Add To Cart"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-3/4 p-4">
            <h2 className="bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-full text-center text-2xl">
              Unfortunately, there are currently no products available for this
              brand.
            </h2>
          </div>
        )}
      </div>
    </>
  );
}
