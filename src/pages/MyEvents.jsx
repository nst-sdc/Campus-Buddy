import React, { useState, useEffect } from "react";
import "./MyEvents.css";
import { mockEvents as initialEvents } from "../data/mockEvents";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [tab, setTab] = useState("Upcoming");

  const today = new Date();

  useEffect(() => {
    // Set initial events from mockEvents
    setEvents(initialEvents);
  }, []);

  // Update RSVP status (only for upcoming events)
  const updateStatus = (id, status) => {
    const updated = events.map((event) => {
      const isPast = new Date(event.date) < today;
      if (event.id === id && !isPast) {
        return { ...event, status };
      }
      return event;
    });
    setEvents(updated);
  };

  // Filter only Going/Maybe RSVP events and divide by date
  const filteredEvents = events.filter((event) => {
    if (!["Going", "Maybe"].includes(event.status)) return false;
    const eventDate = new Date(event.date);
    return tab === "Upcoming" ? eventDate >= today : eventDate < today;
  });

  return (
    <div className="my-events">
      <div className="header">
        <h1>🎟️ My Events</h1>
        <p>Events you've RSVP'd to</p>
      </div>

      <div className="tabs">
        <button
          className={tab === "Upcoming" ? "active" : ""}
          onClick={() => setTab("Upcoming")}
        >
          Upcoming Events
        </button>
        <button
          className={tab === "Past" ? "active" : ""}
          onClick={() => setTab("Past")}
        >
          Past Events
        </button>
      </div>

      {filteredEvents.length === 0 ? (
        <p className="no-events">No {tab.toLowerCase()} RSVP'd events.</p>
      ) : (
        <div className="event-list">
          {filteredEvents.map((event) => {
            const isPast = new Date(event.date) < today;
            return (
              <div className="event-card" key={event.id}>
                <div className="image-wrapper">
                  <img src={event.image} alt={event.title} />
                  <span className="photo-tag">{event.photos} photos</span>
                </div>

                <div className="details">
                  <h2>{event.title}</h2>
                  <p className="desc">{event.description}</p>

                  <div className="meta">
                    <p>📅 {event.date}, {event.time}</p>
                    <p>📍 {event.location}</p>
                    <p>🟢 RSVP Status: <span className={`badge ${event.status.toLowerCase()}`}>{event.status}</span></p>
                  </div>

                  <div className="tags">
                    {event.tags.map((tag, i) => (
                      <span className="tag" key={i}>{tag}</span>
                    ))}
                  </div>

                  <div className="footer">
                    <span className="interested">👥 {event.interested} interested</span>
                    <div className="buttons">
                      <button
                        className={`btn going ${event.status === "Going" ? "active" : ""}`}
                        onClick={() => updateStatus(event.id, "Going")}
                        disabled={isPast}
                      >✔ Going</button>
                      <button
                        className={`btn not-going ${event.status === "Not Going" ? "active" : ""}`}
                        onClick={() => updateStatus(event.id, "Not Going")}
                        disabled={isPast}
                      >✖ Not Going</button>
                      <button
                        className={`btn maybe ${event.status === "Maybe" ? "active" : ""}`}
                        onClick={() => updateStatus(event.id, "Maybe")}
                        disabled={isPast}
                      >🤔 Maybe</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyEvents;