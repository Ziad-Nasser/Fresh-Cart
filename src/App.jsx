import { useState } from "react";
import "./App.css";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Categories from "./Components/Categories/Categories";
import Products from "./Components/Products/Products";
import Notfound from "./Components/Notfound/Notfound";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Payment from "./Components/Payement/Payment";
import BrandDetails from "./Components/BrandDetails/BrandDetails";
import CategoriesList from "./Components/CategoriesList/CategoriesList.jsx";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword.jsx";
import VerifyCode from "./Components/VerifyCode/VerifyCode.jsx";
import ResetPassword from "./Components/ResetPassword/ResetPassword.jsx";
import WishListContextProvider from "./Context/WishListContext.jsx";
import WishList from "./Components/WishList/WishList.jsx";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AllOrders from "./Components/AllOrders/AllOrders.jsx";

let query = new QueryClient();

let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands/:id",
        element: (
          <ProtectedRoute>
            <BrandDetails />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories/:categoryId",
        element: (
          <ProtectedRoute>
            <CategoriesList />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Notfound /> },
      { path: "forgetpassword", element: <ForgetPassword /> },
      { path: "resetpassword/", element: <ResetPassword /> },
      { path: "verifycode", element: <VerifyCode /> },
    ],
  },
]);
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <HelmetProvider>
        <UserContextProvider>
          <QueryClientProvider client={query}>
            <CartContextProvider>
              <WishListContextProvider>
                <RouterProvider router={x}></RouterProvider>
                <Toaster />
              </WishListContextProvider>
            </CartContextProvider>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </UserContextProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
