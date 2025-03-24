import React, { useEffect, useState } from "react";

function Dashboard() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/events/all") // Updated API URL
            .then((response) => response.json())
            .then((data) => {
                const sortedEvents = data.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 4);
                setEvents(sortedEvents);
            })
            .catch((error) => console.error("Error fetching events:", error));
    }, []);

    return (
        <div className="pb-2">
            <main className="container mx-auto w-screen">
                <h2 className="text-3xl font-bold text-gray-800 py-4 mb-5 text-center">Upcoming Events</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {events.length > 0 ? (
                        events.map((event, index) => (
                            <div key={index} className="bg-white shadow-lg p-6 content-center rounded-xl transform transition hover:scale-105 hover:shadow-xl">
                                <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                                <p className="text-sm text-gray-500">📅 Date: {new Date(event.date).toDateString()}</p>
                                <p className="text-sm text-gray-600 mt-2">📍 Location: {event.venue}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Loading events...</p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
