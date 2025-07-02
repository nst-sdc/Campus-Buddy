import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClubProfileCard.css';

const ClubProfileCard = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('AI & Robotics Club');
  const [email, setEmail] = useState('aiclub@university.edu');

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
            <div className="stat-icon">🎉</div>
            <div className="stat-content">
              <span className="stat-number">8</span>
              <span className="stat-label">Events Hosted</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <span className="stat-number">92</span>
              <span className="stat-label">Active Members</span>
            </div>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-row">
            <div className="detail-box">
              <div className="detail-icon">🎓</div>
              <div className="detail-content">
                <span className="detail-label">Category</span>
                <span className="detail-value">Innovation & Tech</span>
              </div>
            </div>
            <div className="detail-box">
              <div className="detail-icon">📅</div>
              <div className="detail-content">
                <span className="detail-label">Established</span>
                <span className="detail-value">2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubProfileCard;