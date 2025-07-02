// CampusEvents.jsx
import React, { useState } from "react";
import { TrendingUp, Calendar, Star, Heart } from "lucide-react";
import "./CampusEvents.css";

const CampusEvents = () => {
  const [userRole, setUserRole] = useState("student"); // 'student' or 'club'
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userResponses, setUserResponses] = useState({});

  // Sample event data with image placeholders
  const events = [
    {
      id: 1,
      name: "Inter-Department Basketball Tournament",
      description:
        "Annual basketball championship between all departments. Register your team now and compete for the golden trophy. Matches will be held throughout the week.",
      date: "June 25, 2025",
      time: "5:00 PM - 8:00 PM",
      venue: "Sports Complex Court 1",
      club: "Sports Club",
      category: "Sports",
      eventType: "Competitions",
      attendees: 234,
      status: "past",
      needsVolunteers: false,
      imagePlaceholder: "🏀",
      hasImage: false,
    },
    {
      id: 2,
      name: "AI Club Hackathon",
      description:
        "Join us for a 24-hour coding marathon focused on AI and machine learning projects. Teams of 2-4 members will compete for exciting prizes while building innovative solutions.",
      date: "June 18, 2025",
      time: "10:00 AM - 6:00 PM",
      venue: "Seminar Hall A2",
      club: "Dev Club",
      category: "Tech",
      eventType: "Hackathons",
      attendees: 127,
      status: "past",
      needsVolunteers: true,
      imagePlaceholder: "💻",
      hasImage: false,
    },
    {
      id: 3,
      name: "Drama Club Auditions",
      description:
        "Open auditions for our upcoming theatrical production. We welcome actors, directors, and behind-the-scenes crew members. No experience necessary!",
      date: "June 20, 2025",
      time: "4:00 PM - 7:00 PM",
      venue: "Auditorium Main Hall",
      club: "Drama Club",
      category: "Arts (Drama)",
      eventType: "Cultural Shows",
      attendees: 89,
      status: "past",
      needsVolunteers: false,
      imagePlaceholder: "🎭",
      hasImage: false,
    },
    {
      id: 4,
      name: "Photography Workshop",
      description:
        "Learn the basics of digital photography and advanced techniques from professional photographers. Bring your cameras!",
      date: "July 5, 2025",
      time: "2:00 PM - 5:00 PM",
      venue: "Creative Studio B",
      club: "Photography Club",
      category: "Photography",
      eventType: "Workshops",
      attendees: 45,
      status: "upcoming",
      needsVolunteers: true,
      imagePlaceholder: "📸",
      hasImage: false,
    },
    {
      id: 5,
      name: "Annual Cultural Festival",
      description:
        "Three-day celebration of music, dance, and cultural performances from students across all departments.",
      date: "July 15, 2025",
      time: "6:00 PM - 10:00 PM",
      venue: "Main Campus Ground",
      club: "Cultural Committee",
      category: "Arts (Music)",
      eventType: "Festivals",
      attendees: 512,
      status: "upcoming",
      needsVolunteers: true,
      imagePlaceholder: "🎪",
      hasImage: false,
    },
    {
      id: 6,
      name: "Coding Competition",
      description:
        "Test your programming skills in this competitive coding challenge. Multiple programming languages supported.",
      date: "July 20, 2025",
      time: "10:00 AM - 4:00 PM",
      venue: "Computer Lab 3",
      club: "Dev Club",
      category: "Dev Club",
      eventType: "Competitions",
      attendees: 78,
      status: "upcoming",
      needsVolunteers: false,
      imagePlaceholder: "⚡",
      hasImage: false,
    },
  ];

  const categories = [
    "E-Cell",
    "Arts (Dance)",
    "Arts (Drama)",
    "Arts (Music)",
    "Sports",
    "Content Creation",
    "Dev Club",
    "Photography",
    "Debate Society",
  ];
  const eventTypes = [
    "Hackathons",
    "Workshops",
    "Competitions",
    "Seminars",
    "Festivals",
    "Cultural Shows",
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleEventTypeChange = (eventType) => {
    setSelectedEventTypes((prev) =>
      prev.includes(eventType)
        ? prev.filter((e) => e !== eventType)
        : [...prev, eventType]
    );
  };

  const handleUserResponse = (eventId, response) => {
    setUserResponses((prev) => ({
      ...prev,
      [eventId]: response,
    }));
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedEventTypes([]);
    setSearchQuery("");
  };

  const filteredEvents = events.filter((event) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "upcoming" && event.status === "upcoming") ||
      (activeTab === "past" && event.status === "past");

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(event.category);
    const matchesEventType =
      selectedEventTypes.length === 0 ||
      selectedEventTypes.includes(event.eventType);
    const matchesSearch =
      searchQuery === "" ||
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesCategory && matchesEventType && matchesSearch;
  });

  const EventCard = ({ event }) => {
    const userResponse = userResponses[event.id];

    return (
      <div className="event-card">
        <div className="event-image">
          {event.hasImage ? (
            <img src={event.imageUrl} alt={event.name} />
          ) : (
            <div className="event-placeholder-overlay">
              <div className="event-placeholder">{event.imagePlaceholder}</div>
            </div>
          )}

          {event.status === "past" && (
            <div className="event-status-badge">Past Event</div>
          )}
          <div className="photo-count">
            {event.hasImage ? "1 photo" : "No photos"}
          </div>
        </div>

        <div className="event-content">
          <div className="event-header">
            <h3 className="event-title">{event.name}</h3>
            <span
              className={`category-badge ${event.category
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[()]/g, "")}`}
            >
              {event.category}
            </span>
          </div>

          <p className="event-description">{event.description}</p>

          <div className="event-details">
            <div className="event-detail">
              <span className="detail-icon">📅</span>
              <span>
                {event.date} • {event.time}
              </span>
            </div>
            <div className="event-detail">
              <span className="detail-icon">📍</span>
              <span>{event.venue}</span>
            </div>
            <div className="event-detail">
              <span className="detail-icon">👥</span>
              <span>{event.attendees} interested</span>
            </div>
          </div>

          <div className="event-tags">
            <span className="tag">{event.category}</span>
            <span className="tag">{event.eventType}</span>
            <span className="tag">{event.club}</span>
          </div>

          {userRole === "student" ? (
            <div className="student-actions">
              <button
                className={`action-btn going ${
                  userResponse === "going" ? "active" : ""
                }`}
                onClick={() => handleUserResponse(event.id, "going")}
              >
                ✓ Going
              </button>
              <button
                className={`action-btn not-going ${
                  userResponse === "not-going" ? "active" : ""
                }`}
                onClick={() => handleUserResponse(event.id, "not-going")}
              >
                ✗ Not Going
              </button>
              <button
                className={`action-btn maybe ${
                  userResponse === "maybe" ? "active" : ""
                }`}
                onClick={() => handleUserResponse(event.id, "maybe")}
              >
                ? Maybe
              </button>
              {event.needsVolunteers && (
                <button
                  className={`action-btn volunteer ${
                    userResponse === "volunteer" ? "active" : ""
                  }`}
                  onClick={() => handleUserResponse(event.id, "volunteer")}
                >
                  🙋‍♂️ Volunteer
                </button>
              )}
            </div>
          ) : (
            <div className="club-actions">
              <button className="action-btn stats">📊 Stats</button>
              <button className="action-btn edit">✏️ Edit</button>
              <button className="action-btn delete">🗑️ Delete</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="campus-events">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <div className="app-icon">📅</div>
          <div>
            <h1 className="app-title">Campus Events</h1>
            <p className="app-subtitle">
              ✨ Discover amazing events happening on campus
            </p>
          </div>
        </div>
        <div className="header-right">
          <div className="user-role-selector">
            <label>View as: </label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="club">Club</option>
            </select>
          </div>
          <button
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>
      </div>

      {/* Floating Quick Stats */}
      <div className="floating-quick-stats">
        <div className="stats-header">
          <TrendingUp className="stats-icon" />
          <span className="stats-title">Quick Stats</span>
        </div>
        <div className="stats-list">
          <div className="stat-item">
            <Calendar className="stat-icon" />
            <span className="stat-label">Total Events</span>
            <span className="stat-number">6</span>
          </div>
          <div className="stat-item">
            <Star className="stat-icon" />
            <span className="stat-label">My RSVPs</span>
            <span className="stat-number">2</span>
          </div>
          <div className="stat-item">
            <Heart className="stat-icon" />
            <span className="stat-label">Upcoming</span>
            <span className="stat-number">1</span>
          </div>
        </div>
      </div>
      <div className="main-content">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="filters-sidebar">
            <div className="filter-section">
              <h3>Search Events</h3>
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-section">
              <h3>Date Range</h3>
              <input
                type="date"
                className="date-input"
                placeholder="Pick a date"
              />
            </div>

            <div className="filter-section">
              <h3>Club Categories</h3>
              {categories.map((category) => (
                <label key={category} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
              ))}
            </div>

            <div className="filter-section">
              <h3>Event Types</h3>
              {eventTypes.map((eventType) => (
                <label key={eventType} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedEventTypes.includes(eventType)}
                    onChange={() => handleEventTypeChange(eventType)}
                  />
                  {eventType}
                </label>
              ))}
            </div>

            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear All Filters
            </button>
          </div>
        )}

        {/* Events Content */}
        <div className="events-content">
          {/* Tabs */}
          <div className="content-tabs">
            <button
              className={`content-tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All Events
            </button>
            <button
              className={`content-tab ${
                activeTab === "upcoming" ? "active" : ""
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`content-tab ${activeTab === "past" ? "active" : ""}`}
              onClick={() => setActiveTab("past")}
            >
              Past
            </button>
          </div>

          {/* Events Grid */}
          <div className="events-grid">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="no-events">
              <p>No events found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampusEvents;
