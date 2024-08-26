import React from "react";
import { Link } from "react-router-dom";
import useCategories from "../../Hooks/useCategories";
import { Helmet } from "react-helmet-async";

export default function Categories() {
  let { data, isError, error, isLoading, isFetching } = useCategories();

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
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="row">
        <h2 className=" text-4xl my-2 text-emerald-600 font-extrabold py-2 px-4 w-full text-center">
          Our available categories
        </h2>
        {data?.data?.data?.map((brand) => (
          <div key={brand._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <div className="brand p-2 my-2 border m-1 flex flex-col justify-between">
              <Link to={`${brand._id}`}>
                <img
                  style={{ height: "350px" }}
                  src={brand.image}
                  className="w-full h-auto object-cover rounded"
                  alt={brand.name}
                />
              </Link>
              <div className="flex items-center justify-center">
                <h3 className="productCategory text-emerald-700 font-bold">
                  {brand.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
