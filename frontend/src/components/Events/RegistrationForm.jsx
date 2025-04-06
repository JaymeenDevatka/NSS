// RegistrationForm.jsx

import React, { useState } from "react";

const RegistrationForm = ({ event, closeForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required!";
    if (!formData.email.trim()) newErrors.email = "Email is required!";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required!";
    if (!formData.college.trim()) newErrors.college = "College name is required!";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed! Try again.");
      }

      setMessage(data.message);
      setErrors({});
      setFormData({ name: "", email: "", phone: "", college: "" });

      setTimeout(() => {
        closeForm(); // Close modal after successful registration
      }, 2000);
    } catch (error) {
      setMessage(error.message || "Failed to register! Please check your connection.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        🎟 Register for <span className="text-blue-600">{event.title}</span>
      </h2>

      {message && (
        <p className={`text-center font-semibold ${message.includes("Failed") || message.includes("already") ? "text-red-500" : "text-green-600"}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Full Name", name: "name", type: "text", placeholder: "Enter your full name" },
          { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
          { label: "Phone", name: "phone", type: "tel", placeholder: "Enter your phone number" },
          { label: "College Name", name: "college", type: "text", placeholder: "Enter your college name" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-gray-700 font-medium">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300 outline-none"
              placeholder={field.placeholder}
            />
            {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Register
          </button>

          <button
            type="button"
            onClick={closeForm}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
