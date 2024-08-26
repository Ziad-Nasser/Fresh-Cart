import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WishListContext = createContext();

export default function WishistContextProvider(props) {
  const [WishListNumber, setWishListNumber] = useState(0);
  const [productWish, setProductWishList] = useState(null);
  const [productWishIds, setProductWishIds] = useState([]);

  const headers = {
    token: localStorage.getItem("userToken"),
  };

  const getUserWishlist = () => {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => {
        setWishListNumber(res.data.count);
        setProductWishList(res.data.data);
        setProductWishIds(res.data.data.map((item) => item.id));
        return res;
      })
      .catch((err) => {
        setProductWishList([]);
        return err;
      });
  };

  const addToWishlist = (productId) => {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers },
      )
      .then((res) => {
        getUserWishlist();
        return res;
      })
      .catch((err) => err);
  };

  const deleteProduct = (productId) => {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) => {
        getUserWishlist();
        return res;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getUserWishlist();
  }, []);

  return (
    <WishListContext.Provider
      value={{
        WishListNumber,
        productWish,
        productWishIds,
        addToWishlist,
        deleteProduct,
        getUserWishlist,
      }}
    >
      {props.children}
    </WishListContext.Provider>
  );
}
