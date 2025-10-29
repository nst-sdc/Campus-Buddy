import React, { useState, useEffect } from "react";
import "./MyEvents.css";
import { FaCalendarPlus, FaArrowRight } from "react-icons/fa";
import {
  TrendingUp,
  CheckCircle,
  HelpCircle,
  Users,
  BarChart3,
  Code2,
  Music,
  Drama,
  Bot,
  Wrench,
  Trophy,
  Mic2,
  PartyPopper,
  Briefcase,
  Dumbbell,
  Megaphone,
  Camera,
  Video,
  Award,
  Lightbulb,
  User,
  Star,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import EventCardActions from "../components/EventCardActions"; // Import the EventCardActions component
import ApiService from "../services/api";

const categoryMap = {
  All: [],
  Tech: [
    "tech",
    "technology",
    "dev",
    "coding",
    "programming",
    "software",
    "it",
  ],
  Dance: ["dance", "dancing", "performance"],
  Music: ["music", "band", "concert", "singing", "performance"],
  Drama: ["drama", "theatre", "acting", "play", "performance"],
  Robotics: ["robotics", "robot", "automation", "mechatronics"],
  Workshop: ["workshop", "training", "session", "bootcamp"],
  Hackathon: ["hackathon", "coding competition", "codefest"],
  Podcast: ["podcast", "audio", "talk", "discussion"],
  Fest: ["fest", "festival", "celebration", "cultural fest"],
  Entrepreneurship: [
    "entrepreneurship",
    "startup",
    "e-cell",
    "business",
    "venture",
  ],
  Sports: ["sports", "fitness", "athletics", "games", "tournament"],
  "Public Speaking": [
    "public speaking",
    "debate",
    "speech",
    "elocution",
    "discussion",
  ],
  Photography: ["photography", "photo", "camera", "shoot"],
  Videography: ["videography", "video", "film", "shoot", "cinema"],
  Competition: ["competition", "contest", "challenge", "tournament", "quiz"],
  Innovation: ["innovation", "idea", "startup", "project", "invention"],
};

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [userResponses, setUserResponses] = useState({});
  const [userBookmarks, setUserBookmarks] = useState({}); // Track user bookmarks
  const [tab, setTab] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to "All"
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({}); // Track loading state for actions
  const navigate = useNavigate();
  const { user } = useAuth();
  const today = new Date();

  // Fetch events from JSON Server
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const eventsData = await ApiService.getEvents();
      // Fetch clubs for additional data
      const clubsData = await ApiService.getClubs();
      const clubsMap = {};
      clubsData.forEach((club) => {
        clubsMap[club.id] = club;
      });
      // Transform the data to match the expected format
      const transformedEvents = eventsData.map((event) => {
        const club = clubsMap[event.club_id] || {};
        const eventDate = new Date(event.event_date);
        return {
          id: event.id,
          title: event.title,
          description: event.description,
          date: event.event_date,
          time: event.event_time,
          location: event.venue,
          club: club.name || "Unknown Club",
          category: club.category || "General",
          eventType: event.event_type,
          attendees: event.attendees_count || 0,
          status: eventDate < today ? "past" : "upcoming",
          needsVolunteers: event.needs_volunteers,
          image:
            event.poster_url ||
            `https://via.placeholder.com/400x200?text=${encodeURIComponent(
              event.title
            )}`,
          tags: [club.category, event.event_type, club.name].filter(Boolean),
          maxVolunteers: event.max_volunteers,
          rsvpLimit: event.rsvp_limit,
          registrationFee: event.registration_fee || 0,
          contactEmail: event.contact_email,
          durationHours: event.duration_hours,
        };
      });
      setEvents(transformedEvents);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's event responses from JSON Server
  const fetchUserResponses = async () => {
    if (!user?.id) return;
    try {
      const data = await ApiService.getEventAttendance();
      const responses = {};
      data.filter((attendance) => attendance.user_id === user.id).forEach((attendance) => {
        responses[attendance.event_id] = attendance.status;
      });
      setUserResponses(responses);
    } catch (err) {
      console.error("Error fetching user responses:", err);
    }
  };

  // Fetch volunteer responses
  const fetchVolunteerResponses = async () => {
    if (!user?.id) return;
    try {
      const data = await ApiService.getEventVolunteers();
      const volunteerResponses = {};
      data.filter((volunteer) => volunteer.user_id === user.id).forEach((volunteer) => {
        volunteerResponses[volunteer.event_id] = "volunteer";
      });
      // Merge with existing responses
      setUserResponses((prev) => ({
        ...prev,
        ...volunteerResponses,
      }));
    } catch (err) {
      console.error("Error fetching volunteer responses:", err);
    }
  };

  // Fetch user bookmarks
  const fetchUserBookmarks = async () => {
    if (!user?.id) return;
    try {
      const data = await ApiService.getUserBookmarks(user.id);
      const bookmarks = {};
      data.forEach((bookmark) => {
        bookmarks[bookmark.event_id] = bookmark.id; // Store bookmark ID for deletion
      });
      setUserBookmarks(bookmarks);
    } catch (err) {
      console.error("Error fetching user bookmarks:", err);
    }
  };

  // Handle user response (going, maybe, not_going)
  const handleUserResponse = async (eventId, response) => {
    if (!user?.id) return;
    setActionLoading((prev) => ({ ...prev, [eventId]: true }));
    try {
      const existingData = (await ApiService.getEventAttendance()).filter(
        (a) => a.user_id === user.id && a.event_id === eventId
      );
      if (response === "not_going") {
        // If user clicks "Not Going", remove the event from their responses
        if (existingData.length > 0) {
          // Delete the attendance record
          await ApiService.deleteEventAttendance(existingData[0].id);
        }
        // Also remove from volunteers if they were volunteering
        const volunteerData = (await ApiService.getEventVolunteers()).filter(
          (v) => v.user_id === user.id && v.event_id === eventId
        );
        if (volunteerData.length > 0) {
          await ApiService.deleteEventVolunteer(volunteerData[0].id);
        }
        // Remove from local state (this will hide the event from the page)
        setUserResponses((prev) => {
          const newResponses = { ...prev };
          delete newResponses[eventId];
          return newResponses;
        });
      } else {
        // For going, maybe responses
        if (existingData.length > 0) {
          // Update existing response
          await ApiService.updateEventAttendance(existingData[0].id, {
            ...existingData[0],
            status: response,
          });
        } else {
          // Create new response
          await ApiService.createEventAttendance({
            user_id: user.id,
            event_id: eventId,
            status: response,
          });
        }
        // Update local state
        setUserResponses((prev) => ({
          ...prev,
          [eventId]: response,
        }));
      }
    } catch (err) {
      console.error("Error updating user response:", err);
    } finally {
      setActionLoading((prev) => ({ ...prev, [eventId]: false }));
    }
  };

  // Handle volunteer response
  const handleVolunteerResponse = async (eventId) => {
    if (!user?.id) return;
    setActionLoading((prev) => ({ ...prev, [eventId]: true }));
    try {
      const existingData = (await ApiService.getEventVolunteers()).filter(
        (v) => v.user_id === user.id && v.event_id === eventId
      );
      if (existingData.length === 0) {
        // Add volunteer
        await ApiService.createEventVolunteer({
          user_id: user.id,
          event_id: eventId,
        });
        // Update local state
        setUserResponses((prev) => ({
          ...prev,
          [eventId]: "volunteer",
        }));
      }
    } catch (err) {
      console.error("Error volunteering for event:", err);
    } finally {
      setActionLoading((prev) => ({ ...prev, [eventId]: false }));
    }
  };

  // Handle show stats (for club users)
  const handleShowStats = (event) => {
    // You can implement this based on your needs
    console.log("Show stats for event:", event);
    // navigate(`/events/${event.id}/stats`);
  };

  // Handle bookmark toggle
  const handleBookmarkToggle = async (eventId) => {
    if (!user?.id) return;
    setActionLoading((prev) => ({ ...prev, [eventId]: true }));
    try {
      if (userBookmarks[eventId]) {
        // Remove bookmark
        await ApiService.deleteEventBookmark(userBookmarks[eventId]);
        setUserBookmarks((prev) => {
          const newBookmarks = { ...prev };
          delete newBookmarks[eventId];
          return newBookmarks;
        });
      } else {
        // Add bookmark
        const bookmarkData = {
          user_id: user.id,
          event_id: eventId,
        };
        const newBookmark = await ApiService.createEventBookmark(bookmarkData);
        setUserBookmarks((prev) => ({
          ...prev,
          [eventId]: newBookmark.id,
        }));
      }
    } catch (err) {
      console.error("Error toggling bookmark:", err);
    } finally {
      setActionLoading((prev) => ({ ...prev, [eventId]: false }));
    }
  };

  useEffect(() => {
    const savedTab = sessionStorage.getItem("myEventsTab");
    const savedCategory = sessionStorage.getItem("myEventsCategory");

    // Set "All" as default if no saved tab exists
    if (savedTab) {
      setTab(savedTab);
    } else {
      setTab("All"); // Default to "All"
    }

    // Set "All" as default if no saved category exists
    if (savedCategory) {
      setSelectedCategory(savedCategory);
    } else {
      setSelectedCategory("All"); // Default to "All"
    }

    fetchEvents();
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchUserResponses();
      fetchVolunteerResponses();
      fetchUserBookmarks();
    }
  }, [user?.id]);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    sessionStorage.setItem("myEventsTab", newTab);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    sessionStorage.setItem("myEventsCategory", category);
  };

  const addToCalendar = (event) => {
    const eventDate = new Date(event.date);
    const [hours, minutes] = event.time.split(":");
    eventDate.setHours(parseInt(hours), parseInt(minutes));

    const startDate = eventDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const endDate = new Date(
      eventDate.getTime() + (event.durationHours || 2) * 60 * 60 * 1000
    )
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, "");

    const link = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(event.location)}`;
    window.open(link, "_blank");
  };

  const filterEventByCategory = (event, category) => {
    if (category === "All") return true;

    const keywords = categoryMap[category] || [];
    const keywordsLower = keywords.map((k) => k.toLowerCase());

    return (
      event.tags.some((tag) =>
        keywordsLower.some((kw) => tag.toLowerCase().includes(kw))
      ) || event.category === category
    );
  };

  const getStatusDisplay = (status) => {
    const statusMap = {
      going: { text: "Going", color: "success", icon: "✓" },
      not_going: { text: "Not Going", color: "danger", icon: "✗" },
      maybe: { text: "Maybe", color: "warning", icon: "?" },
      volunteer: { text: "Volunteering", color: "info", icon: "🙋‍♂️" },
    };
    return (
      statusMap[status] || { text: "Unknown", color: "secondary", icon: "?" }
    );
  };

  // Filter events to show only those the user has responded to positively
  const filteredEvents = events.filter((event) => {
    const userResponse = userResponses[event.id];
    // Only show events where user has going, maybe, or volunteer response
    if (!userResponse || userResponse === "not_going") return false;

    const eventDate = new Date(event.date);
    const isUpcoming = eventDate >= today;
    const isPast = eventDate < today;

    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = filterEventByCategory(event, selectedCategory);

    // Handle different tab filters
    if (tab === "Upcoming") {
      return isUpcoming && matchesCategory && matchesSearch;
    }
    if (tab === "Past") {
      return isPast && matchesCategory && matchesSearch;
    }
    if (tab === "Bookmarks") {
      // Show only bookmarked events
      return (
        userBookmarks[event.id] &&
        matchesCategory &&
        matchesSearch
      );
    }
    // "All" tab - show all events with positive responses
    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (category) => {
    return events.filter((event) => {
      const userResponse = userResponses[event.id];
      return (
        userResponse &&
        userResponse !== "not_going" &&
        filterEventByCategory(event, category)
      );
    }).length;
  };

  const categories = Object.keys(categoryMap).map((name) => ({
    name,
    icon: getCategoryIcon(name),
    count: getCategoryCount(name),
  }));

  function getCategoryIcon(name) {
    const iconMap = {
      All: <Star className="cat-icon" />,
      Tech: <Code2 className="cat-icon" />,
      Dance: <PartyPopper className="cat-icon" />,
      Music: <Music className="cat-icon" />,
      Drama: <Award className="cat-icon" />,
      Robotics: <Bot className="cat-icon" />,
      Workshop: <Wrench className="cat-icon" />,
      Hackathon: <Lightbulb className="cat-icon" />,
      Podcast: <Mic2 className="cat-icon" />,
      Fest: <PartyPopper className="cat-icon" />,
      Entrepreneurship: <Briefcase className="cat-icon" />,
      Sports: <Dumbbell className="cat-icon" />,
      "Public Speaking": <Megaphone className="cat-icon" />,
      Photography: <Camera className="cat-icon" />,
      Videography: <Video className="cat-icon" />,
      Competition: <Trophy className="cat-icon" />,
      Innovation: <Lightbulb className="cat-icon" />,
    };
    return iconMap[name] || <User className="cat-icon" />;
  }

  const getResponseCounts = () => {
    const counts = {
      going: 0,
      not_going: 0,
      maybe: 0,
      volunteer: 0,
      total: 0,
    };

    Object.values(userResponses).forEach((response) => {
      if (counts.hasOwnProperty(response)) {
        counts[response]++;
        // Only count positive responses in total (exclude not_going)
        if (response !== "not_going") {
          counts.total++;
        }
      }
    });

    return counts;
  };

  const responseCounts = getResponseCounts();

  if (loading) {
    return (
      <div className="my-events-container">
        <div className="loading-container">
          <p>Loading your events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-events-container">
        <div className="error-container">
          <p>Error loading events: {error}</p>
          <button onClick={fetchEvents}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-events-container">
      <div className="response-summary-panel">
        <div className="summary-panel-header">
          <TrendingUp className="summary-panel-icon" />
          <span className="summary-panel-title">Response Summary</span>
        </div>
        <div className="summary-metrics-list">
          <div className="summary-metric-item">
            <CheckCircle className="summary-metric-icon" />
            <span className="summary-metric-label">Going</span>
            <span className="summary-metric-number">
              {responseCounts.going}
            </span>
          </div>
          <div className="summary-metric-item">
            <HelpCircle className="summary-metric-icon" />
            <span className="summary-metric-label">Maybe</span>
            <span className="summary-metric-number">
              {responseCounts.maybe}
            </span>
          </div>
          <div className="summary-metric-item">
            <Users className="summary-metric-icon" />
            <span className="summary-metric-label">Volunteering</span>
            <span className="summary-metric-number">
              {responseCounts.volunteer}
            </span>
          </div>
          <div className="summary-metric-item">
            <BarChart3 className="summary-metric-icon" />
            <span className="summary-metric-label">Total</span>
            <span className="summary-metric-number">
              {responseCounts.total}
            </span>
          </div>
        </div>
      </div>
      <div className="my-events-header">
        <h1>
          <span className="gradient-emoji">✨</span>
          My <span className="gradient-title"> Events</span>
          <span className="gradient-emoji">✨</span>
        </h1>
        <p>Events you've responded to and your interests</p>
        <div className="my-events-search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search your events..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>
      </div>

      <div className="my-events-filters-container">
        <div className="my-events-categories">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`category-btn ${
                selectedCategory === cat.name ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(cat.name)}
            >
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-label">{cat.name}</span>
              <span className="cat-count">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="my-events-tabs">
        {["All", "Upcoming", "Past", "Bookmarks"].map((t) => (
          <button
            key={t}
            className={tab === t ? "active" : ""}
            onClick={() => handleTabChange(t)}
          >
            {t}
            {/* Optional: Add count badges for each tab */}
            {t === "Bookmarks" && (
              <span className="tab-count">
                {
                  events.filter((event) => {
                    return userBookmarks[event.id];
                  }).length
                }
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="my-events-list">
        {filteredEvents.length === 0 ? (
          <div className="no-events">
            <p>
              No events found. Visit the Campus Events page to RSVP to events!
            </p>
            <p className="no-events-hint">
              Events will appear here when you respond with "Going", "Maybe", or
              "Volunteer"
            </p>
            <button
              className="browse-events-btn"
              onClick={() => navigate("/campus-events")}
            >
              Browse Events
            </button>
          </div>
        ) : (
          filteredEvents.map((event) => {
            const eventDate = new Date(event.date);
            const isPast = eventDate < today;
            const userResponse = userResponses[event.id];
            const statusDisplay = getStatusDisplay(userResponse);

            return (
              <div className="my-events-card" key={event.id}>
                <div
                  className={`my-events-badge status status-${statusDisplay.color}`}
                >
                  {statusDisplay.icon} {statusDisplay.text}
                </div>

                <img
                  src={event.image}
                  alt={event.title}
                  className="my-events-image"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x200?text=${encodeURIComponent(
                      event.title
                    )}`;
                  }}
                />

                <div className="my-events-card-body">
                  <h2>{event.title}</h2>
                  <p className="my-events-desc">{event.description}</p>

                  <div className="my-events-meta">
                    <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                    <p>🕒 {event.time}</p>
                    <p>📍 {event.location}</p>
                    <p>🏛️ {event.club}</p>
                    {event.registrationFee > 0 && (
                      <p>💰 ₹{event.registrationFee}</p>
                    )}
                  </div>

                  <div className="my-events-tags">
                    {event.tags.map((tag, i) => (
                      <span
                        className={`my-events-tag tag-${tag
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        key={i}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="my-events-buttons">
                    {isPast ? (
                      <div className="past-ended-msg">This event has ended</div>
                    ) : (
                      <>
                        <button
                          className="calendar-btn"
                          onClick={() => addToCalendar(event)}
                        >
                          <FaCalendarPlus /> Add to Calendar
                        </button>

                        {/* Use EventCardActions component */}
                        <EventCardActions
                          event={event}
                          userResponse={userResponse}
                          isLoading={actionLoading[event.id] || false}
                          onUserResponse={handleUserResponse}
                          onVolunteerResponse={handleVolunteerResponse}
                          onShowStats={handleShowStats}
                          hideViewDetails={false} // Show view details button
                          hideNotGoing={false} // Show not going button
                          isBookmarked={!!userBookmarks[event.id]}
                          onBookmarkToggle={handleBookmarkToggle}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyEvents;
