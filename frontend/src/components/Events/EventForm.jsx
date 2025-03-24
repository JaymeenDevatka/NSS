import React, { useState, useEffect } from "react";

const EventForm = ({ closeForm, addEvent }) => {
    const [formData, setFormData] = useState({ title: "", date: "", venue: "" });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const eventId = params.get("eventId");
        if (eventId) setFormData((prev) => ({ ...prev, eventId }));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        addEvent(formData); // ✅ Pass event data to parent
        setFormData({ title: "", date: "", venue: "" }); // ✅ Clear form
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Create Event</h2>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Event Title"
                    className="w-full p-2 mb-2 border rounded"
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-2 mb-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    placeholder="Event Venue"
                    className="w-full p-2 mb-2 border rounded"
                    required
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Create
                </button>
                <button
                    type="button"
                    onClick={closeForm}
                    className="mt-3 w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EventForm;
