import axios from "axios";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { cartId, getLoggedUserCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const navigate = useNavigate();
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number")
      .required("Phone number is required"),
    city: Yup.string().required("City is required"),
    details: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: () => handleOnlineCheckout(),
  });

  const handleOnlineCheckout = async () => {
    setLoading(true);
    setLoadingButton("online");
    const userData = {
      shippingAddress: formik.values,
    };
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        userData,
        {
          headers: headers,
          params: {
            url: `http://localhost:5173`,
          },
        },
      );
      window.open(data.session.url, "_self");
      getLoggedUserCart();
      toast.success("Online payment successful!");
    } catch (error) {
      setPaymentError("An error occurred during online payment.");
    } finally {
      setLoading(false);
      setLoadingButton(null);
    }
  };

  const handleCashCheckout = async () => {
    if (!formik.isValid || !formik.dirty) {
      formik.handleSubmit();
      return;
    }
    setLoading(true);
    setLoadingButton("cash");
    const userData = {
      shippingAddress: formik.values,
    };
    try {
      await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        userData,
        {
          headers: headers,
        },
      );
      getLoggedUserCart();
      toast.success("Cash payment successful!");
    } catch (error) {
      setPaymentError("An error occurred during cash payment.");
    } finally {
      setLoading(false);
      setLoadingButton(null);
      navigate("/");
    }
  };

  return (
    <section className="py-10">
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <h2 className="text-center text-3xl font-semibold text-emerald-600">
        Payment
      </h2>
      <div className="w-full md:w-[70%] mx-auto pb-32">
        <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">
          {/* Phone */}
          <div className="relative z-0 w-full mb-8 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Phone
            </label>
            {formik.errors.phone && formik.touched.phone ? (
              <div className="absolute text-sm text-red-800" role="alert">
                {formik.errors.phone}
              </div>
            ) : null}
          </div>

          {/* City */}
          <div className="relative z-0 w-full mb-8 group">
            <input
              type="text"
              name="city"
              id="city"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.city}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="city"
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your City
            </label>
            {formik.errors.city && formik.touched.city ? (
              <div className="absolute text-sm text-red-800" role="alert">
                {formik.errors.city}
              </div>
            ) : null}
          </div>

          {/* Details */}
          <div className="relative z-0 w-full mb-8 group">
            <label
              htmlFor="details"
              className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              id="details"
              name="details"
              rows="4"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.details}
              className="block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder="Write the details of your payment"
            ></textarea>
            {formik.errors.details && formik.touched.details ? (
              <div className="absolute text-sm text-red-800" role="alert">
                {formik.errors.details}
              </div>
            ) : null}
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleCashCheckout}
              className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 mr-2"
              disabled={loading && loadingButton !== "cash"}
            >
              {loading && loadingButton === "cash" ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Cash Payment"
              )}
            </button>
            <button
              type="button"
              onClick={formik.handleSubmit}
              className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
              disabled={loading && loadingButton !== "online"}
            >
              {loading && loadingButton === "online" ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Online Payment"
              )}
            </button>
          </div>

          {paymentError && (
            <div className="text-red-800 text-center mt-4"> {paymentError}</div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Payment;
