import React from "react";
import { Link } from "react-router-dom";
function Header(){
    return(
        <>
            <header className="bg-white shadow-md w-screen">
        <div className="w-full px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-700">National Service Scheme X Charusat</h1>
            <div className="flex items-center space-x-6">
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/Dashboard">
                            <a href="#" className="text-gray-600 hover:text-blue-500 font-medium">Dashboard</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Events">
                            <a href="#" className="text-gray-600 hover:text-blue-500 font-medium">Events</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Photos">
                            <a href="#" className="text-gray-600 hover:text-blue-500 font-medium">Photos</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/certificate">
                            <a href="#" className="text-gray-600 hover:text-blue-500 font-medium">Certificate</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Link to="/SignIn">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Sign in</button>
                </Link>
            </div>
        </div>
    </header>
        </>
    )
}
export default Header

// import React from "react";
// import { Link } from "react-router-dom";

// function Header() {
//   return (
//     <header className="bg-white shadow-md w-screen">
//       <div className="w-full px-6 py-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-700">
//           National Service Scheme X Charusat
//         </h1>
//         <nav>
//           <ul className="flex space-x-6">
//             <li>
//               <Link to="/dashboard" className="text-gray-600 hover:text-blue-500 font-medium">
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link to="/events" className="text-gray-600 hover:text-blue-500 font-medium">
//                 Events
//               </Link>
//             </li>
//             <li>
//               <Link to="/photos" className="text-gray-600 hover:text-blue-500 font-medium">
//                 Photos
//               </Link>
//             </li>
//             <li>
//               <Link to="/certificate" className="text-gray-600 hover:text-blue-500 font-medium">
//                 Certificate
//               </Link>
//             </li>
//           </ul>
//         </nav>
//         <Link to="/signin">
//           <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//             Sign in
//           </button>
//         </Link>
//       </div>
//     </header>
//   );
// }

// export default Header;
