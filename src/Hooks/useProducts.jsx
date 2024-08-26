import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useProducts() {
  let getProducts = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  };

  let productInfo = useQuery({
    queryKey: ["recent-products"],
    queryFn: getProducts,
    staleTime: 7000,
  });

  return productInfo;
}
