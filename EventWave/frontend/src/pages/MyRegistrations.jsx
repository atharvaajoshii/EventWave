import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./MyRegistrations.css";

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
      const response = await api.get("/my-registrations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setRegistrations(response.data);
    } catch (error) {
      console.log(error);
      setError("Failed to load registrations");
    }
  };

  return (
    <div className="registrations-page">
      <nav className="registrations-navbar">
        <div className="registrations-logo">EventWave</div>
        <div className="registrations-nav-actions">
          <button
            className="back-button"
            onClick={() => navigate("/student")}
          >
            Back To Dashboard
          </button>
        </div>
      </nav>

      <div className="registrations-content">
        <h1 className="registrations-title">My Registrations</h1>

        {error && <div className="error-message">{error}</div>}

        {registrations.length === 0 ? (
          <div className="no-registrations">
            <p>No registrations yet</p>
          </div>
        ) : (
          <div className="registrations-grid">
            {registrations.map((event, index) => (
              <div key={index} className="registration-event-card">
                <h3 className="registration-event-title">{event.eventname}</h3>
                <div className="registration-event-details">
                  <div className="registration-event-detail">
                    <strong>Date:</strong> {event.date}
                  </div>
                  <div className="registration-event-detail">
                    <strong>Venue:</strong> {event.venue}
                  </div>
                  <div className="registration-event-detail">
                    <strong>Capacity:</strong> {event.capacity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRegistrations;