import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const CertificateTable = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/registrations')
      .then(res => setRegistrations(res.data))
      .catch(err => console.error("Error loading registrations:", err));
  }, []);

  const downloadCertificate = (email) => {
    axios({
      url: `http://localhost:8080/api/registrations?email=${email}`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Certificate.pdf');
      document.body.appendChild(link);
      link.click();
    }).catch(err => {
      alert("Could not download certificate.");
      console.error(err);
    });
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
                  <td className="p-4 border">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => downloadCertificate(reg.email)}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow hover:shadow-xl transition"
                    >
                      Download
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
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
