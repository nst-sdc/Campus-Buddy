import React, { useState } from 'react';
import { Calendar, Clock, Upload, X } from 'lucide-react';
import { useToast } from '../components/ToastContext.jsx';
import './CreateEventForm.css';

const CreateEventForm = () => {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    tags: [],
    rsvpLimit: '',
    poster: null,
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  const availableTags = [
    'Workshop', 'Seminar', 'Social', 'Sports', 'Cultural', 'Technical',
    'Academic', 'Networking', 'Competition', 'Meeting', 'Conference', 'Party',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== tagToRemove));
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setFormData((prev) => ({ ...prev, poster: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.time ||
      !formData.venue
    ) {
      addToast({ type: 'error', message: 'Please fill in all required fields' });
      return;
    }

    console.log('Event Data:', formData);
    addToast({ type: 'success', message: 'Event created successfully!' });
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All data will be lost.')) {
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        tags: [],
        rsvpLimit: '',
        poster: null,
      });
      setSelectedTags([]);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-wrapper">
        <h1 className="form-title">Create New Event</h1>
        <div className="form-content">
          <div className="form-group">
            <label className="form-label">
              Event Title <span className="required">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="form-textarea"
              placeholder="Describe your event..."
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Date <span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="form-input icon-input"
                  required
                />
                <Calendar className="input-icon" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Time <span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="form-input icon-input"
                  required
                />
                <Clock className="input-icon" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Venue <span className="required">*</span>
            </label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter venue location"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tags</label>
            <div className="tags-container">
              <div
                className="tags-selector"
                onClick={() => setShowTagDropdown(!showTagDropdown)}
              >
                <div className="selected-tags">
                  {selectedTags.length === 0 ? (
                    <span className="placeholder">Select tags</span>
                  ) : (
                    selectedTags.map((tag, index) => (
                      <span key={index} className="tag-chip">
                        {tag}
                        <X
                          className="tag-remove"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeTag(tag);
                          }}
                        />
                      </span>
                    ))
                  )}
                </div>
                <div className="dropdown-arrow">▼</div>
              </div>

              {showTagDropdown && (
                <div className="tags-dropdown">
                  {availableTags.map((tag, index) => (
                    <div
                      key={index}
                      className={`tag-option ${
                        selectedTags.includes(tag) ? 'selected' : ''
                      }`}
                      onClick={() => {
                        handleTagSelect(tag);
                        setShowTagDropdown(false);
                      }}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">RSVP Limit (Optional)</label>
            <input
              type="number"
              name="rsvpLimit"
              value={formData.rsvpLimit}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Maximum number of attendees"
              min="1"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Event Poster</label>
            <div
              className="file-upload-area"
              onClick={() => document.getElementById('file-input').click()}
            >
              <input
                type="file"
                id="file-input"
                className="file-input"
                onChange={handleFileUpload}
              />
              <label htmlFor="file-input" className="file-upload-label">
                <Upload className="upload-icon" />
                <p className="upload-text">
                  {formData.poster
                    ? `Selected: ${formData.poster.name}`
                    : 'Click to upload a poster'}
                </p>
                <p className="upload-subtext">PNG, JPG, GIF up to 10MB</p>
              </label>
            </div>
          </div>

          <div className="form-buttons">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-create">
              Create Event
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateEventForm;
