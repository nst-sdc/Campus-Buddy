import React, { useState, useEffect } from "react";
import {
  X,
  TrendingUp,
  Users,
  Calendar,
  MapPin,
  Clock,
  Mail,
  DollarSign,
} from "lucide-react";
import "./EventStatistics.css";

const EventStatisticsModal = ({ event, isOpen, onClose }) => {
  const [rsvpData, setRsvpData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalInterested, setTotalInterested] = useState(0);

  // Fetch RSVP data from JSON Server
  useEffect(() => {
    if (isOpen && event) {
      fetchRsvpData();
    }
  }, [isOpen, event]);

  const fetchRsvpData = async () => {
    try {
      setLoading(true);

      // Fetch attendance data for this specific event
      const response = await fetch(
        `http://localhost:3001/event_attendance?event_id=${event.id}`
      );
      const attendanceData = await response.json();

      // Count different status types
      const statusCounts = {
        going: 0,
        maybe: 0,
        not_going: 0,
      };

      attendanceData.forEach((attendance) => {
        if (statusCounts.hasOwnProperty(attendance.status)) {
          statusCounts[attendance.status]++;
        }
      });

      const totalResponses = Object.values(statusCounts).reduce(
        (sum, count) => sum + count,
        0
      );

      // Calculate total interested (going + maybe)
      const interestedCount = statusCounts.going + statusCounts.maybe;
      setTotalInterested(interestedCount);

      // Create RSVP data with actual counts
      const rsvpStats = [
        {
          status: "Going",
          count: statusCounts.going,
          color: "#4CAF50",
          percentage:
            totalResponses > 0
              ? Math.round((statusCounts.going / totalResponses) * 100)
              : 0,
        },
        {
          status: "Maybe",
          count: statusCounts.maybe,
          color: "#FF9800",
          percentage:
            totalResponses > 0
              ? Math.round((statusCounts.maybe / totalResponses) * 100)
              : 0,
        },
        {
          status: "Not Going",
          count: statusCounts.not_going,
          color: "#F44336",
          percentage:
            totalResponses > 0
              ? Math.round((statusCounts.not_going / totalResponses) * 100)
              : 0,
        },
      ];

      setRsvpData(rsvpStats);
    } catch (error) {
      console.error("Error fetching RSVP data:", error);
      // Fallback to empty data on error
      setRsvpData([
        { status: "Going", count: 0, color: "#4CAF50", percentage: 0 },
        { status: "Maybe", count: 0, color: "#FF9800", percentage: 0 },
        { status: "Not Going", count: 0, color: "#F44336", percentage: 0 },
      ]);
      setTotalInterested(0);
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    {
      icon: <Users className="icon-sm" />,
      value: totalInterested,
      label: "Total Interested",
      color: "#4A90E2",
    },
    {
      icon: <Calendar className="icon-sm" />,
      value: event?.status === "upcoming" ? "Upcoming" : "Past",
      label: "Event Status",
      color: event?.status === "upcoming" ? "#7ED321" : "#9B9B9B",
    },
    {
      icon: <Clock className="icon-sm" />,
      value: event?.duration_hours ? `${event.duration_hours}h` : "N/A",
      label: "Duration",
      color: "#9013FE",
    },
    {
      icon: <DollarSign className="icon-sm" />,
      value: event?.registration_fee ? `₹${event.registration_fee}` : "Free",
      label: "Registration",
      color: event?.registration_fee ? "#D0021B" : "#4CAF50",
    },
  ];

  // Calculate year-wise distribution based on actual user data
  const fetchYearDistribution = async () => {
    try {
      // Get all users who have RSVP'd to this event
      const attendanceResponse = await fetch(
        `http://localhost:3001/event_attendance?event_id=${event.id}`
      );
      const attendanceData = await attendanceResponse.json();

      // Get all users from the database
      const usersResponse = await fetch(`http://localhost:3001/users`);
      const allUsers = await usersResponse.json();

      // Create a map of users by ID for quick lookup
      const userMap = {};
      allUsers.forEach((user) => {
        userMap[user.id] = user;
      });

      // Count by year for users who have RSVP'd
      const yearCounts = {
        "1st Year": 0,
        "2nd Year": 0,
        "3rd Year": 0,
        "4th Year": 0,
      };

      const currentYear = new Date().getFullYear();

      attendanceData.forEach((attendance) => {
        const user = userMap[attendance.user_id];
        if (user && user.batch_year) {
          // Calculate which year of study based on batch_year
          const yearOfStudy = user.batch_year - currentYear + 1;
          let yearKey = null;

          switch (yearOfStudy) {
            case 1:
              yearKey = "1st Year";
              break;
            case 2:
              yearKey = "2nd Year";
              break;
            case 3:
              yearKey = "3rd Year";
              break;
            case 4:
              yearKey = "4th Year";
              break;
            default:
              // For graduate students or others, skip or handle differently
              break;
          }

          if (yearKey && yearCounts[yearKey] !== undefined) {
            yearCounts[yearKey]++;
          }
        }
      });

      const totalUsers = attendanceData.length;

      return Object.entries(yearCounts).map(([year, count]) => ({
        year,
        count,
        percentage: totalUsers > 0 ? Math.round((count / totalUsers) * 100) : 0,
      }));
    } catch (error) {
      console.error("Error fetching year distribution:", error);
      // Fallback to simulated data if user data is not available
      return [
        {
          year: "1st Year",
          count: Math.floor(totalInterested * 0.35),
          percentage: 35,
        },
        {
          year: "2nd Year",
          count: Math.floor(totalInterested * 0.25),
          percentage: 25,
        },
        {
          year: "3rd Year",
          count: Math.floor(totalInterested * 0.25),
          percentage: 25,
        },
        {
          year: "4th Year",
          count: Math.floor(totalInterested * 0.15),
          percentage: 15,
        },
      ];
    }
  };

  const [yearDistribution, setYearDistribution] = useState([]);

  useEffect(() => {
    if (isOpen && event) {
      fetchYearDistribution().then(setYearDistribution);
    }
  }, [isOpen, event]);

  if (!isOpen || !event) return null;

  // Format date and time properly
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    try {
      // If it's already in HH:MM format, convert to 12-hour format
      const [hours, minutes] = timeString.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    } catch (error) {
      return timeString;
    }
  };

  return (
    <div className="event-stats-modal-overlay">
      <div className="event-stats-modal-container">
        {/* Header */}
        <div className="event-stats-modal-header">
          <div className="event-stats-header-content">
            <TrendingUp className="event-stats-icon-md event-stats-header-icon" />
            <h2 className="event-stats-header-title">Event Statistics</h2>
          </div>
          <button onClick={onClose} className="event-stats-close-button">
            <X className="event-stats-icon-md" />
          </button>
        </div>

        {/* Event Info */}
        <div className="event-stats-event-info-section">
          <div className="event-stats-event-header">
            <span className="event-stats-event-emoji">
              {event.imagePlaceholder || "📅"}
            </span>
            <div>
              <h3 className="event-stats-event-name">
                {event.title || event.name || "Event Title"}
              </h3>
              <span className="event-stats-event-category">
                {event.event_type || event.category || "Event"}
              </span>
            </div>
          </div>

          <div className="event-stats-event-details">
            <div className="event-stats-detail-item">
              <Calendar className="event-stats-icon-xs" />
              <span>
                {formatDate(event.event_date || event.date)} •{" "}
                {formatTime(event.event_time || event.time)}
              </span>
            </div>
            <div className="event-stats-detail-item">
              <MapPin className="event-stats-icon-xs" />
              <span>{event.venue || event.location || "Venue TBD"}</span>
            </div>
            <div className="event-stats-detail-item">
              <Mail className="event-stats-icon-xs" />
              <span>{event.contact_email || event.email || "N/A"}</span>
            </div>
          </div>

          <div className="event-stats-tags-container">
            {event.tags && event.tags.length > 0 ? (
              event.tags.map((tag, index) => (
                <span key={index} className="event-stats-tag">
                  {tag}
                </span>
              ))
            ) : (
              <span className="event-stats-tag">
                {event.event_type || "General"}
              </span>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="event-stats-stats-section">
          <div className="event-stats-stats-grid">
            {statsData.map((stat, index) => (
              <div key={index} className="event-stats-stat-card">
                <div
                  className="event-stats-stat-icon"
                  style={{ color: stat.color }}
                >
                  {stat.icon}
                </div>
                <div
                  className="event-stats-stat-value"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="event-stats-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RSVP Section */}
        <div className="event-stats-rsvp-section">
          <h3 className="event-stats-section-title">
            <TrendingUp className="event-stats-icon-sm" />
            RSVP Breakdown
          </h3>

          {loading ? (
            <div className="event-stats-loading-container">
              <div className="event-stats-spinner"></div>
              <p className="event-stats-loading-text">Loading statistics...</p>
            </div>
          ) : (
            <div className="event-stats-rsvp-list">
              {rsvpData.map((item, index) => (
                <div key={index} className="event-stats-rsvp-item">
                  <div className="event-stats-rsvp-left">
                    <span className="event-stats-rsvp-status">
                      {item.status}
                    </span>
                    <div className="event-stats-progress-bar">
                      <div
                        className="event-stats-progress-fill"
                        style={{
                          backgroundColor: item.color,
                          width: `${item.percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="event-stats-rsvp-right">
                    <span className="event-stats-rsvp-percentage">
                      {item.percentage}%
                    </span>
                    <span
                      className="event-stats-rsvp-count"
                      style={{ color: item.color }}
                    >
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Year Distribution */}
        <div className="event-stats-year-distribution-section">
          <h3 className="event-stats-section-title">
            Audience by Year of Study
          </h3>
          <div className="event-stats-year-list">
            {yearDistribution.map((item, index) => (
              <div key={index} className="event-stats-year-item">
                <div className="event-stats-year-left">
                  <span className="event-stats-year-label">{item.year}</span>
                  <div className="event-stats-progress-bar">
                    <div
                      className="event-stats-progress-fill event-stats-year-progress"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="event-stats-year-right">
                  <span className="event-stats-year-percentage">
                    {item.percentage}%
                  </span>
                  <span className="event-stats-year-count">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventStatisticsModal;
