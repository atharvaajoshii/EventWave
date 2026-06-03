import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function MyRegistrations() {
    const [registrations, setRegistrations] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        fetchRegistrations();
    }, []);
    const fetchRegistrations = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.get(
                "/my-registrations",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            setRegistrations(response.data);
        } catch (error) {
            console.log(error);
            setError("Failed to load registrations");
        }
    };
    return (
        <div>
            <h1>My Registrations</h1>
            <button onClick={() => navigate("/student")}>Back To Dashboard</button>
            {error && <p>{error}</p>}
            {
                registrations.length === 0 ? (
                    <p>
                        No registrations yet
                    </p>
                ) : (
                    registrations.map((event) => (
                        <div key={event.eid} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
                            <h3>{event.eventname}</h3>
                            <p>Date: {event.date}</p>
                            <p>Venue: {event.venue}</p>
                            <p>Capacity: {event.capacity}</p>
                        </div>
                    ))
                )
            }
        </div>
    );
}

export default MyRegistrations;