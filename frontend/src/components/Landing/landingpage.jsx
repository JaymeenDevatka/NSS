import React from "react";
import { motion } from "framer-motion";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// Your content
const nssContent = [
  {
    title: "What is NSS?",
    description:
      "The National Service Scheme (NSS) is a public service program under the Ministry of Youth Affairs & Sports. It encourages students to volunteer for community service and personal growth.",
  },
  {
    title: "Vision & Mission",
    description:
      "The vision of NSS is to build the personality of students through community service. It aims to foster social responsibility, civic consciousness, and inclusive development.",
  },
  {
    title: "Motto",
    description:
      "The NSS motto is 'Not Me But You', which reflects the essence of democratic living and the need for selfless service for the betterment of society.",
  },
  {
    title: "Objectives",
    description:
      "NSS encourages students to identify the needs and problems of the community, involve themselves in problem-solving, develop competence for group-living, and acquire leadership qualities.",
  },
  {
    title: "College Level Initiatives",
    description:
      "Students organize events like tree plantations, cleanliness drives, blood donation camps, and awareness programs on health, sanitation, and education within the campus and local neighborhoods.",
  },
  {
    title: "University Level Projects",
    description:
      "NSS units across colleges participate in collective university-wide campaigns for gender sensitization, digital literacy, waste management, and more.",
  },
  {
    title: "Republic Day Parade Camp",
    description:
      "Top NSS volunteers from across the country are selected to participate in the Republic Day Parade in New Delhi, showcasing discipline and service spirit.",
  },
  {
    title: "Benefits for Volunteers",
    description:
      "Participants gain certificates, recognition, and immense personal growth, developing soft skills, empathy, and a spirit of nationalism.",
  },
  {
    title: "Grassroots Impact",
    description:
      "NSS volunteers plant trees, teach underprivileged children, spread awareness about hygiene, and promote social responsibility at the village level.",
  },
];

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
      <Header />

      <main className="flex flex-col items-center px-6 py-20 text-center">
        {/* Hero Section with Complex Animation */}
        <div className="mb-10 text-center relative">
          <motion.h1
            className="text-6xl md:text-7xl font-extrabold text-white"
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            Welcome to <span className="text-yellow-300">Event Hub</span>
          </motion.h1>

          {/* Glowing underline with ripple effect */}
          <motion.div
            className="mt-4 h-2 w-40 mx-auto bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-500 rounded-full shadow-2xl"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
          />
        </div>

        {/* Typing Animation (with text reveal) */}
        <motion.p
          className="text-lg md:text-xl mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 2, duration: 2, ease: "easeOut" },
            }}
          >
            Dive into NSS activities, build a sense of service, and contribute to community welfare with every step you take!
          </motion.span>
        </motion.p>

        {/* Animated 3D Cards with Hover and Parallax Effect */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full">
          {nssContent.map((section, index) => (
            <motion.div
              key={index}
              className="relative bg-white/10 border border-white/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-left transform transition-all duration-500 hover:scale-110 hover:shadow-lg hover:rotate-[5deg] hover:translate-y-2"
              style={{ aspectRatio: "1 / 1", perspective: "1000px" }}
              initial={{ opacity: 0, y: 80, rotateX: -25 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              whileHover={{
                rotateY: 12,
                rotateX: -10,
                scale: 1.1,
                transition: { type: "spring", stiffness: 300, damping: 30 },
              }}
            >
              {/* Floating Glow Background Animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 via-pink-400/20 to-indigo-500/30 blur-xl opacity-30 z-0 animate-pulse"
                animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />

              {/* Card Content with Smooth Entrance */}
              <div className="relative z-10 flex flex-col justify-center h-full">
                <motion.h2
                  className="text-3xl font-bold mb-4 text-yellow-200 drop-shadow-md"
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  {section.title}
                </motion.h2>
                <motion.p
                  className="text-white/90 text-sm leading-relaxed tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  {section.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Call to Action (CTA) Button with Animated Hover Effect */}
        <motion.a
          href="#"
          className="mt-12 py-4 px-8 text-lg font-bold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-2xl transform transition-all duration-500 hover:scale-110 hover:rotate-[5deg] hover:shadow-xl hover:bg-gradient-to-r from-orange-500 to-yellow-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
        >
          Join the System
        </motion.a>
      </main>

      {/* Adding Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
      >
        <p className="text-lg font-semibold">Scroll Down</p>
        <motion.div
          className="mx-auto mt-2 w-8 h-8 rounded-full border-4 border-white animate-bounce"
        />
      </motion.div>

    </div>
  );
};

export default LandingPage;
