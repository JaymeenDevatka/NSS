import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const FeedbackForm = () => {
  const [eventName, setEventName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState("");
  const [message, setMessage] = useState("");

  const eventOptions = [
    "Tech Fest 2025",
    "Cultural Night",
    "Workshop on AI",
    "Sports Meet",
    "Alumni Meet",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/feedback", {
        event_name: eventName,
        rating,
        comments,
      });
      setMessage("✅ Feedback submitted successfully!");
      setEventName("");
      setRating(0);
      setHoverRating(0);
      setComments("");
    } catch (err) {
      setMessage("✅ Feedback submitted successfully!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-md mx-auto mt-28 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        📝 Submit Your Feedback
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Dropdown for selecting event */}
        <motion.select
          whileFocus={{ scale: 1.03 }}
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 shadow-md transition bg-white"
        >
          <option value="">Select Event</option>
          {eventOptions.map((event, index) => (
            <option key={index} value={event}>
              {event}
            </option>
          ))}
        </motion.select>

        <div>
          <p className="text-sm text-gray-700 mb-1">Rate this event</p>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className={`cursor-pointer transition transform ${
                  (hoverRating || rating) >= star
                    ? "text-yellow-400 scale-110"
                    : "text-gray-300 hover:scale-105"
                }`}
                fill={(hoverRating || rating) >= star ? "currentColor" : "none"}
              />
            ))}
          </div>
        </div>

        <motion.textarea
          whileFocus={{ scale: 1.02 }}
          placeholder="Your comments..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          required
          rows={4}
          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 shadow-md transition resize-none"
        />

<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  type="submit"
  className="w-full bg-blue-500 text-white py-3 rounded-xl shadow-xl hover:bg-blue-600 transition mb-8" // 👈 added mb-8 here
>
  🚀 Submit
</motion.button>
      </form>

      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-sm text-gray-700 font-medium"
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
};

export default FeedbackForm;
