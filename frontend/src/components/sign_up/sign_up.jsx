// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     // Validation checks
//     if (!formData.full_name || !formData.email || !formData.password || !formData.confirmPassword) {
//       alert("❌ All fields are required!");
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       alert("❌ Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:8080/signup", formData);

//       if (response.status === 201) {
//         alert(response.data.message); // Show success message
//         navigate("/signin"); // Redirect to Sign In page
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "❌ Signup failed"); // Show error message
//     }
//   };

//   return (
//     <div className="flex items-center justify-center py-28 bg-gradient-to-r from-purple-600 to-blue-500">
//       <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg max-w-sm w-full">
//         <h2 className="text-white text-2xl font-bold text-center mb-6">Create an Account</h2>
//         <form className="space-y-4" onSubmit={handleSignUp}>
//           <div>
//             <label className="text-white block mb-2">Full Name</label>
//             <input
//               type="text"
//               name="full_name"
//               placeholder="Enter your full name"
//               className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/80 focus:ring-2 focus:ring-white focus:outline-none"
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label className="text-white block mb-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/80 focus:ring-2 focus:ring-white focus:outline-none"
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label className="text-white block mb-2">Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/80 focus:ring-2 focus:ring-white focus:outline-none"
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label className="text-white block mb-2">Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm your password"
//               className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/80 focus:ring-2 focus:ring-white focus:outline-none"
//               onChange={handleChange}
//             />
//           </div>
//           <button type="submit" className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-2 rounded-lg transition-all">
//             Sign Up
//           </button>
//         </form>
//         <p className="text-white text-center mt-4">
//           Already have an account?{" "}
//           <Link to="/signin" className="text-white font-semibold underline">
//             Sign In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = ({ onSignInClick }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async () => {
    try {
      const response = await axios.post("http://localhost:8080/send-otp", { email: formData.email });
      if (response.status === 200) {
        alert("OTP sent successfully! ✅");
        setOtpSent(true);
      }
    } catch (error) {
      alert(error.response?.data?.message || "❌ Failed to send OTP");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/signup", formData);
      if (response.status === 200) {
        alert(response.data.message); // ✅ Success message
        navigate("/dashboard"); // ✅ Redirect to dashboard
      }
    } catch (error) {
      alert(error.response?.data?.message || "❌ Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center py-28 bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg max-w-sm w-full">
        <h2 className="text-white text-2xl font-bold text-center mb-6">Join Us!</h2>
        <form className="space-y-4" onSubmit={handleSignUp}>
          <div>
            <label className="text-white block mb-2">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/80 focus:ring-2 focus:ring-white focus:outline-none"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-white block mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/80 focus:ring-2 focus:ring-white focus:outline-none"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={handleSendOTP}
              className="mt-2 bg-white/20 hover:bg-white/30 text-white font-bold py-1 px-4 rounded-lg transition-all"
            >
              Send OTP
            </button>
          </div>
          {otpSent && (
            <div>
              <label className="text-white block mb-2">OTP</label>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/80 focus:ring-2 focus:ring-white focus:outline-none"
                onChange={handleChange}
              />
            </div>
          )}
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
            Sign Up
          </button>
        </form>
        <p className="text-white text-center mt-4">
          Already have an account?{" "}
          <Link to="/signin" onClick={onSignInClick} className="text-white font-semibold underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
