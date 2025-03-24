import React, { useState, useEffect } from "react";
import EventForm from "./EventForm"; // ✅ Ensure this is imported
import { v4 as uuidv4 } from "uuid";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);

    // Fetch events from backend
    useEffect(() => {
        fetch("http://localhost:8080/api/events/all")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error("Error fetching events:", err));
    }, []);

    // Add event (send to backend)
    const addEvent = async (event) => {
        const newEvent = { ...event, id: uuidv4() };

        try {
            const response = await fetch("http://localhost:8080/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEvent),
            });

            if (response.ok) {
                setEvents((prevEvents) => [...prevEvents, newEvent]);
                setShowForm(false); // ✅ Close form after adding event
            } else {
                console.error("Failed to add event.");
            }
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    // Remove event (send delete request to backend)
    const removeEvent = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/events/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
            } else {
                console.error("Failed to delete event.");
            }
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    return (
        <div className="h-full">
            <div className="w-full px-10 mb-6">
                <div className="flex justify-between items-center py-5 pb-10">
                    <h1 className="text-2xl font-bold">Events</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                    >
                        + Create Event
                    </button>
                </div>

                {showForm && <EventForm closeForm={() => setShowForm(false)} addEvent={addEvent} />}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-7 w-full">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <div key={event.id} className="p-4 border rounded-lg shadow-md">
                                <h3 className="font-bold text-xl">{event.title}</h3>
                                <p>📅 Date: {event.date}</p>
                                <p>📍 Location: {event.venue}</p>
                                <button
                                    onClick={() => removeEvent(event.id)}
                                    className="mt-2 text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-3 py-5 text-center text-gray-500">No events available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Events;
