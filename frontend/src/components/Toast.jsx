import React from 'react';
import './Toast.css';

const Toast = ({ type, message, duration = 5000, onClose }) => (
  <div className={`toast ${type}`}>
    <span>{message}</span>
    <button className="close-btn" onClick={onClose}>×</button>

    <div
      className="toast-progress"
      style={{ animationDuration: `${duration}ms` }}
    />
  </div>
);

export default Toast;
