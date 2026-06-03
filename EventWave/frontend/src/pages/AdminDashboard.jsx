import { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [eventname, setEventname] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [capacity, setCapacity] = useState(""); const [expandedEvent, setExpandedEvent] = useState(null);
  const [registrations, setRegistrations] = useState({});
  const [error, setError] = useState("");

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
          capacity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      alert(error.response?.data?.message || "Failed to create event");
    }
  };

  const viewRegistrations = async (eventId) => {
    if (expandedEvent === eventId) {
      setExpandedEvent(null);
      return;
    }
    try{
      const token =
        localStorage.getItem("token");
      const response = await api.get(
        `/events/${eventId}/registrations`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );
      setRegistrations(prev => ({
        ...prev,
        [eventId]: response.data
      }));
      setExpandedEvent(eventId);
    } catch (error) {

      console.log(error);
    }
  };

  // Calculate stats
  const totalEvents = events.length;
  const totalRegistrations = events.reduce((sum, event) => sum + event.registrationCount,0);
  const upcomingEvents = events.filter((event) => new Date(event.date) > new Date()).length;
  const fullEvents = events.filter((event) => event.registrationCount >= event.capacity).length;

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </header>

      <div className="admin-content">
        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-number">{totalRegistrations}</div>
            <div className="stat-label">Total Registrations</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{upcomingEvents}</div>
            <div className="stat-label">Upcoming Events</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{fullEvents}</div>
            <div className="stat-label">Full Events</div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* Create Event Form */}
        <div className="create-event-section">
          <h2 className="section-title">Create Event</h2>
          <form onSubmit={handleCreateEvent} className="event-form">
            <div className="form-field">
              <label>Event Name</label>
              <input type="text" placeholder="Enter event name" value={eventname} onChange={(e) => setEventname(e.target.value)} required /> 
            </div>
            <div className="form-field">
              <label>Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="form-field">
              <label>Venue</label>
              <input type="text" placeholder="Enter venue" value={venue} onChange={(e) => setVenue(e.target.value)} required />
            </div>
            <div className="form-field">
              <label>Capacity</label>
              <input type="number" placeholder="Enter capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
            </div>
            <button type="submit" className="submit-button">Create Event</button>
          </form>
        </div>

        {/* Events List */}
        <div className="events-list-section">
          <h2 className="section-title">All Events</h2>
          <div className="events-grid-admin">
            {events.map((event) => {
              const fillPercentage = Math.round(
                (event.registrationCount / event.capacity) * 100
              );
              let fillColor = "fill-green";

              if (fillPercentage >= 80) {
                fillColor = "fill-red";
              } else if (fillPercentage >= 50) {
                fillColor = "fill-orange";
              }

              return (
                <div key={event.eid} className="admin-event-card">
                  <h3 className="admin-event-title">{event.eventname}</h3>
                  <div className="admin-event-details">
                    <div className="admin-event-detail">
                      <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="admin-event-detail">
                      <strong>Venue:</strong> {event.venue}
                    </div>
                    <div className="admin-event-detail">
                      <strong>Capacity:</strong> {event.capacity}
                    </div>
                    <div className="admin-event-detail">
                      <strong>Registrations:</strong> {event.registrationCount}
                    </div>
                    <div className="admin-event-detail">
                      <strong>Fill:</strong>
                      <span className={`fill-percentage ${fillColor}`}>
                        {fillPercentage}%
                      </span>
                    </div>
                  </div>
                  <button className="view-registrations-button" onClick={() => viewRegistrations(event.eid)}>View Registrations</button>
                  {
                    expandedEvent === event.eid &&
                    registrations[event.eid] && (

                      <div
                        style={{
                          marginTop: "15px",
                          borderTop: "1px solid #ddd",
                          paddingTop: "10px"
                        }}
                      ><h4>Registered Students</h4>
                        {
                          registrations[event.eid]
                            .length === 0 ? (
                            <p>No registrations</p>
                          ) : (
                            registrations[event.eid]
                              .map(student => (
                                <div key={student.uid}>
                                  <p>{student.name}</p>
                                </div>
                              ))
                          )
                        }
                      </div>
                    )
                  }
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;