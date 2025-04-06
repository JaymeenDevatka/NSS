import React, { useState } from "react";

const CertificateDownload = ({ userEmail }) => {
  const [message, setMessage] = useState("");

  const handleDownload = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/certificate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });

      if (!response.ok) {
        const err = await response.json();
        setMessage(err.message);
        return;
      }

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${userEmail}_certificate.pdf`;
      link.click();
      setMessage("✅ Certificate downloaded!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error generating certificate");
    }
  };

  return (
    <div className="certificate-box">
      <h2>🎓 Download Your Certificate</h2>
      <p>Click the button below to get your participation certificate.</p>
      <button onClick={handleDownload}>Download Certificate</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CertificateDownload;
