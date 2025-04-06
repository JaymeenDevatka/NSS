import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const EventFeedback = ({ id }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, feedbackRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/events/${id}`),
          axios.get(`http://localhost:8080/api/feedback/check`, { params: { id } })
        ]);
        setEventDetails(eventRes.data);
        setSubmitted(feedbackRes.data.submitted);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    if (rating === 0 || comments.trim() === '') {
      setError(rating === 0 ? 'Please select a rating' : 'Please provide comments');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/feedback', {
        id,
        rating,
        comments
      });
      setSubmitted(true);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit feedback');
    }
  };

  const starVariants = {
    hover: { scale: 1.2 },
    tap: { scale: 0.9 }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-40"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </motion.div>
    );
  }

  return (
    <div
      ref={ref}
      className={`fixed inset-0 flex items-center justify-center p-4 ${!inView ? 'pt-20' : ''}`}
      style={{ zIndex: 1000 }}
    >
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-800 px-4 py-2 rounded-lg shadow-lg z-50"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
          rotateX: 4,
          rotateY: -4,
          transition: { type: "spring", stiffness: 100 }
        }}
        className="bg-white/30 backdrop-blur-lg border border-white/10 shadow-2xl max-w-md w-full mx-4 relative rounded-2xl p-6"
        style={{
          marginTop: "2rem",
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        {/* Glowing Animated Background */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/20 via-pink-400/20 to-yellow-300/20 blur-3xl opacity-40 z-0"
          animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <div className="relative z-10">
          {submitted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
                className="text-green-500 mb-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h3>
              <p className="text-gray-600">Your feedback for "{eventDetails?.title}" has been recorded.</p>
            </motion.div>
          ) : (
            <>
              <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-4 text-gray-800">
                Feedback for: {eventDetails?.title}
              </motion.h2>

              <motion.p variants={itemVariants} className="text-gray-600 mb-6">
                <span className="font-medium">Venue:</span> {eventDetails?.venue}<br />
                <span className="font-medium">Date:</span> {new Date(eventDetails?.date).toLocaleDateString()}
              </motion.p>

              <motion.div variants={itemVariants} className="mb-6">
                <label className="block mb-3 font-medium text-gray-700">Your Rating:</label>
                <div className="flex justify-center space-x-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      variants={starVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className="focus:outline-none"
                    >
                      <FaStar
                        size={28}
                        className={`transition-colors duration-200 ${star <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <label className="block mb-3 font-medium text-gray-700">Comments:</label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  initial={{ scale: 0.98 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all backdrop-blur bg-white/30"
                  rows="4"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Share your experience..."
                />
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: '0 4px 20px rgba(59,130,246,0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={rating === 0 || comments.trim() === ''}
                className={`w-full py-3 px-4 rounded-xl text-white font-semibold transition-all ${
                  rating === 0 || comments.trim() === ''
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-pink-500'
                }`}
              >
                Submit Feedback
              </motion.button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default EventFeedback;
