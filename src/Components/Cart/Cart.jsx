import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet-async";

export default function Cart() {
  const {
    getLoggedUserCart,
    updateCartProductQuantity,
    deleteCartItem,
    clearCart,
    setItemsNumber,
    ItemsNumber,
  } = useContext(CartContext);

  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    try {
      setLoading(true);
      const response = await getLoggedUserCart();
      if (response?.data?.status === "success") {
        setCartDetails(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to fetch cart items");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, count) => {
    if (count <= 0) {
      await deleteItem(id);
    } else {
      try {
        const response = await updateCartProductQuantity(id, count);
        if (response?.data?.status === "success") {
          setCartDetails(response.data.data);
          toast.success("Product updated successfully");
        } else {
          throw new Error("Failed to update product");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const deleteItem = async (productId) => {
    try {
      const response = await deleteCartItem(productId);
      if (response?.data?.status === "success") {
        setItemsNumber(ItemsNumber - 1);
        setCartDetails(response.data.data);
        toast.success("Item removed from cart");
      } else {
        throw new Error("Failed to remove item");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const clearCartItems = async () => {
    try {
      const response = await clearCart();
      if (response?.data?.message === "success") {
        setItemsNumber(0);
        setCartDetails(null);
        toast.success("Cart cleared successfully");
      } else {
        throw new Error("Failed to clear cart");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!cartDetails?.products || cartDetails.products.length === 0) {
    return (
      <div className="text-center py-8">
        <h1 className="text-3xl text-red-700 font-bold mb-4">
          Your Cart Is Empty
        </h1>
        <Link
          to="/products"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className=" container mx-auto px-4 py-8 max-w-5xl pb-36">
        <h2 className="text-center text-4xl text-emerald-600 font-bold capitalize mb-8">
          Your Shopping Cart
        </h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-lg text-left text-gray-700">
              <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails.products.map((product) => (
                  <tr
                    key={product.product.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900 flex items-center">
                      <img
                        src={product.product.imageCover}
                        alt={product.product.title}
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <span>{product.product.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateProduct(product.product.id, product.count - 1)
                          }
                          className="inline-flex items-center justify-center p-1 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M20 12H4"
                            ></path>
                          </svg>
                        </button>
                        <span className="mx-2 text-gray-900 font-medium">
                          {product.count}
                        </span>
                        <button
                          onClick={() =>
                            updateProduct(product.product.id, product.count + 1)
                          }
                          className="inline-flex items-center justify-center p-1 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ${(product.price * product.count).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteItem(product.product.id)}
                        className="font-medium text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-emerald-600">
                ${cartDetails.totalCartPrice}
              </span>
            </div>
            <div className="flex gap-4">
              <Link to="/payment" className="flex-1">
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-lg transition duration-300">
                  Checkout
                </button>
              </Link>
              <button
                onClick={clearCartItems}
                className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-5 rounded-lg transition duration-300"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
