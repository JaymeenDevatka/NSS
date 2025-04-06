import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"; // Added LinkedIn

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* NSSConnect Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold text-gray-300">
            NSSConnect - Charusat
          </h2>
          <p className="text-sm text-gray-400">
            "Connecting Volunteers, Inspiring Change."
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-5">
          <a
            href="https://www.facebook.com/nssgoi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://twitter.com/_NSSINDIA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition"
          >
            <Twitter size={24} />
          </a>
          <a
            href="https://www.instagram.com/NSS_CHARUSAT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-400 transition"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/JaymeenDevatka"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition"
          >
            <Linkedin size={24} />
          </a>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm text-gray-400">
          <p>&copy; 2025 NSSConnect | All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
