import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCategories() {
  let getCategories = async () => {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  };

  let categoiesInfo = useQuery({
    queryKey: ["categoies"],
    queryFn: getCategories,
    staleTime: 7000,
  });

  return categoiesInfo;
}
