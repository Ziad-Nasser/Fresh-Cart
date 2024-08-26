import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet-async";

export default function ForgetPassword() {
  const myNav = useNavigate();
  const { token, setToken } = useContext(UserContext);
  let userData = {
    email: "",
  };

  const [logSuccsec, setLogSuccsec] = useState(false);
  const [logError, setLogError] = useState(false);
  const [loading, setLoading] = useState(false);
  function sendCode(userData) {
    setLoading(true);
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        userData,
      )
      .then((res) => {
        if (res.data.statusMsg === "success") {
          myNav("/verifycode");
        }
        setLoading(false);
        setLogError(false);
      })
      .catch((err) => {
        setLogSuccsec(false);
        setLoading(false);
        setLogError(err.response.data.message);
      });
  }

  function formSubmit(values) {
    sendCode(values);
  }

  let myFormik = useFormik({
    initialValues: userData,
    onSubmit: formSubmit,
    validate: function (values) {
      let errors = {};
      const emailRegex =
        /^[\w-]+(\.[\w-]+)*@[A-Za-z]+(\.[A-Za-z]+)*(\.[A-Za-z]{2,})$/;

      if (!emailRegex.test(values.email)) {
        errors.email = "inValid Email";
      }
      return errors;
    },
  });
  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <div className="w-3/4 mx-auto py-5">
        <h2 className="mb-4 text-2xl font-bold">Forget Password</h2>

        {logSuccsec && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center"
            role="alert"
          >
            {logSuccsec}
          </div>
        )}

        {logError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"
            role="alert"
          >
            {logError}
          </div>
        )}

        <form onSubmit={myFormik.handleSubmit}>
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.email}
            type="text"
            placeholder="Your Email"
            className="w-full px-3 py-2 mb-3 text-base text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            id="email"
          />
          {myFormik.errors.email && myFormik.touched.email && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              {myFormik.errors.email}
            </div>
          )}

          <button
            type="submit"
            className="block ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Send Code"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
