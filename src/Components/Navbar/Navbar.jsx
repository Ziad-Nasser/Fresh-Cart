import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";

const NavLink = ({ to, children, count, onClick }) => (
  <Link
    to={to}
    className="relative group block py-2 px-3 text-gray-700 hover:bg-emerald-600 hover:text-white rounded-md transition-colors duration-200"
    onClick={onClick}
  >
    <span>{children}</span>
    {count > 0 && (
      <div className="absolute top-0 right-0 -mt-1 -mr-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
        {count}
      </div>
    )}
  </Link>
);

const SocialIcon = ({ icon }) => (
  <a
    href="#"
    className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
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
    <nav className="bg-white shadow-md fixed top-0 right-0 left-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="" className="flex-shrink-0 flex items-center">
              <img src={logo} className="h-8 w-auto" alt="Freshcart Logo" />
            </Link>
          </div>
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-4">
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
          <div className="hidden lg:flex items-center space-x-4">
            <SocialIcon icon="facebook" />
            <SocialIcon icon="linkedin" />
            <SocialIcon icon="youtube" />
            <SocialIcon icon="tiktok" />
            <SocialIcon icon="twitter" />
            {userLogin && (
              <div className="text-lg font-medium text-emerald-600 mr-4">
                Hi, {userLogin.name}!
              </div>
            )}
            {userLogin ? (
              <button
                onClick={signOut}
                className="text-sm text-gray-700 py-1 px-2 hover:bg-red-600 hover:text-white rounded-md transition-colors duration-200"
              >
                Sign out
              </button>
            ) : (
              <>
                <Link
                  to="login"
                  className="text-sm text-gray-700 py-1 px-2 hover:bg-emerald-600 hover:text-white rounded-md transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="register"
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          <div className="lg:hidden flex items-center">
            {userLogin && (
              <div className="text-sm font-medium text-emerald-600 mr-4">
                Hi, {userLogin.name.split(" ")[0]}!
              </div>
            )}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
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
                  className="block h-6 w-6"
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
            <div className="flex justify-center space-x-4 py-2">
              <SocialIcon icon="facebook" />
              <SocialIcon icon="linkedin" />
              <SocialIcon icon="youtube" />
              <SocialIcon icon="tiktok" />
              <SocialIcon icon="twitter" />
            </div>
            {userLogin ? (
              <button
                onClick={signOut}
                className="block w-full text-left py-2 px-3 text-gray-700 hover:bg-emerald-600 hover:text-white rounded-md transition-colors duration-200"
              >
                Sign out
              </button>
            ) : (
              <>
                <Link
                  to="login"
                  className="block w-full text-left py-2 px-3 text-gray-700 hover:bg-emerald-600 hover:text-white rounded-md transition-colors duration-200"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="register"
                  className="block w-full text-left py-2 px-3 bg-emerald-600 text-white hover:bg-emerald-700 rounded-md transition-colors duration-200"
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
