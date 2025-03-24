import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const EventRegistration = () => {
    const [searchParams] = useSearchParams();
    const eventId = searchParams.get("eventId");  // Extract eventId from URL

    const [event, setEvent] = useState(null);
    const [studentName, setStudentName] = useState("");
    const [studentEmail, setStudentEmail] = useState("");

    // Fetch event details based on eventId
    useEffect(() => {
        if (eventId) {
            fetch(`http://localhost:8080/api/events/${eventId}`)
                .then(res => res.json())
                .then(data => setEvent(data))
                .catch(err => console.error("Error fetching event:", err));
        }
    }, [eventId]);

    // Handle registration form submission
    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ student_name: studentName, student_email: studentEmail, event_id: eventId }),
        });

        const data = await response.json();
        alert(data.message);
    };

    if (!event) return <p>Loading event details...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">Register for {event.title}</h2>
            <p>📅 {event.date} | 📍 {event.venue}</p>

            <form onSubmit={handleRegister} className="mt-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="block w-full p-2 border rounded-lg mb-2"
                    required
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className="block w-full p-2 border rounded-lg mb-2"
                    required
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">Submit</button>
            </form>
        </div>
    );
};

export default EventRegistration;
