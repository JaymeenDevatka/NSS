import React, { useState, useEffect } from "react";
import axios from "axios";

const EventManager = () => {
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/events/all");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:8080/api/events", { title, venue, date });
      alert("Event added successfully!");
      fetchEvents();
      setTitle("");
      setVenue("");
      setDate("");
    } catch (error) {
      console.error("Error adding event", error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Event Manager</h1>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow-md">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Adding..." : "Add Event"}
        </button>
      </form>
      <h2 className="text-xl font-semibold mt-6">All Events</h2>
      <ul className="mt-4">
        {events.map((event) => (
          <li key={event.id} className="border p-3 rounded my-2">
            <strong>{event.title}</strong> at {event.venue} on {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventManager;
