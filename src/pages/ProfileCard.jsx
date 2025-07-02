import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileCard.css';

const ProfileCard = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Alex Johnson');
  const [email, setEmail] = useState('alex.johnson@university.edu');

  const handleClose = () => {
    navigate('/home');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-overlay">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-image">
            <div className="avatar-placeholder">AJ</div>
            <div className="online-indicator"></div>
          </div>

          <div className="profile-info">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="edit-input"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="edit-input"
                />
                <button className="edit-btn" onClick={handleSave}>
                  Save
                </button>
              </>
            ) : (
              <>
                <h2>{name}</h2>
                <p>{email}</p>
                <div className="status-badge">
                  <span className="status-dot"></span>
                  Active Member
                </div>
                <button className="edit-btn" onClick={handleEdit}>
                  Edit
                </button>
              </>
            )}
          </div>

          <button className="close-btn" onClick={handleClose}>×</button>
        </div>
        <div className="quick-stats">
          <div className="stat-item">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <span className="stat-number">24</span>
              <span className="stat-label">Events Attended</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <span className="stat-number">92%</span>
              <span className="stat-label">Attendance Rate</span>
            </div>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-row">
            <div className="detail-box">
              <div className="detail-icon">🎓</div>
              <div className="detail-content">
                <span className="detail-label">Department</span>
                <span className="detail-value">Computer Science Engineering</span>
              </div>
            </div>
            <div className="detail-box">
              <div className="detail-icon">📅</div>
              <div className="detail-content">
                <span className="detail-label">Academic Year</span>
                <span className="detail-value">3rd Year</span>
              </div>
            </div>
          </div>
          <div className="detail-row">
            <div className="detail-box">
              <div className="detail-icon">🏆</div>
              <div className="detail-content">
                <span className="detail-label">Achievements</span>
                <span className="detail-value">Hackathon Winner 2024</span>
              </div>
            </div>
            <div className="detail-box">
              <div className="detail-icon">📍</div>
              <div className="detail-content">
                <span className="detail-label">Member Since</span>
                <span className="detail-value">September 2022</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;





