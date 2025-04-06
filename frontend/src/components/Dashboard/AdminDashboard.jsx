// src/components/AdminDashboard/AdminDashboard.js
import React from "react";
import { motion } from "framer-motion";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-10">
      <motion.h1 
        className="text-5xl font-extrabold text-center text-blue-700 mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🛠 Admin Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          { title: "Manage Events", icon: "📅" },
          { title: "User Accounts", icon: "👤" },
          { title: "View Feedback", icon: "💬" },
          { title: "Add New Event", icon: "➕" },
          { title: "Analytics", icon: "📊" },
        ].map((tool, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl shadow-xl border-l-4 border-blue-500 hover:border-purple-600 transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-2">{tool.icon} {tool.title}</h2>
            <p className="text-gray-600">Tool description or link to related page.</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
