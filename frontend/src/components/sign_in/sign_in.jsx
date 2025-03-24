import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = ({ onSignUpClick }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/signin", formData);
      
      if (response.status === 200) {
        alert(response.data.message); // ✅ Show success message
        localStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ Store user data
        navigate("/dashboard"); // ✅ Redirect to dashboard after login
      }
    } catch (error) {
      alert(error.response?.data?.message || "❌ Login failed"); // ❌ Show error message
    }
  };

  return (
    <div className="flex items-center justify-center py-28 bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg max-w-sm w-full">
        <h2 className="text-white text-2xl font-bold text-center mb-6">Welcome Back!</h2>
        <form className="space-y-4" onSubmit={handleSignIn}>
          <div>
            <label className="text-white block mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/80 focus:ring-2 focus:ring-white focus:outline-none"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-white block mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/80 focus:ring-2 focus:ring-white focus:outline-none"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-2 rounded-lg transition-all">
            Sign In
          </button>
        </form>
        <p className="text-white text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" onClick={onSignUpClick} className="text-white font-semibold underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
// const SignIn = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 shadow-lg rounded-lg w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
//         <form>
//           <input
//             type="text"
//             placeholder="Username"
//             className="w-full p-2 mb-4 border border-gray-300 rounded"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-2 mb-4 border border-gray-300 rounded"
//           />
//           <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
//             Sign In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignIn;