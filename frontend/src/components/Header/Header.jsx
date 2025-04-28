// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Menu, X } from "lucide-react";

// function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorage.getItem('authToken') ? true : false
//   );
//   const navigate = useNavigate();

//   // Check authentication status on component mount and when state changes
//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     setIsAuthenticated(!!token);
//   }, []);

//   const handleSignOut = () => {
//     localStorage.removeItem('authToken');
//     setIsAuthenticated(false);
//     navigate('/');
//     setIsOpen(false); // Close mobile menu after sign out
//   };

//   return (
//     <header className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         {/* NSSConnect Title */}
//         <h1 className="text-2xl font-bold text-gray-700">
//           NSSConnect - Charusat
//         </h1>

//         {/* Desktop Navigation - Show always but protected routes will handle access */}
//         <nav className="hidden md:flex items-center">
//           <ul className="flex space-x-8 text-lg font-medium">
//             <li><Link to="dashboard" className="text-gray-600 hover:text-blue-500 transition">Dashboard</Link></li>
//             <li><Link to="events" className="text-gray-600 hover:text-blue-500 transition">Events</Link></li>
//             <li><Link to="photos" className="text-gray-600 hover:text-blue-500 transition">Photos</Link></li>
//             <li><Link to="registrations" className="text-gray-600 hover:text-blue-500 transition">Certificate</Link></li>
//             <li><Link to="feedback" className="text-gray-600 hover:text-blue-500 transition">Feedback</Link></li>
//           </ul>
//         </nav>

//         {/* Auth Buttons - Conditional rendering */}
//         <div className="hidden md:flex space-x-4">
//           {isAuthenticated ? (
//             <button 
//               onClick={handleSignOut}
//               className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//             >
//               Sign Out
//             </button>
//           ) : (
//             <>
//               <Link to="/SignIn">
//                 <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
//                   Sign In
//                 </button>
//               </Link>
//               <Link to="/SignUp">
//                 <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
//                   Sign Up
//                 </button>
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button 
//           className="md:hidden text-gray-700 focus:outline-none" 
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-white shadow-lg w-full py-4">
//           <ul className="flex flex-col items-center space-y-4 text-lg font-medium">
//             <li><Link to="dashboard" onClick={() => setIsOpen(false)} className="block py-2 text-gray-600 hover:text-blue-500">Dashboard</Link></li>
//             <li><Link to="events" onClick={() => setIsOpen(false)} className="block py-2 text-gray-600 hover:text-blue-500">Events</Link></li>
//             <li><Link to="photos" onClick={() => setIsOpen(false)} className="block py-2 text-gray-600 hover:text-blue-500">Photos</Link></li>
//             <li><Link to="registrations" onClick={() => setIsOpen(false)} className="block py-2 text-gray-600 hover:text-blue-500">Certificate</Link></li>
//             <li><Link to="feedback" onClick={() => setIsOpen(false)} className="block py-2 text-gray-600 hover:text-blue-500">Feedback</Link></li>
//           </ul>
//           <div className="mt-4 flex justify-center">
//             {isAuthenticated ? (
//               <button 
//                 onClick={handleSignOut}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//               >
//                 Sign Out
//               </button>
//             ) : (
//               <div className="flex space-x-4">
//                 <Link to="/signin" onClick={() => setIsOpen(false)}>
//                   <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
//                     Sign In
//                   </button>
//                 </Link>
//                 <Link to="/signup" onClick={() => setIsOpen(false)}>
//                   <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
//                     Sign Up
//                   </button>
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Header;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // ✅ Import context

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // ✅ Use context
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout(); // ✅ clears context + localStorage
    navigate("/signin");
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-md w-full fixed top-0 left-0 z-50 transition-all duration-500 ease-in-out">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700 transform hover:scale-105 hover:rotate-2 transition-all duration-300 ease-out">
          NSSConnect - Charusat
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <ul className="flex space-x-8 text-lg font-medium">
            <li>
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-blue-500 hover:scale-105 transition-all duration-300 ease-in-out transform"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                className="text-gray-600 hover:text-blue-500 hover:scale-105 transition-all duration-300 ease-in-out transform"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/photos"
                className="text-gray-600 hover:text-blue-500 hover:scale-105 transition-all duration-300 ease-in-out transform"
              >
                Photos
              </Link>
            </li>
            <li>
              <Link
                to="/registrations"
                className="text-gray-600 hover:text-blue-500 hover:scale-105 transition-all duration-300 ease-in-out transform"
              >
                Certificate
              </Link>
            </li>
            <li>
              <Link
                to="/feedback"
                className="text-gray-600 hover:text-blue-500 hover:scale-105 transition-all duration-300 ease-in-out transform"
              >
                Feedback
              </Link>
            </li>
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4 items-center">
          {user ? (
            <>
              <span className="text-gray-600 font-semibold transform hover:scale-105 hover:rotate-2 transition-all duration-300 ease-out">
                👋 Hi, {user.full_name}
              </span>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 ease-in-out transform hover:scale-105 hover:rotate-2"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out transform hover:scale-105 hover:rotate-2">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 ease-in-out transform hover:scale-105 hover:rotate-2">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none transition-all duration-300 ease-in-out transform hover:rotate-180"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown with Slide-in Animation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg w-full py-4 transition-transform transform duration-500 ease-in-out slide-in-up">
          <ul className="flex flex-col items-center space-y-4 text-lg font-medium">
            <li>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-600 hover:text-blue-500 hover:scale-105 transition-all duration-300 ease-in-out transform"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-600 hover:text-blue-500 hover:scale-105 transition-all duration-300 ease-in-out transform"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/photos"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-600 hover:text-blue-500 hover:scale-105 transition-all duration-300 ease-in-out transform"
              >
                Photos
              </Link>
            </li>
            <li>
              <Link
                to="/registrations"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-600 hover:text-blue-500 hover:scale-105 transition-all duration-300 ease-in-out transform"
              >
                Certificate
              </Link>
            </li>
            <li>
              <Link
                to="/feedback"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-600 hover:text-blue-500 hover:scale-105 transition-all duration-300 ease-in-out transform"
              >
                Feedback
              </Link>
            </li>
          </ul>
          <div className="mt-4 flex justify-center">
            {user ? (
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 ease-in-out transform hover:scale-105 hover:rotate-2"
              >
                Sign Out
              </button>
            ) : (
              <div className="flex space-x-4">
                <Link to="/signin" onClick={() => setIsOpen(false)}>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out transform hover:scale-105 hover:rotate-2">
                    Sign In
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 ease-in-out transform hover:scale-105 hover:rotate-2">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
