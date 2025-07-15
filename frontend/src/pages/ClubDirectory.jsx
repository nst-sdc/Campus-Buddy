import React, { useState } from 'react';
import './ClubDirectory.css';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
  FaTiktok,
  FaGithub,
  FaUsers,
  FaCalendarAlt,
} from 'react-icons/fa';

const clubsData = [
  {
    name: 'Dev Club',
    category: 'Technology',
    featured: true,
    rating: 4.8,
    members: 300,
    events: 8,
    tags: ['Web Dev', 'Open Source', 'Hackathons'],
    social: ['linkedin', 'email'],
    email: 'devclub@university.com',
    bg: '#e0f2ff',
  },
  {
    name: 'Robotics Club',
    category: 'Technology',
    featured: true,
    rating: 4.9,
    members: 240,
    events: 6,
    time: 'Mondays 6:00 PM',
    tags: ['Hardware', 'AI', 'Mechatronics'],
    social: ['instagram', 'email'],
    email: 'robotics@university.com',
    bg: '#e8f5e9',
  },
  {
    name: 'Performing Arts Club',
    category: 'Arts & Culture',
    featured: true,
    rating: 4.7,
    members: 180,
    events: 10,
    tags: ['Drama', 'Dance', 'Theatre'],
    social: ['youtube', 'instagram', 'email'],
    email: 'performing@university.com',
    bg: '#fff8e1',
  },
  {
    name: 'Algonauts - CP Club',
    category: 'Technology',
    featured: true,
    rating: 5.0,
    members: 50,
    events: 4,
    tags: ['CP', 'DSA', 'ICPC'],
    social: ['linkedin', 'email'],
    email: 'algonauts@university.com',
    bg: '#ede7f6',
  },
  {
    name: 'Orators - Speaking Club',
    category: 'Public Speaking',
    featured: true,
    rating: 4.6,
    members: 100,
    events: 5,
    tags: ['Debate', 'Public Speaking', 'Anchoring'],
    social: ['instagram', 'email'],
    email: 'oratos@university.com',
    bg: '#f3e5f5',
  },
  {
    name: 'Sports',
    category: 'Sports',
    featured: true,
    rating: 4.6,
    members: 315,
    events: 5,
    tags: ['Badminton', 'Cricket', 'Kabaddi'],
    social: ['instagram', 'email'],
    email: 'sports@university.com',
    bg: 'lightblue',
  },
];

const getSocialIcon = (platform) => {
  switch (platform) {
    case 'facebook':
      return <FaFacebook />;
    case 'twitter':
      return <FaTwitter />;
    case 'instagram':
      return <FaInstagram />;
    case 'linkedin':
      return <FaLinkedin />;
    case 'youtube':
      return <FaYoutube />;
    case 'email':
      return <FaEnvelope />;
    case 'tiktok':
      return <FaTiktok />;
    case 'github':
      return <FaGithub />;
    default:
      return null;
  }
};

const ClubDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [joinedClubs, setJoinedClubs] = useState([]);

  const handleJoin = (clubName) => {
    setJoinedClubs((prev) =>
      prev.includes(clubName)
        ? prev.filter((name) => name !== clubName)
        : [...prev, clubName]
    );
  };

  const filteredClubs = clubsData.filter((club) => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Categories' || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    'All Categories',
    'Technology',
    'Arts & Culture',
    'Environment',
    'Public Speaking',
    'Sports'
  ];

  return (
    <div className="club-page">
      <h1>
        <span>Campus</span> Clubs
      </h1>
      <p className="subtitle">
        Discover amazing communities, build lifelong friendships, and explore your passions with like-minded students
      </p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search clubs, activities, or interests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>Search</button>
      </div>

      <div className="category-tabs">
        {categories.map((cat, i) => (
          <div
            key={i}
            className={`tab ${selectedCategory === cat ? 'active-tab' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </div>
        ))}
      </div>

      <h2 className="featured-title">Featured Clubs</h2>
      <div className="club-card-list">
        {filteredClubs.map((club, index) => (
          <div className="club-card-featured" key={index} style={{ backgroundColor: club.bg }}>
            <div className="top-labels">
              <span className="category">{club.category}</span>
            </div>
            <h3>{club.name}</h3>
            <p className="desc">{club.description || ''}</p>
            <div className="stats">
              <span>
                <FaUsers /> {club.members} members
              </span>
              <span>
                <FaCalendarAlt /> {club.events} events
              </span>
            </div>
            <div className="tags">
              {club.tags.map((tag, i) => (
                <span key={i} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="actions">
              <button
                className="join-btn"
                onClick={() => {
                  window.location.href = `/join-club?name=${encodeURIComponent(club.name)}`;
                }}
              >
                Join Club
              </button>
              <div className="socials">
                {club.social.map((s, i) => (
                  <a key={i} href="#" target="_blank" rel="noreferrer" className="social-icon">
                    {getSocialIcon(s)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubDirectory;
