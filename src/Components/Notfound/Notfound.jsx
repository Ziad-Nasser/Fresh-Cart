import React from "react";
import notFound from "../../assets/error.svg";
export default function NotFound() {
  return (
    <div className=" flex justify-center items-center">
      <img src={notFound} className="w-50" alt="" />
    </div>
  );
}
