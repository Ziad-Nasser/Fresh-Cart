import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";

export default function RecentProducts() {
  let { data, isError, error, isLoading } = useProducts();
  let { addProductToCart, setItemsNumber, ItemsNumber } =
    useContext(CartContext);
  let { addToWishlist, deleteProduct, productWishIds } =
    useContext(WishListContext);
  const [loading, setloading] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  let addToCart = async (id) => {
    setCurrentId(id);
    setloading(true);
    let response = await addProductToCart(id);
    if (response.data.status == "success") {
      setItemsNumber(ItemsNumber + 1);
      toast.success(response.data.message);
      setloading(false);
    } else {
      toast.error(response.data.message);
      setloading(false);
    }
  };

  let toggleWishlist = async (id) => {
    setCurrentId(id);

    setWishlistLoading(true);
    try {
      if (productWishIds.includes(id)) {
        await deleteProduct(id);
        toast.success("Product removed from wishlist");
      } else {
        await addToWishlist(id);
        toast.success("Product added to wishlist");
      }
    } catch (error) {
      toast.error("Error updating wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  if (isError) {
    return <h3>{error}</h3>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        {data?.data?.data?.map((product) => (
          <div
            key={product.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
          >
            <div className="product p-2 my-2 relative">
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-2 right-2 z-10"
                disabled={wishlistLoading}
              >
                {wishlistLoading && currentId == product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i
                    className={`icon fas fa-heart text-2xl ${
                      productWishIds.includes(product.id)
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  ></i>
                )}
              </button>
              <Link
                to={`productdetails/${product.id}/${product.category.name}`}
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
    </>
  );
}
