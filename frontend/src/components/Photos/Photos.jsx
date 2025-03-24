import React, { useState, useEffect } from "react";
import axios from "axios";

const Photos = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        // Fetch all photos
        axios.get("http://localhost:8080/api/photos")
            .then(response => setPhotos(response.data))
            .catch(error => console.error("Error fetching photos:", error));
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!selectedFile) return alert("Please select a file!");

        const formData = new FormData();
        formData.append("photo", selectedFile);

        axios.post("http://localhost:8080/api/upload", formData)
            .then(response => {
                alert(response.data.message);
                setPhotos([...photos, response.data.photo]); // Update gallery
            })
            .catch(error => console.error("Upload error:", error));
    };

    return (
        <div className="w-full p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Photo Gallery</h1>
                <input type="file" onChange={handleFileChange} />
                <button 
                    onClick={handleUpload}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                    Upload Photo
                </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
                {photos.map((photo) => (
                    <div key={photo.id} className="bg-white shadow p-4 rounded-lg">
                        <img src={`http://localhost:8080/uploads/${photo.filename}`} alt={photo.title} className="h-40 w-full object-cover rounded-lg" />
                        <h2 className="mt-2 font-semibold">{photo.title}</h2>
                        <p className="text-sm text-gray-500">{photo.uploaded_at}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Photos;
