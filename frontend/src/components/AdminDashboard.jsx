import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
    const [registrations, setRegistrations] = useState([]);
    
    // Fetch all registrations
    useEffect(() => {
        fetch("http://localhost:8080/api/registrations")
            .then(res => res.json())
            .then(data => setRegistrations(data))
            .catch(err => console.error("Error fetching registrations:", err));
    }, []);

    // Handle delete registration
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this registration?");
        if (!confirmDelete) return;

        const response = await fetch(`http://localhost:8080/api/registrations/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setRegistrations(registrations.filter(reg => reg.id !== id)); // Remove from UI
            alert("Registration deleted successfully.");
        } else {
            alert("Error deleting registration.");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">Admin Panel - Event Registrations</h2>
            {registrations.length === 0 ? (
                <p>No registrations found.</p>
            ) : (
                <table className="w-full mt-4 border-collapse border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Student Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Event ID</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.map((reg) => (
                            <tr key={reg.id} className="border">
                                <td className="p-2">{reg.id}</td>
                                <td className="p-2">{reg.student_name}</td>
                                <td className="p-2">{reg.student_email}</td>
                                <td className="p-2">{reg.event_id}</td>
                                <td className="p-2">
                                    <button 
                                        onClick={() => handleDelete(reg.id)}
                                        className="bg-red-500 text-white px-4 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminDashboard;
