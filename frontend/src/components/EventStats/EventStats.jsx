import { FaCalendarAlt, FaUsers, FaCheckCircle } from "react-icons/fa";

function EventStats({ totalEvents, totalParticipants, completedEvents }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-10">
            <div className="bg-white shadow-lg p-6 rounded-xl flex flex-col items-center">
                <FaCalendarAlt className="text-4xl text-blue-500 mb-2" />
                <h3 className="text-xl font-semibold">Total Events</h3>
                <p className="text-2xl font-bold">{totalEvents}</p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-xl flex flex-col items-center">
                <FaUsers className="text-4xl text-green-500 mb-2" />
                <h3 className="text-xl font-semibold">Total Participants</h3>
                <p className="text-2xl font-bold">{totalParticipants}</p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-xl flex flex-col items-center">
                <FaCheckCircle className="text-4xl text-purple-500 mb-2" />
                <h3 className="text-xl font-semibold">Completed Events</h3>
                <p className="text-2xl font-bold">{completedEvents}</p>
            </div>
        </div>
    );
}
