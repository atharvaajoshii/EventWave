import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function StudentDashboard() {

    const [events, setEvents] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

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

    const registerEvent = async (eventId) => {
        try {
            const token = localStorage.getItem("token");
            await api.post(
                `/register/${eventId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
            alert("Registration Successful");
            fetchEvents();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );
        }
    };

    return (
        <div>
            <h1>Student Dashboard</h1>
            <button onClick={() => navigate("/my-registrations")}>My Registrations</button>
            <button onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    navigate("/");
                }}>Logout</button>
            {error && <p>{error}</p>}{
                events.map((event) => {
                    const isFull =
                        event.registrationCount >= event.capacity;
                    return (
                        <div key={event.eid} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
                            <h3>{event.eventname}</h3>
                            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                            <p>Venue: {event.venue}</p>
                            <p>Capacity: {event.capacity}</p>
                            <p>Registered: {event.registrationCount}</p>
                            {isFull && (<p><strong>FULL</strong></p>)}
                            <button disabled={isFull} onClick={() => registerEvent(event.eid)}>Register</button>
                        </div>
                    );
                })
            }

        </div>
    );
}

export default StudentDashboard;