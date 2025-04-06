// src/components/Header/AdminHeader.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function AdminHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/signin");
    setIsOpen(false);
  };

  const navItems = [
    { name: "Dashboard", path: "/admin-dashboard" },
    { name: "Manage Events", path: "/events" },
    { name: "Photos", path: "/photos" },
    { name: "Certificates", path: "/registrations" },
    { name: "Feedback", path: "/feedback" },
    { name: "Users", path: "/users" }, // Add any admin-specific pages here
  ];

  return (
    <header className="bg-gray-900 shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Admin Panel - NSSConnect</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <ul className="flex space-x-8 text-lg font-medium">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="text-gray-300 hover:text-yellow-400 transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:flex space-x-4">
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white shadow-lg w-full py-4">
          <ul className="flex flex-col items-center space-y-4 text-lg font-medium">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-white hover:text-yellow-400"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default AdminHeader;
