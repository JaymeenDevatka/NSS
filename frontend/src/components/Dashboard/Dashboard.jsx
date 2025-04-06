import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, animateScroll as scroll } from "react-scroll";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import { FaQuoteLeft, FaRocket, FaSignOutAlt } from "react-icons/fa";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/events/all")
      .then((response) => response.json())
      .then((data) => {
        const sortedEvents = data
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 6);
        setEvents(sortedEvents);
        setLoading(false);
      })
      .catch(() => {
        setError("⚠ Unable to fetch events. Please try again later.");
        setLoading(false);
      });
  }, []);

  const nextEvent = events.length > 0 ? events[0] : null;

  const quotes = [
    "Believe you can and you're halfway there.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Opportunities don't happen. You create them.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-pink-100 relative overflow-x-hidden">
      {/* Exit Button */}
      <motion.button
        onClick={() => window.location.href = "/"}
        className="fixed top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-full shadow-xl z-50 flex items-center gap-2"
        whileHover={{ scale: 1.1, rotate: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <FaSignOutAlt /> Exit
      </motion.button>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-lg p-4 flex justify-center space-x-8 z-40 border-b-4 border-purple-500">
        {["welcome", "events", "testimonials", "quotes"].map((section, index) => (
          <Link
            key={index}
            to={section}
            smooth={true}
            duration={600}
            className="cursor-pointer font-bold text-lg text-purple-600 hover:text-pink-600 transition-all transform hover:scale-110"
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </Link>
        ))}
      </nav>

      {/* Welcome Section */}
      <section id="welcome" className="pt-32 pb-20 bg-gradient-to-r from-purple-100 to-yellow-200 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto p-8 rounded-3xl bg-white/50 backdrop-blur-lg shadow-2xl"
        >
          <h1 className="text-4xl font-extrabold text-purple-700 mb-4">
            👋 Welcome to the NSS Dashboard
          </h1>
          <p className="text-lg text-gray-700">
            Stay connected with upcoming events, inspiring stories, and volunteer experiences that matter. Scroll down to explore!
          </p>
        </motion.div>
      </section>

      {/* Countdown Timer */}
      {nextEvent && <CountdownTimer eventDate={nextEvent.date} eventTitle={nextEvent.title} />}

      {/* Upcoming Events */}
      <section id="events" className="py-20 bg-gradient-to-r from-yellow-100 to-orange-200">
        <motion.h2
          className="text-5xl font-extrabold text-center mb-12 text-yellow-700"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🚀 Upcoming Events
        </motion.h2>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-300 h-40 rounded-lg shadow-md"
              ></div>
            ))
          ) : error ? (
            <p className="text-center text-red-600 text-lg">{error}</p>
          ) : events.length > 0 ? (
            events.map((event, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-xl rounded-xl p-6 border-l-4 border-pink-500 transition-transform duration-300 hover:scale-105 hover:border-purple-600 hover:shadow-2xl"
                initial={{ opacity: 0, rotateY: 90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600">📅 {new Date(event.date).toDateString()}</p>
                <p className="text-gray-600 mt-1">📍 {event.venue}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">🚫 No upcoming events found.</p>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-r from-green-100 to-blue-100">
        <motion.h2
          className="text-5xl font-extrabold text-center mb-12 text-teal-700"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          🗣️ What People Say
        </motion.h2>

        <div className="max-w-3xl mx-auto px-6 space-y-8">
          {["Great event experience!", "Loved the organization!", "Amazing volunteering opportunity!"].map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-xl p-6 rounded-xl border-l-4 border-green-500 transition-transform hover:scale-105 hover:border-blue-500"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-lg italic text-gray-700">{testimonial}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quotes Section */}
      <section id="quotes" className="py-20 bg-gradient-to-r from-purple-700 to-pink-600 text-white">
        <motion.h2
          className="text-5xl font-extrabold text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          💡 Inspirational Quotes
        </motion.h2>

        <div className="max-w-4xl mx-auto px-6 space-y-8">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              className="bg-white text-gray-900 shadow-lg p-6 rounded-xl border-l-4 border-yellow-500 flex items-center space-x-4 hover:shadow-2xl transform hover:scale-105 transition-all"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <FaQuoteLeft className="text-3xl text-yellow-500" />
              <p className="text-lg italic">{quote}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
