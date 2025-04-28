// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Photos = () => {
//   const [photosByEvent, setPhotosByEvent] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [events, setEvents] = useState([]);
//   const [uploadForm, setUploadForm] = useState({
//     title: "",
//     eventId: "",
//     file: null
//   });
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     fetchPhotos();
//     fetchEvents();
//   }, []);

//   const fetchPhotos = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/api/photos");
//       const groupedPhotos = {};

//       response.data.forEach(photo => {
//         if (!groupedPhotos[photo.event_title]) {
//           groupedPhotos[photo.event_title] = [];
//         }
//         groupedPhotos[photo.event_title].push(photo);
//       });

//       setPhotosByEvent(groupedPhotos);
//     } catch (error) {
//       console.error("Error fetching photos:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/api/events/all");
//       setEvents(response.data);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "file") {
//       setUploadForm({ ...uploadForm, file: files[0] });
//     } else {
//       setUploadForm({ ...uploadForm, [name]: value });
//     }
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!uploadForm.title || !uploadForm.eventId || !uploadForm.file) {
//       alert("Please fill all fields and select a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", uploadForm.title);
//     formData.append("event_id", uploadForm.eventId);
//     formData.append("photo", uploadForm.file); // Changed 'file' to 'photo'

//     try {
//       setUploading(true);
//       const response = await axios.post("http://localhost:8080/api/photos/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert(response.data.message); // Show success message
//       setUploadForm({ title: "", eventId: "", file: null });
//       fetchPhotos(); // Refresh gallery after upload
//     } catch (error) {
//       console.error("Error uploading photo:", error);
//       alert("Error uploading photo. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen p-8 bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400">
//       <div className="flex flex-col justify-center items-center mb-8 gap-4">
//         <h1 className="text-3xl font-bold text-white">📸 Colorful Photo Gallery</h1>
//       </div>

//       {/* Upload Form */}
//       <div className="max-w-xl mx-auto mb-10 bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-xl font-bold mb-4 text-gray-800">Upload New Photo</h2>
//         <form onSubmit={handleUpload} className="flex flex-col gap-4">
//           <input
//             type="text"
//             name="title"
//             placeholder="Photo Title"
//             value={uploadForm.title}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//           />
//           <select
//             name="eventId"
//             value={uploadForm.eventId}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//           >
//             <option value="">Select Event</option>
//             {events.map(event => (
//               <option key={event.id} value={event.id}>{event.title}</option>
//             ))}
//           </select>
//           <input
//             type="file"
//             name="file"
//             accept="image/*"
//             onChange={handleInputChange}
//             className="p-2"
//           />
//           <button
//             type="submit"
//             disabled={uploading}
//             className="bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-800 transition"
//           >
//             {uploading ? "Uploading..." : "Upload Photo"}
//           </button>
//         </form>
//       </div>

//       {/* Photos Gallery */}
//       {loading ? (
//         <p className="text-white text-center text-xl animate-pulse">Loading photos...</p>
//       ) : (
//         Object.keys(photosByEvent).length > 0 ? (
//           Object.keys(photosByEvent).map(eventTitle => (
//             <div key={eventTitle} className="mb-10">
//               <h2 className="text-2xl font-bold text-white mb-4">{eventTitle}</h2>
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {photosByEvent[eventTitle].map(photo => (
//                   <div key={photo.id} className="bg-white shadow-lg p-4 rounded-lg relative transform transition hover:scale-105 hover:shadow-2xl">
//                     <img
//                       src={`http://localhost:8080/uploads/${photo.filename}`}
//                       alt={photo.title}
//                       className="h-40 w-full object-cover rounded-lg border-2 border-gray-300"
//                       loading="lazy"
//                     />
//                     <h2 className="mt-2 font-semibold text-gray-800">{photo.title}</h2>
//                     <p className="text-sm text-gray-500">{photo.uploaded_at}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-white text-center text-lg">No photos uploaded yet.</p>
//         )
//       )}
//     </div>
//   );
// };

// export default Photos;


import React, { useState, useEffect } from "react";
import axios from "axios";

const Photos = () => {
  const [photosByEvent, setPhotosByEvent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/photos");
      const groupedPhotos = {};

      response.data.forEach(photo => {
        if (!groupedPhotos[photo.event_title]) {
          groupedPhotos[photo.event_title] = [];
        }
        groupedPhotos[photo.event_title].push(photo);
      });

      setPhotosByEvent(groupedPhotos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen p-8 bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400">
      <div className="flex flex-col justify-center items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white">📸 Colorful Photo Gallery</h1>
      </div>

      {/* Photos Gallery */}
      {loading ? (
        <p className="text-white text-center text-xl animate-pulse">Loading photos...</p>
      ) : (
        Object.keys(photosByEvent).length > 0 ? (
          Object.keys(photosByEvent).map(eventTitle => (
            <div key={eventTitle} className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">{eventTitle}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {photosByEvent[eventTitle].map(photo => (
                  <div key={photo.id} className="bg-white shadow-lg p-4 rounded-lg relative transform transition hover:scale-105 hover:shadow-2xl">
                    <img
                      src={`http://localhost:8080/uploads/${photo.filename}`}
                      alt={photo.title}
                      className="h-40 w-full object-cover rounded-lg border-2 border-gray-300"
                      loading="lazy"
                    />
                    <h2 className="mt-2 font-semibold text-gray-800">{photo.title}</h2>
                    <p className="text-sm text-gray-500">{photo.uploaded_at}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center text-lg">No photos uploaded yet.</p>
        )
      )}
    </div>
  );
};

export default Photos;
