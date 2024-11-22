import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";

const NavLink = ({ to, children, count, onClick }) => (
  <Link
    to={to}
    className="relative block px-3 py-2 text-gray-700 transition-colors duration-200 rounded-md group hover:bg-emerald-600 hover:text-white"
    onClick={onClick}
  >
    <span>{children}</span>
    {count > 0 && (
      <div className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 -mt-1 -mr-1 text-xs text-white bg-red-500 rounded-full">
        {count}
      </div>
    )}
  </Link>
);

const SocialIcon = ({ icon }) => (
  <a
    href="#"
    className="text-gray-600 transition-colors duration-200 hover:text-emerald-600"
  >
    <i className={`fab fa-${icon} text-lg`}></i>
  </a>
);

export default function Navbar() {
  const navigate = useNavigate();
  const { userLogin, setUserLogin } = useContext(UserContext);
  const { ItemsNumber } = useContext(CartContext);
  const { WishListNumber } = useContext(WishListContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const signOut = () => {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 bg-white shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="" className="flex items-center flex-shrink-0">
              <img src={logo} className="w-auto h-8" alt="Freshcart Logo" />
            </Link>
          </div>
          <div className="items-center justify-center flex-1 hidden space-x-4 lg:flex">
            {userLogin && (
              <>
                <NavLink to="">Home</NavLink>
                <NavLink to="cart" count={ItemsNumber}>
                  Cart
                </NavLink>
                <NavLink to="products">Products</NavLink>
                <NavLink to="categories">Categories</NavLink>
                <NavLink to="brands">Brands</NavLink>
                <NavLink to="wishlist" count={WishListNumber}>
                  Wishlist
                </NavLink>
              </>
            )}
          </div>
          <div className="items-center hidden space-x-4 lg:flex">
            <SocialIcon icon="facebook" />
            <SocialIcon icon="linkedin" />
            <SocialIcon icon="youtube" />
            <SocialIcon icon="tiktok" />
            <SocialIcon icon="twitter" />
            {userLogin && (
              <div className="mr-4 text-lg font-medium text-emerald-600">
                Hi, {userLogin.name}!
              </div>
            )}
            {userLogin ? (
              <button
                onClick={signOut}
                className="px-4 py-2 text-sm text-white transition-colors duration-200 bg-red-600 rounded-md hover:bg-red-700"
              >
                Sign out
              </button>
            ) : (
              <>
                <Link
                  to="login"
                  className="px-4 py-2 text-sm text-white transition-colors duration-200 rounded-md bg-emerald-500 hover:bg-emerald-600"
                >
                  Login
                </Link>
                <Link
                  to="register"
                  className="px-4 py-2 text-sm text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center lg:hidden">
            {userLogin && (
              <div className="mr-4 text-sm font-medium text-emerald-600">
                Hi, {userLogin.name.split(" ")[0]}!
              </div>
            )}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 text-gray-700 rounded-md hover:text-emerald-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {userLogin && (
              <>
                <NavLink to="" onClick={closeMenu}>
                  Home
                </NavLink>
                <NavLink to="cart" count={ItemsNumber} onClick={closeMenu}>
                  Cart
                </NavLink>
                <NavLink to="products" onClick={closeMenu}>
                  Products
                </NavLink>
                <NavLink to="categories" onClick={closeMenu}>
                  Categories
                </NavLink>
                <NavLink to="brands" onClick={closeMenu}>
                  Brands
                </NavLink>
                <NavLink
                  to="wishlist"
                  count={WishListNumber}
                  onClick={closeMenu}
                >
                  Wishlist
                </NavLink>
              </>
            )}
            <div className="flex justify-center py-2 space-x-4">
              <SocialIcon icon="facebook" />
              <SocialIcon icon="linkedin" />
              <SocialIcon icon="youtube" />
              <SocialIcon icon="tiktok" />
              <SocialIcon icon="twitter" />
            </div>
            {userLogin ? (
              <button
                onClick={signOut}
                className="block w-full px-3 py-2 text-left text-gray-700 transition-colors duration-200 rounded-md hover:bg-emerald-600 hover:text-white"
              >
                Sign out
              </button>
            ) : (
              <>
                <Link
                  to="login"
                  className="block w-full px-3 py-2 text-left text-gray-700 transition-colors duration-200 rounded-md hover:bg-emerald-600 hover:text-white"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="register"
                  className="block w-full px-3 py-2 text-left text-white transition-colors duration-200 rounded-md bg-emerald-600 hover:bg-emerald-700"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
