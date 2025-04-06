// import React, { useState, useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const CertificateGenerator = () => {
//   const [name, setName] = useState('');
//   const [course, setCourse] = useState('');
//   const [date, setDate] = useState('');
//   const [issuedBy, setIssuedBy] = useState('NSS Charusat');
//   const certificateRef = useRef();

//   // Generate PDF using html2canvas and jsPDF
//   const generatePDF = () => {
//     const input = certificateRef.current;
    
//     html2canvas(input, {
//       scale: 2, // Higher quality
//       logging: false,
//       useCORS: true
//     }).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('landscape', 'mm', 'a4');
//       const imgWidth = 297; // A4 width in mm
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
//       pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//       pdf.save(`${name}_certificate.pdf`);
//     });
//   };

//   // Alternative printing method
//   const handlePrint = useReactToPrint({
//     content: () => certificateRef.current,
//     pageStyle: `
//       @page {
//         size: A4 landscape;
//         margin: 0;
//       }
//       @media print {
//         body {
//           -webkit-print-color-adjust: exact;
//         }
//       }
//     `
//   });

//   return (
//     <div className="container mx-auto p-4 max-w-4xl">
//       <h1 className="text-3xl font-bold text-center mb-8">Certificate Generator</h1>
      
//       {/* Form Inputs */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Participant Name</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter name"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Course/Event</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               value={course}
//               onChange={(e) => setCourse(e.target.value)}
//               placeholder="Enter course/event name"
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Date</label>
//             <input
//               type="date"
//               className="w-full p-2 border rounded"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Issued By</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               value={issuedBy}
//               onChange={(e) => setIssuedBy(e.target.value)}
//               placeholder="Organization name"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Certificate Preview */}
//       <div 
//         ref={certificateRef} 
//         className="certificate-container bg-white p-8 rounded-lg shadow-lg border-4 border-yellow-500"
//         style={{
//           backgroundImage: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9))',
//           backgroundSize: 'cover',
//           minHeight: '500px',
//           position: 'relative'
//         }}
//       >
//         <div className="text-center">
//           <div className="mb-8">
//             <img 
//               src="/nss-logo.png" 
//               alt="NSS Logo" 
//               className="h-20 mx-auto mb-4"
//             />
//             <h2 className="text-4xl font-bold text-blue-800 mb-2">CERTIFICATE OF APPRECIATION</h2>
//             <div className="w-32 h-1 bg-blue-600 mx-auto mb-4"></div>
//             <p className="text-lg">This is to certify that</p>
//           </div>

//           <h3 className="text-3xl font-bold text-gray-800 mb-6 underline decoration-yellow-500">
//             {name || '[Participant Name]'}
//           </h3>

//           <p className="text-xl mb-6">
//             has successfully completed the <span className="font-semibold">{course || '[Course/Event Name]'}</span>
//           </p>

//           <p className="text-lg mb-10">
//             organized by <span className="font-semibold">NSS CHARUSAT</span> on {date || '[Date]'}
//           </p>

//           <div className="flex justify-between mt-12">
//             <div className="text-center">
//               <div className="h-16 w-48 border-t-2 border-gray-400 mx-auto"></div>
//               <p className="mt-2">Signature</p>
//             </div>
//             <div className="text-center">
//               <div className="h-16 w-48 border-t-2 border-gray-400 mx-auto"></div>
//               <p className="mt-2">NSS Coordinator</p>
//             </div>
//           </div>

//           <div className="absolute bottom-4 right-4">
//             <p className="text-sm text-gray-500">Certificate ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-center space-x-4 mt-6">
//         <button
//           onClick={generatePDF}
//           disabled={!name || !course || !date}
//           className={`px-6 py-2 rounded-lg font-medium ${
//             !name || !course || !date
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-blue-600 hover:bg-blue-700 text-white'
//           }`}
//         >
//           Download PDF
//         </button>
//         <button
//           onClick={handlePrint}
//           disabled={!name || !course || !date}
//           className={`px-6 py-2 rounded-lg font-medium ${
//             !name || !course || !date
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-green-600 hover:bg-green-700 text-white'
//           }`}
//         >
//           Print Certificate
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CertificateGenerator;
import { useEffect, useState } from 'react';
import axios from 'axios';

const Certificate = () => {
  const [certURL, setCertURL] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/certificate', {
      headers: { Authorization: token }
    }).then(res => setCertURL(res.data.certificate_url));
  }, []);

  const handleDownload = async () => {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:3000/certificate/download', {}, {
      headers: { Authorization: token }
    });
    alert("Download marked! Now you can give feedback.");
  };

  return (
    <div>
      <h1>Certificate</h1>
      {certURL && <a href={certURL} download onClick={handleDownload}>Download Certificate</a>}
    </div>
  );
};

export default Certificate;
