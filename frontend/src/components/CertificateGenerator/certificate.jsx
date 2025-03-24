import React, { useState } from "react";
import axios from "axios";

function certificate() {
  const [name, setName] = useState("");
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleGenerate = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/generate-certificate", {
        name,
        event,
        date,
      });

      setDownloadUrl(response.data.downloadUrl);
    } catch (error) {
      console.error("Error generating certificate:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">🎓 Generate Your Certificate</h2>
      
      <input type="text" placeholder="Your Name" className="border p-2 w-full mb-3" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Event Name" className="border p-2 w-full mb-3" value={event} onChange={(e) => setEvent(e.target.value)} />
      <input type="date" className="border p-2 w-full mb-3" value={date} onChange={(e) => setDate(e.target.value)} />

      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleGenerate}>
        🎉 Generate Certificate
      </button>

      {downloadUrl && (
        <div className="mt-4">
          <p className="text-green-600">✅ Certificate Ready!</p>
          <a href={downloadUrl} download className="text-blue-600 underline">
            📥 Download Certificate
          </a>
        </div>
      )}
    </div>
  );
}

export default certificate;
