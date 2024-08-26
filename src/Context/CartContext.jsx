import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartId, setCartid] = useState();
  const [ItemsNumber, setItemsNumber] = useState(0);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  let addProductToCart = async (productId) => {
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers,
        },
      );
      return res;
    } catch (err) {
      return err;
    }
  };

  let getLoggedUserCart = async (id) => {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers,
        },
      );
      setCartid(res?.data?.data._id);
      setItemsNumber(res.data.numOfCartItems);
      return res;
    } catch (err) {
      return err;
    }
  };

  let updateCartProductQuantity = async (productId, newCount) => {
    try {
      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        {
          headers,
        },
      );
      return res;
    } catch (err) {
      return err;
    }
  };

  let deleteCartItem = async (productId) => {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers,
        },
      );
      return res;
    } catch (err) {
      return err;
    }
  };

  let clearCart = async () => {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers,
        },
      );
      return res;
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getLoggedUserCart,
        updateCartProductQuantity,
        deleteCartItem,
        clearCart,
        ItemsNumber,
        setItemsNumber,
        cartId,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
