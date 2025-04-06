import React from 'react';
import EventFeedback from './Feedback';
import { motion } from 'framer-motion';

const eventIds = [5,7,8,10,12,13,14]; // Replace with actual event IDs

const AllEventFeedback = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-12 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center mb-12 text-gray-800"
      >
        Share Feedback for All Events
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
        {eventIds.map((id, idx) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 30, rotateY: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            whileHover={{
              scale: 1.03,
              rotateX: 3,
              rotateY: -3,
              transition: { type: "spring", stiffness: 200 }
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="perspective"
          >
            <EventFeedback id={id} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllEventFeedback;
