import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import axios from 'axios';

const CertificateTable = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/registrations');
        setRegistrations(res.data);
      } catch (err) {
        console.error("Error loading registrations:", err);
      }
    };

    fetchRegistrations();
  }, []);

  const generateCertificate = (name, eventName, collegeName) => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    // Background
    doc.setFillColor(240, 240, 255);
    doc.rect(0, 0, 297, 210, 'F');

    // Title
    doc.setFontSize(32);
    doc.setTextColor(80, 0, 150);
    doc.text('Certificate of Participation', 148, 50, { align: 'center' });

    // Subtitle
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('This is to certify that', 148, 75, { align: 'center' });

    // Name
    doc.setFontSize(26);
    doc.setTextColor(0, 0, 150);
    doc.text(name, 148, 90, { align: 'center' });

    // Event
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('has participated in the event', 148, 110, { align: 'center' });

    doc.setFontSize(22);
    doc.setTextColor(200, 0, 0);
    doc.text(eventName, 148, 125, { align: 'center' });

    // College
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('representing', 148, 145, { align: 'center' });

    doc.setFontSize(22);
    doc.setTextColor(0, 100, 0);
    doc.text(collegeName, 148, 160, { align: 'center' });

    // Footer
    doc.setFontSize(14);
    doc.setTextColor(120, 120, 120);
    doc.text('Thank you for being part of our event!', 148, 190, { align: 'center' });

    // Save PDF
    doc.save(`${name}_Certificate.pdf`);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
      <motion.h1
        className="text-4xl font-extrabold text-center mb-8 text-purple-700"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📜 Certificate Generator
      </motion.h1>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full text-left text-gray-700">
          <thead className="bg-purple-100 text-purple-700 font-semibold">
            <tr>
              <th className="p-4 border">#</th>
              <th className="p-4 border">Name</th>
              <th className="p-4 border">Email</th>
              <th className="p-4 border">Event</th>
              <th className="p-4 border">College</th>
              <th className="p-4 border">Download</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length > 0 ? (
              registrations.map((reg, index) => (
                <motion.tr
                  key={reg.id || index}
                  className="hover:bg-purple-50 transition"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <td className="p-4 border">{index + 1}</td>
                  <td className="p-4 border">{reg.name}</td>
                  <td className="p-4 border">{reg.email}</td>
                  <td className="p-4 border">{reg.event || 'Event'}</td>
                  <td className="p-4 border">{reg.college || 'College'}</td>
                  <td className="p-4 border">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() =>
                        generateCertificate(
                          reg.name || 'Participant',
                          reg.event || 'Event',
                          reg.college || 'College'
                        )
                      }
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow hover:shadow-xl transition"
                    >
                      Download
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No registrations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CertificateTable;
