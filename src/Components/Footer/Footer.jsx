import React from "react";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 right-0 left-0 bg-gray-800 text-white py-6">
      <div className="container  mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-center">
          {/* Logo and Description */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">Fresh Cart</h1>
            <p className="text-gray-400 mt-2">The best place to shop online</p>
          </div>

          {/* Social Media Links */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">Follow Us</h2>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 border-t border-gray-700 pt-4">
          <p className="text-gray-400 text-sm">
            © 2024 Fresh Cart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
