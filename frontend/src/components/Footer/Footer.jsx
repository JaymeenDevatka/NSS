import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-10 mt-auto transition-all duration-500 ease-in-out">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* NSSConnect Branding */}
        <div className="text-center md:text-left transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <h2 className="text-2xl font-semibold text-gray-300 tracking-wide hover:text-blue-400">
            NSSConnect - Charusat
          </h2>
          <p className="text-sm text-gray-400 mt-2 hover:text-gray-200 transition duration-300 ease-in-out">
            "Connecting Volunteers, Inspiring Change."
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 justify-center md:justify-start">
          <a
            href="https://www.facebook.com/nssgoi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110 hover:rotate-12 duration-300 ease-in-out"
          >
            <Facebook size={28} />
          </a>
          <a
            href="https://twitter.com/_NSSINDIA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110 hover:rotate-12 duration-300 ease-in-out"
          >
            <Twitter size={28} />
          </a>
          <a
            href="https://www.instagram.com/NSS_CHARUSAT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-400 transition transform hover:scale-110 hover:rotate-12 duration-300 ease-in-out"
          >
            <Instagram size={28} />
          </a>
          <a
            href="https://www.linkedin.com/in/JaymeenDevatka"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition transform hover:scale-110 hover:rotate-12 duration-300 ease-in-out"
          >
            <Linkedin size={28} />
          </a>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm text-gray-400 mt-4 opacity-80 hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <p>&copy; 2025 NSSConnect | All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
