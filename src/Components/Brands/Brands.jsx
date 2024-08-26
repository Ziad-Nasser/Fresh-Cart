import React from "react";
import { Link } from "react-router-dom";
import useBrands from "../../Hooks/useBrands";
import { Helmet } from "react-helmet-async";

export default function Brands() {
  let { data, isError, error, isLoading } = useBrands();

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
        <title>Brands</title>
      </Helmet>
      <div className="row">
        <h2 className=" text-4xl my-2 text-emerald-600 font-extrabold py-2 px-4 w-full text-center">
          Available brands
        </h2>
        {data?.data?.data?.map((brand) => (
          <div
            key={brand._id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
          >
            <div className="brand p-2 my-2 border m-1">
              <Link to={`${brand._id}`}>
                <img src={brand.image} className="w-full" alt={brand.name} />
                <h3 className="productCategory text-emerald-700 font-bold">
                  {brand.name}
                </h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
