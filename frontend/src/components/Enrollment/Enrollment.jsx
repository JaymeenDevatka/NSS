import React, { useState } from "react";

const EnrollmentForm = ({ onEnrollSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    event: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simulating a POST request to backend
      const response = await fetch("http://localhost:5000/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        if (onEnrollSuccess) onEnrollSuccess();
      } else {
        alert("Error enrolling in the event");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex items-center justify-center py-28 bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">
          Event Enrollment Form
        </h2>
        {submitted ? (
          <div className="text-center">
            <h3 className="text-green-500 text-xl">Enrollment Successful!</h3>
            <p>Thank you for joining the event.</p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Event Name</label>
              <input
                type="text"
                name="event"
                value={formData.event}
                onChange={handleChange}
                placeholder="Enter the event name"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              Enroll
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnrollmentForm;
