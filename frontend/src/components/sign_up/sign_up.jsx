import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "user",
    secretKey: "",
  });
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const ADMIN_SECRET_KEY = "123456789";
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    const { full_name, email, password, confirmPassword, userType, secretKey } = formData;
  
    // Validation
    if (!full_name || !email || !password || !confirmPassword) {
      return setError("❌ All fields are required!");
    }
    if (password !== confirmPassword) {
      return setError("❌ Passwords do not match!");
    }
    if (userType === "admin" && secretKey !== ADMIN_SECRET_KEY) {
      return setError("❌ Invalid Admin Secret Key");
    }
  
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
  
    try {
      const response = await axios.post("http://localhost:8080/send-otp", { email });
      setServerOtp(response.data.otp); // ✅ Save OTP from backend response (for testing/dev)
      setStep(2);
      setSuccessMessage("✅ OTP sent to your email!");
    } catch (error) {
      setError(`❌ ${error.response?.data?.message || "Failed to send OTP."}`);
      console.error("OTP Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const verifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
  
    try {
      const response = await axios.post("http://localhost:8080/verify-otp", {
        email: formData.email,
        otp: otp.trim(),
      });
  
      if (response.status === 200) {
        // ✅ OTP verified, now proceed to register the user
        const { full_name, email, password, userType } = formData;
        const signupResponse = await axios.post("http://localhost:8080/signup", {
          full_name,
          email,
          password,
          userType,
        });
  
        if (signupResponse.status === 200) {
          alert("🎉 Account created successfully!");
          navigate("/signin");
        }
      }
    } catch (error) {
      setError(`❌ ${error.response?.data?.message || "Invalid OTP"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center pt-36 pb-20 bg-gradient-to-r from-purple-600 to-blue-500 min-h-screen">
      <div
        className={`bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-sm w-full transform transition-all duration-700 ${
          fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-white text-2xl font-bold text-center mb-6">
          {step === 1 ? "Create an Account" : "Verify OTP"}
        </h2>

        {/* Status Messages */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}

        {/* Step 1: Signup Form */}
        {step === 1 ? (
          <form className="space-y-4" onSubmit={sendOtp}>
            <Input label="Full Name" name="full_name" onChange={handleChange} />
            <Input
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
            />
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              onChange={handleChange}
            />

            <div>
              <label className="text-white block mb-2">User Type</label>
              <select
                name="userType"
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-white focus:outline-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {formData.userType === "admin" && (
              <Input
                label="Admin Secret Key"
                name="secretKey"
                onChange={handleChange}
              />
            )}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        ) : (
          // Step 2: OTP Verification
          <form className="space-y-4" onSubmit={verifyOtp}>
            <Input
              label="Enter OTP"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify OTP & Sign Up"}
            </Button>
          </form>
        )}

        <p className="text-white text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-white font-semibold underline hover:text-white/80"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

// Reusable Input Component
const Input = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label className="text-white block mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label.toLowerCase()}`}
      className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/80 focus:ring-2 focus:ring-white focus:outline-none"
      required
    />
  </div>
);

// Reusable Button Component
const Button = ({ children, disabled, type = "submit" }) => (
  <button
    type={type}
    disabled={disabled}
    className={`w-full bg-white/20 hover:bg-white/30 text-white font-bold py-2 rounded-lg transition-all ${
      disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
    }`}
  >
    {children}
  </button>
);

export default SignUp;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const SignUp = ({ onSignInClick }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     otp: "",
//   });
//   const [otpSent, setOtpSent] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSendOTP = async () => {
//     try {
//       const response = await axios.post("http://localhost:8080/send-otp", { email: formData.email });
//       if (response.status === 200) {
//         alert("OTP sent successfully! ✅");
//         setOtpSent(true);
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "❌ Failed to send OTP");
//     }
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8080/signup", formData);
//       if (response.status === 200) {
//         alert(response.data.message); // ✅ Success message
//         navigate("/dashboard"); // ✅ Redirect to dashboard
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "❌ Signup failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center py-28 bg-gradient-to-r from-purple-600 to-blue-500">
//       <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg max-w-sm w-full">
//         <h2 className="text-white text-2xl font-bold text-center mb-6">Join Us!</h2>
//         <form className="space-y-4" onSubmit={handleSignUp}>
//           <div>
//             <label className="text-white block mb-2">Name</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter your name"
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
//             <button
//               type="button"
//               onClick={handleSendOTP}
//               className="mt-2 bg-white/20 hover:bg-white/30 text-white font-bold py-1 px-4 rounded-lg transition-all"
//             >
//               Send OTP
//             </button>
//           </div>
//           {otpSent && (
//             <div>
//               <label className="text-white block mb-2">OTP</label>
//               <input
//                 type="text"
//                 name="otp"
//                 placeholder="Enter OTP"
//                 className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/80 focus:ring-2 focus:ring-white focus:outline-none"
//                 onChange={handleChange}
//               />
//             </div>
//           )}
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
//           <button type="submit" className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-2 rounded-lg transition-all">
//             Sign Up
//           </button>
//         </form>
//         <p className="text-white text-center mt-4">
//           Already have an account?{" "}
//           <Link to="/signin" onClick={onSignInClick} className="text-white font-semibold underline">
//             Sign In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
// import React from 'react';
// import { useHistory } from 'react-router-dom';

// const SignUp = () => {
//   const history = useHistory();

//   const handleSignUp = () => {
//     // Example signup logic
//     localStorage.setItem('authToken', '123abc');
//     history.push('/signin');
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold">Sign Up</h2>
//       <button onClick={handleSignUp} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
//         Sign Up
//       </button>
//     </div>
//   );
// };

// export default SignUp;
