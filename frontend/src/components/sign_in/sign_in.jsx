import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const SignIn = ({ onSignUpClick }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    secretKey: "", // 🔐 Add secretKey
  });

  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false); // ✅ Detect admin mode manually (optional)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // If user types 'admin@...' in email, show secretKey field
    if (name === "email" && value.includes("admin")) {
      setIsAdmin(true);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!recaptchaVerified) {
      setRecaptchaError("Please complete the CAPTCHA.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/signin", formData);

      if (response.status === 200) {
        const user = response.data.user;
        alert(response.data.message);

        signIn(user);

        // 🔀 Redirect based on userType
        if (user.userType === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/events");
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || "❌ Login failed");
    }
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaVerified(!!value);
    if (value) setRecaptchaError("");
  };

  return (
    <div className="flex items-center justify-center py-28 bg-gradient-to-r from-purple-600 to-blue-500">
      <motion.div
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg max-w-sm w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
              required
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
              required
            />
          </div>

          {/* 🔐 Show secret key field if admin */}
          {isAdmin && (
            <div>
              <label className="text-white block mb-2">Admin Secret Key</label>
              <input
                type="password"
                name="secretKey"
                placeholder="Enter admin secret key"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/80 focus:ring-2 focus:ring-white focus:outline-none"
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="mt-4">
            <ReCAPTCHA
              sitekey="6LeyJQsrAAAAAE074JQsA-IJ-bHOjlLSYTddAg4X"
              onChange={handleRecaptchaChange}
            />
            {recaptchaError && <p className="text-red-500 text-sm mt-2">{recaptchaError}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-2 rounded-lg transition-all"
          >
            Sign In
          </button>
        </form>

        <p className="text-white text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" onClick={onSignUpClick} className="text-white font-semibold underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
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
// import React from 'react';
// import { useHistory } from 'react-router-dom';

// const SignIn = () => {
//   const history = useHistory();

//   const handleLogin = () => {
//     // Example login logic
//     localStorage.setItem('authToken', '123abc');
//     history.push('/dashboard'); // You can change this path later
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold">Sign In</h2>
//       <button onClick={handleLogin} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
//         Sign In
//       </button>
//     </div>
//   );
// };

// export default SignIn;
