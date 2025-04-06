import React, { useState, useEffect } from "react";
import RegistrationForm from "./RegistrationForm";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Fetch events from backend
    useEffect(() => {
        fetch("http://localhost:8080/api/events/all")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error("Error fetching events:", err));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-800">📅 Upcoming Events</h1>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <div 
                                key={event.id} 
                                className="bg-white p-5 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg border border-gray-200"
                            >
                                <h3 className="font-semibold text-xl mb-2 text-gray-900">{event.title}</h3>
                                <p className="text-gray-600">📍 <span className="font-medium text-indigo-600">{event.venue}</span></p>
                                <p className="text-gray-600">📅 <span className="font-medium text-green-600">{event.date}</span></p>
                                <button
                                    onClick={() => setSelectedEvent(event)}
                                    className="mt-3 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
                                >
                                    Register
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-3 text-center text-gray-500">No events available.</p>
                    )}
                </div>
            </div>

            {/* Registration Form Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                        <button 
                            onClick={() => setSelectedEvent(null)} 
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
                        >
                            ✖
                        </button>
                        <RegistrationForm event={selectedEvent} closeForm={() => setSelectedEvent(null)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;
