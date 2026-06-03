import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./StudentDashboard.css";

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
      const response = await api.get("/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
        `/register/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Registration Successful");
      fetchEvents();
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="student-dashboard">
      <nav className="dashboard-navbar">
        <div className="navbar-logo">EventWave</div>
        <div className="navbar-actions">
          <button
            className="navbar-button navbar-button-primary"
            onClick={() => navigate("/my-registrations")}
          >
            My Registrations
          </button>
          <button
            className="navbar-button navbar-button-secondary"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <h1 className="dashboard-welcome">Upcoming Events</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="events-grid">
          {events.map((event) => {
            const isFull = event.registrationCount >= event.capacity;
            return (
              <div key={event.eid} className="event-card">
                <h3 className="event-title">{event.eventname}</h3>
                
                <div className="event-details">
                  <div className="event-detail-item">
                    <span className="event-detail-label">Date:</span>
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="event-detail-item">
                    <span className="event-detail-label">Venue:</span>
                    {event.venue}
                  </div>
                  <div className="event-detail-item">
                    <span className="event-detail-label">Capacity:</span>
                    {event.capacity}
                  </div>
                  <div className="event-detail-item">
                    <span className="event-detail-label">Registered:</span>
                    {event.registrationCount}
                  </div>
                </div>

                {isFull && <div className="full-badge">FULL</div>}
                
                <button
                  className="register-button"
                  onClick={() => registerEvent(event.eid)}
                  disabled={isFull}
                >
                  {isFull ? "Event Full" : "Register"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;