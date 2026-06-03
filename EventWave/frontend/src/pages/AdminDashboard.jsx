import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {

    const [events, setEvents] = useState([]);

    const [eventname, setEventname] = useState("");
    const [date, setDate] = useState("");
    const [venue, setVenue] = useState("");
    const [capacity, setCapacity] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.get(
                "/events",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setEvents(response.data);
        } catch (error) {
            console.log(error);
            setError("Failed to load events");
        }
    };

return (
    <div>
        <h1>Admin Dashboard</h1>

        <p>Total Events: {events.length}</p>

        {error && <p>{error}</p>}
    </div>
);
}

export default AdminDashboard;