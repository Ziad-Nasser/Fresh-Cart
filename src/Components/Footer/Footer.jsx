import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex flex-col flex-grow py-4 mt-auto text-white bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">Fresh Cart</h2>
            <p className="mt-2 text-gray-400">The best place to shop online</p>
          </div>

          <div className="text-center md:text-right">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="flex justify-center space-x-6 md:justify-end">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 mt-8 text-sm text-center text-gray-400 border-t border-gray-800">
          © 2024 Fresh Cart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
