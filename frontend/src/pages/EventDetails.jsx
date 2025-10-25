import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import "./EventDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import ApiService from "../services/api";
import ImageCarousel from "../components/ImageCarousel";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isStudent } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userResponse, setUserResponse] = useState("");

  // Function to calculate actual attendees count from database
  const calculateAttendeesCount = async (eventId) => {
    try {
      const attendanceData = await ApiService.getEventAttendanceByEvent(eventId);
      // Count users who are "going" or "maybe"
      const interestedCount = attendanceData.filter(
        (attendance) =>
          attendance.status === "going" || attendance.status === "maybe"
      ).length;
      return interestedCount;
    } catch (err) {
      console.error("Error calculating attendees count:", err);
      return 0;
    }
  };

  // Fetch event details from JSON Server
  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch event data
      const eventData = await ApiService.getEventById(id);
      // Fetch club data for additional information
      const clubData = await ApiService.getClubById(eventData.club_id);
      // Calculate actual attendees count from database
      const actualAttendeesCount = await calculateAttendeesCount(eventData.id);
      // Transform the data to match expected format
      const transformedEvent = {
        id: eventData.id,
        title: eventData.title,
        name: eventData.title,
        description: eventData.description,
        date: new Date(eventData.event_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        time: eventData.event_time,
        location: eventData.venue,
        venue: eventData.venue,
        club: clubData.name || "Unknown Club",
        category: clubData.category || "General",
        eventType: eventData.event_type,
        attendees: actualAttendeesCount, // Use calculated count instead of stored count
        status: eventData.status,
        needsVolunteers: eventData.needs_volunteers,
        maxVolunteers: eventData.max_volunteers,
        rsvpLimit: eventData.rsvp_limit,
        registrationFee: eventData.registration_fee,
        contactEmail: eventData.contact_email,
        durationHours: eventData.duration_hours,
        posterUrl: eventData.poster_url,
        images: eventData.images || (eventData.poster_url ? [eventData.poster_url] : []),
        tags: eventData.tags || [
          clubData.category,
          eventData.event_type,
          clubData.name,
        ],
        createdBy: eventData.created_by,
        clubId: eventData.club_id,
        targetBatchYear: eventData.target_batch_year,
      };
      setEvent(transformedEvent);
    } catch (err) {
      console.error("Error fetching event details:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's response to this event
  const fetchUserResponse = async () => {
    if (!user?.id) return;
    try {
      const data = await ApiService.getEventAttendanceByEvent(id);
      const userData = data.filter((a) => a.user_id === user.id);
      if (userData.length > 0) {
        setUserResponse(userData[0].status);
      }
    } catch (err) {
      console.error("Error fetching user response:", err);
    }
  };

  // Helper function to get category emoji
  const getCategoryEmoji = (category) => {
    const emojiMap = {
      Sports: "🏀",
      Tech: "💻",
      "Arts (Drama)": "🎭",
      "Arts (Music)": "🎵",
      "Arts (Dance)": "💃",
      Photography: "📸",
      "E-Cell": "💼",
      "Dev Club": "⚡",
      "Content Creation": "📝",
      "Debate Society": "🗣️",
      "Cultural Committee": "🎪",
    };
    return emojiMap[category] || "📅";
  };

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  useEffect(() => {
    if (user?.id) {
      fetchUserResponse();
    }
  }, [user?.id, id]);

  if (loading) return <div className="loading">Loading event details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!event) return <div className="error">Event not found</div>;

  return (
    <div className="event-details-container">
      <div className="event-details-header-section">
        <button
          className="event-details-back-button"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          Back
        </button>
      </div>

      <div className="event-details-content-wrapper">
        {/* Event Images Carousel */}
        {event.images && event.images.length > 0 ? (
          <div className="event-details-banner">
            <ImageCarousel 
              images={event.images} 
              title={`${event.title} - Event Images`}
            />
            {event.status === "past" && (
              <div className="event-details-status-overlay">Past Event</div>
            )}
          </div>
        ) : (
          <div className="event-details-banner">
            <div className="event-details-placeholder-banner">
              <div className="event-details-placeholder-emoji">
                {getCategoryEmoji(event.category)}
              </div>
              <h1>{event.title}</h1>
            </div>
            {event.status === "past" && (
              <div className="event-details-status-overlay">Past Event</div>
            )}
          </div>
        )}

        {/* Event Title and Category */}
        <div className="event-details-header-info">
          <h1 className="event-details-title">{event.title}</h1>
          <span
            className={`event-details-category-badge ${event.category
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[()]/g, "")}`}
          >
            {event.category}
          </span>
        </div>

        {/* Current User Status Display */}
        {isStudent() && userResponse && (
          <div className="event-details-section">
            <h3>Your Status</h3>
            <div className="event-details-current-status">
              <p>
                Your current status:{" "}
                <strong>{userResponse.replace("_", " ")}</strong>
              </p>
              <p className="status-note">
                You can change your response from the My Events page.
              </p>
            </div>
          </div>
        )}

        {/* Event Description */}
        <div className="event-details-section">
          <h3>Description</h3>
          <p className="event-details-description">{event.description}</p>
        </div>

        {/* Event Information */}
        <div className="event-details-section">
          <h3>Event Information</h3>
          <div className="event-details-info-grid">
            <div className="event-details-info-item">
              <span className="event-details-info-icon">📅</span>
              <div>
                <strong>Date:</strong> {event.date}
              </div>
            </div>
            <div className="event-details-info-item">
              <span className="event-details-info-icon">⏰</span>
              <div>
                <strong>Time:</strong> {event.time}
              </div>
            </div>
            <div className="event-details-info-item">
              <span className="event-details-info-icon">📍</span>
              <div>
                <strong>Location:</strong> {event.location}
              </div>
            </div>
            <div className="event-details-info-item">
              <span className="event-details-info-icon">🏛️</span>
              <div>
                <strong>Organized by:</strong> {event.club}
              </div>
            </div>
            <div className="event-details-info-item">
              <span className="event-details-info-icon">👥</span>
              <div>
                <strong>Attendees:</strong> {event.attendees} interested
              </div>
            </div>
            {event.registrationFee > 0 && (
              <div className="event-details-info-item">
                <span className="event-details-info-icon">💰</span>
                <div>
                  <strong>Registration Fee:</strong> ₹{event.registrationFee}
                </div>
              </div>
            )}
            {event.durationHours && (
              <div className="event-details-info-item">
                <span className="event-details-info-icon">⏱️</span>
                <div>
                  <strong>Duration:</strong> {event.durationHours} hours
                </div>
              </div>
            )}
            {event.contactEmail && (
              <div className="event-details-info-item">
                <span className="event-details-info-icon">📧</span>
                <div>
                  <strong>Contact:</strong> {event.contactEmail}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="event-details-section">
          <h3>Tags</h3>
          <div className="event-details-tags-container">
            {event.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        {event.needsVolunteers && (
          <div className="event-details-section volunteer-info">
            <h3>🙋‍♂️ Volunteers Needed</h3>
            <p>
              This event is looking for volunteers to help make it a success!
            </p>
            {event.maxVolunteers && (
              <p>Maximum volunteers needed: {event.maxVolunteers}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
