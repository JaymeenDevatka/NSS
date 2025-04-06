import React, { useState, useEffect } from "react";
import axios from "axios";

const Photos = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPhotos();
    }, []);

    // Fetch all photos from the backend
    const fetchPhotos = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/photos");
            setPhotos(response.data);
        } catch (error) {
            console.error("Error fetching photos:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle file selection and preview
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // Trigger file input on "Add Photo" button click
    const triggerFileSelect = () => {
        document.getElementById("fileInput").click();
    };

    // Handle file upload
    const handleUpload = async () => {
        if (!selectedFile) return alert("❌ Please select a file!");

        const formData = new FormData();
        formData.append("photo", selectedFile);

        try {
            const response = await axios.post("http://localhost:8080/api/upload", formData, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                },
            });

            alert(response.data.message);
            setPhotos([...photos, response.data.photo]);
            setSelectedFile(null);
            setPreviewUrl("");
            setUploadProgress(0);
        } catch (error) {
            alert("❌ Upload failed! Try again.");
            console.error("Upload error:", error);
        }
    };

    // Handle photo deletion
    const handleDelete = async (photoId) => {
        try {
            await axios.delete(`http://localhost:8080/api/photos/${photoId}`);
            setPhotos(photos.filter((photo) => photo.id !== photoId));
            alert("✅ Photo deleted successfully");
        } catch (error) {
            alert("❌ Error: Unable to delete photo.");
            console.error("Delete error:", error);
        }
    };

    // Handle photo download
    const handleDownload = (filename) => {
        const url = `http://localhost:8080/uploads/${filename}`;
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full min-h-screen p-8 bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-white">📸 Colorful Photo Gallery</h1>

                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start relative z-10">
                    {/* Hidden File Input */}
                    <input 
                        type="file" 
                        id="fileInput"
                        className="hidden"
                        onChange={handleFileChange} 
                    />
                    
                    {/* "Add Photo" Button (opens file picker) */}
                    <button 
                        onClick={triggerFileSelect}
                        className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
                    >
                        ➕ Add Photo
                    </button>

                    {/* "Upload Photo" Button */}
                    <button 
                        onClick={handleUpload}
                        className={`bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition ${
                            selectedFile ? "" : "opacity-50 cursor-not-allowed"
                        }`}
                        disabled={!selectedFile}
                    >
                        🚀 Upload Photo
                    </button>
                </div>
            </div>

            {/* Preview Image Before Upload */}
            {previewUrl && (
                <div className="mb-4 text-center">
                    <h2 className="text-lg font-semibold text-white">Preview:</h2>
                    <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="h-40 w-auto rounded-lg shadow-lg border-4 border-white"
                    />
                </div>
            )}

            {/* Upload Progress Bar */}
            {uploadProgress > 0 && (
                <div className="w-full bg-gray-300 rounded-full h-4">
                    <div
                        className="bg-blue-600 h-4 rounded-full text-center text-white text-sm transition-all"
                        style={{ width: `${uploadProgress}%` }}
                    >
                        {uploadProgress}%
                    </div>
                </div>
            )}

            {/* Photos Grid */}
            {loading ? (
                <p className="text-white text-center text-xl animate-pulse">Loading photos...</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {photos.length > 0 ? (
                        photos.map((photo) => (
                            <div 
                                key={photo.id} 
                                className="bg-white shadow-lg p-4 rounded-lg relative transform transition hover:scale-105 hover:shadow-2xl"
                            >
                                <img 
                                    src={`http://localhost:8080/uploads/${photo.filename}`} 
                                    alt={photo.title} 
                                    className="h-40 w-full object-cover rounded-lg border-2 border-gray-300"
                                    loading="lazy"
                                />
                                <h2 className="mt-2 font-semibold text-gray-800">{photo.title}</h2>
                                <p className="text-sm text-gray-500">{photo.uploaded_at}</p>

                                <div className="flex gap-2 mt-3">
                                    <button 
                                        onClick={() => handleDelete(photo.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                                    >
                                        ❌ Delete
                                    </button>
                                    <button 
                                        onClick={() => handleDownload(photo.filename)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        ⬇ Download
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-white text-center text-lg">No photos uploaded yet.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Photos;
