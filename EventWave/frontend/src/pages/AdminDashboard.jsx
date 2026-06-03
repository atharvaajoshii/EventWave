import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {

    const [events, setEvents] = useState([]);

    const [eventname, setEventname] = useState("");
    const [date, setDate] = useState("");
    const [venue, setVenue] = useState("");
    const [capacity, setCapacity] = useState("");
    const [selectedRegistrations,
        setSelectedRegistrations] = useState([]);

    const [error, setError] = useState("");

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.get(
                "/events", {
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

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await api.post(
                "/events",
                {
                    eventname,
                    date,
                    venue,
                    capacity
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            alert("Event Created Successfully");
            setEventname("");
            setDate("");
            setVenue("");
            setCapacity("");
            fetchEvents();
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                "Failed to create event"
            );
        }
    };

    const viewRegistrations = async (eventId) => {
        try {
            const token =
                localStorage.getItem("token");
            const response = await api.get(
                `/events/${eventId}/registrations`, {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
            );
            setSelectedRegistrations(
                response.data
            );
        } catch (error) {
            console.log(error);
            alert("Failed to load registrations");
        }
    };


    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                window.location.href = "/";
            }}>Logout</button>
            <p>Total Events: {events.length}</p>
            {error && <p>{error}</p>}
            <form onSubmit={handleCreateEvent}>
                <h2>Create Event</h2>
                <input type="text" placeholder="Event Name" value={eventname}
                    onChange={(e) =>
                        setEventname(e.target.value)
                    } />
                <br /><br />
                <input type="date" value={date}
                    onChange={(e) =>
                        setDate(e.target.value)
                    } />
                <br /><br />
                <input type="text" placeholder="Venue"
                    value={venue}
                    onChange={(e) =>
                        setVenue(e.target.value)
                    } />
                <br /><br />
                <input type="number" placeholder="Capacity"
                    value={capacity}
                    onChange={(e) =>
                        setCapacity(e.target.value)
                    } />
                <br /><br />
                <button type="submit">
                    Create Event
                </button>
            </form>

            <h2>All Events</h2>
            {
                events.map((event) => {
                    const fillPercentage =
                        Math.round(
                            (event.registrationCount /
                                event.capacity) * 100
                        );
                    let fillColor = "green";

                    if (fillPercentage >= 80) {
                        fillColor = "red";
                    }
                    else if (fillPercentage >= 50) {
                        fillColor = "orange";
                    }
                    return (
                        <div key={event.eid} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
                            <h3>{event.eventname}</h3>
                            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                            <p>Venue: {event.venue}</p>
                            <p>Capacity: {event.capacity}</p>
                            <p>Registrations:{event.registrationCount}</p>
                            <p style={{color: fillColor,fontWeight: "bold"}}>Fill Percentage:{fillPercentage}%</p>
                            <button onClick={() => viewRegistrations(event.eid)}>
                                View Registrations
                            </button>
                        </div>
                    );
                })
            }

            <h2>Student Registrations</h2>
            {
                selectedRegistrations.map((student) => (
                    <div key={student.uid}>
                        <p>{student.name}</p>
                        <p>{student.username}</p>
                        <hr />
                    </div>
                ))
            }
        </div>
    );
}

export default AdminDashboard;