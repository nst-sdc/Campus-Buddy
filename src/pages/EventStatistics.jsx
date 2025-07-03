import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EventStatistics.css';

const EventStatistics = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  const statsData = [
    { icon: '👁️', value: '1140', label: 'Total Views', color: '#4A90E2' },
    { icon: '👥', value: '456', label: 'Interested', color: '#7ED321' },
    { icon: '❤️', value: '182', label: 'Likes', color: '#D0021B' },
    { icon: '📤', value: '68', label: 'Shares', color: '#9013FE' }
  ];

  const rsvpData = [
    { status: 'Going', count: 319, color: '#4CAF50', percentage: 70 },
    { status: 'Maybe', count: 92, color: '#FF9800', percentage: 20 },
    { status: 'Not Going', count: 45, color: '#F44336', percentage: 10 }
  ];

  const departmentData = [
    { year: '1st Year', count: 159, percentage: 35 },
    { year: '2nd Year', count: 114, percentage: 25 },
    { year: '3rd Year', count: 91, percentage: 20 },
    { year: '4th Year', count: 65, percentage: 14 }
  ];

  return (
    <div className="event-statistics-container">
      <div className="event-statistics">
        <div className="header">
          <button className="close-btn" onClick={handleClose}>×</button>
          <h1>Event Statistics</h1>
        </div>

        <div className="event-info">
          <div className="event-title">
            <span className="briefcase-icon">💼</span>
            <h2>Career Fair 2025</h2>
          </div>

          <div className="event-details">
            <div className="detail-item">
              <span className="calendar-icon">📅</span>
              <span>July 2, 2025 • 9:00 AM - 5:00 PM</span>
            </div>
            <div className="detail-item">
              <span className="location-icon">📍</span>
              <span>Convention Center Hall B</span>
            </div>
          </div>

          <div className="tags">
            <span className="tag">E-Cell</span>
            <span className="tag">Career</span>
            <span className="tag">Networking</span>
          </div>
        </div>

        <div className="stats-grid">
          {statsData.map(({ icon, value, label, color }, index) => (
            <div key={index} className={`stat-card stat-${index + 1}`}>
              <div className="stat-icon" style={{ color }}>{icon}</div>
              <div className="stat-value" style={{ color }}>{value}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>

        <div className="rsvp-section">
          <h3>📈 RSVP Breakdown</h3>
          <div className="rsvp-list">
            {rsvpData.map(({ status, count, color, percentage }, index) => (
              <div key={index} className="rsvp-item">
                <span className="rsvp-status">{status}</span>
                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{
                      backgroundColor: color,
                      width: `${percentage}%`
                    }}
                  ></div>
                </div>
                <span className="rsvp-count" style={{ color }}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="audience-section">
          <h3>Audience by Year of Study</h3>
          <div className="department-list">
            {departmentData.map(({ year, count, percentage }, index) => (
              <div key={index} className="department-item">
                <span className="department-name">{year}</span>
                <div className="progress-container">
                  <div
                    className="progress-bar department-progress"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="department-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventStatistics;
