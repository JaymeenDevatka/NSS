import { useEffect, useState } from "react";

function CountdownTimer({ eventDate }) {
    const calculateTimeLeft = () => {
        const difference = new Date(eventDate) - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [eventDate]);

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg text-center">
            <h2 className="text-3xl font-bold">⏳ Next Event Starts In:</h2>
            <div className="flex justify-center space-x-4 mt-4">
                {Object.entries(timeLeft).map(([unit, value], index) => (
                    <div key={index} className="text-xl font-semibold">
                        {value} <span className="text-sm">{unit}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CountdownTimer;
