import React, { useContext, useEffect, useState } from "react";
import { WishListContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function WishList() {
  const { productWish, deleteProduct, getUserWishlist } =
    useContext(WishListContext);
  const { addProductToCart, setItemsNumber, ItemsNumber } =
    useContext(CartContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getWishlistItems();
  }, []);

  const getWishlistItems = async () => {
    setLoading(true);
    await getUserWishlist();
    setLoading(false);
  };

  const removeFromWishlist = async (productId, event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await deleteProduct(productId);
      toast.success("Product removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove product from wishlist");
    }
  };

  const moveToCart = async (productId, event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await addProductToCart(productId);
      await deleteProduct(productId);
      toast.success("Product moved to cart");
    } catch (error) {
      toast.error("Failed to move product to cart");
    }
  };

  const clearWishlist = async () => {
    try {
      for (const product of productWish) {
        await deleteProduct(product.id);
      }
      await getUserWishlist();
      toast.success("Wishlist cleared successfully");
    } catch (error) {
      toast.error("Failed to clear wishlist");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>WhishList</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {productWish && productWish.length > 0 ? (
          <>
            <h2 className="text-center text-4xl text-emerald-600 font-bold capitalize mb-8">
              Your Wishlist
            </h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="w-full  text-base text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productWish.map((product) => (
                    <tr
                      key={product.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        <Link
                          to={`/productdetails/${product.id}/${product.category.name}`}
                          className="flex items-center"
                        >
                          <img
                            src={product.imageCover}
                            className="w-16 h-16 object-cover mr-4 rounded"
                            alt={product.title}
                          />
                          <span>{product.title}</span>
                        </Link>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                          <button
                            onClick={(e) => moveToCart(product.id, e)}
                            className="font-medium bg-emerald-600 hover:bg-emerald-800 text-white py-2 px-4 rounded-lg transition duration-300"
                          >
                            Move to Cart
                          </button>
                          <button
                            onClick={(e) => removeFromWishlist(product.id, e)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={clearWishlist}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Clear Wishlist
              </button>
              <Link
                to="/products"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-3xl text-red-700 font-bold mb-4">
              Your Wishlist Is Empty
            </h1>
            <Link
              to="/products"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Explore Products
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
