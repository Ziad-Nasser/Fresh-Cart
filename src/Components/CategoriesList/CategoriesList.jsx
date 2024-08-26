import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";

export default function CategoriesList() {
  const { categoryId } = useParams();
  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const { addProductToCart, setItemsNumber, ItemsNumber } =
    useContext(CartContext);
  let { addToWishlist, deleteProduct, productWishIds } =
    useContext(WishListContext);
  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  let getProductsOfCategory = async (categoryId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`,
      );

      if (response.status === 200) {
        setBrand(response?.data?.data[0]?.brand);
        setProducts(response.data.data);
      }
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };
  async function addToCart(categoryId) {
    toast.promise(addProductToCart(categoryId), {
      loading: "Loading",
      success: "Product added to cart successfully",
      error: "Error in add Product try again ",
    });
    setItemsNumber(ItemsNumber + 1);
  }
  useEffect(() => {
    getProductsOfCategory(categoryId);
  }, [categoryId]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="row flex-col items-center ">
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
                className="categoryList w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2"
              >
                <div className="product relative p-1 bg-white shadow rounded-lg">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-12 right-2 z-10 "
                    disabled={wishlistLoading}
                  >
                    {wishlistLoading && currentId == product.id ? (
                      <div className=" bg-gray-800 p-2 rounded">
                        <i className="fas fa-spinner fa-spin text-emerald-400"></i>
                      </div>
                    ) : (
                      <i
                        className={`icon fas fa-heart text-2xl  bg-gray-800 p-2 rounded ${
                          productWishIds.includes(product.id)
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      ></i>
                    )}
                  </button>
                  <i
                    onClick={() => addToCart(product.id)}
                    className=" icon fa-solid fa-cart-plus p-2 rounded bg-gray-800 text-white text-xl absolute top-2 right-2 shadow cursor-pointer"
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
                      {product.priceAfterDiscount && (
                        <span className="absolute top-2 left-2 bg-red-600 text-white text-sm px-2 py-1 rounded">
                          -
                          {100 -
                            (
                              (product.priceAfterDiscount / product.price) *
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
                  <button
                    onClick={() => addToCart(product.id)}
                    className=" btn"
                  >
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
