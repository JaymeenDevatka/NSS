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
        {/* Hero Section */}
        <div className="mb-10 text-center">
  <motion.h1
    className="text-5xl md:text-6xl font-bold"
    initial={{ opacity: 0, y: -60 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.0 }}
  >
    Welcome to <span className="text-yellow-300">Jaymeen Devatka's Event Hub</span>
  </motion.h1>

  {/* Slight underline effect */}
  <motion.div
    className="mt-4 h-1 w-32 mx-auto bg-yellow-300 rounded-full"
    initial={{ opacity: 0, scaleX: 0 }}
    animate={{ opacity: 1, scaleX: 1 }}
    transition={{ delay: 0.5, duration: 0.6 }}
  />
</div>


        <motion.p
          className="text-lg md:text-xl mb-16 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Explore NSS activities, grow through service, and contribute to society from grassroots to the national stage.
        </motion.p>

        {/* Animated 3D Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full">
          {nssContent.map((section, index) => (
            <motion.div
              key={index}
              className="relative bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl text-left transform transition-all duration-300 hover:scale-105 hover:shadow-pink-500/30 hover:rotate-[1deg]"
              style={{ aspectRatio: "1 / 1", perspective: "1000px" }}
              initial={{ opacity: 0, y: 80, rotateX: -25 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{
                rotateY: 4,
                rotateX: -4,
                transition: { type: "spring", stiffness: 200 },
              }}
            >
              {/* Floating Background Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-pink-400/10 to-indigo-500/10 blur-2xl opacity-30 z-0 animate-pulse"
                animate={{ y: [0, -10, 0], rotate: [0, 1, -1, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              />

              {/* Card Content */}
              <div className="relative z-10 h-full flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-3 text-yellow-200 drop-shadow-md">
                  {section.title}
                </h2>
                <p className="text-white/90 text-sm leading-relaxed tracking-wide">
                  {section.description}
                </p>
              </div>
            </motion.div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
