import React, { useState } from "react";
import "./ClubDirectory.css";
import { useNavigate } from "react-router-dom";
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
} from "react-icons/fa";

const clubsData = [
  {
    name: "Devclub",
    category: "Technology",
    featured: true,
    rating: 4.8,
    members: 55,
    events: 8,
    description:
      "The DevClub is the powerhouse of coding at NST — where passionate developers collaborate on open-source projects, build impactful products, and dominate hackathons. From full-stack development to cutting-edge web technologies, this is where innovation takes shape in code.",
    tags: ["Web Dev", "Open Source", "Hackathons", "Innovation"],
    social: ["linkedin", "email"],
    email: "devclub@university.com",
    bg: "linear-gradient(135deg, #cfe9ff, #e0f7fa)",
    achievements: [
      "Successfully hosted Nirmaan 2025",
      "Launched 'Campus Buddy' — a student productivity platform",
      "Over 10 open-source projects contributed to GitHub"
    ]
  },
  {
    name: "Robotics Club",
    category: "Technology",
    featured: true,
    rating: 4.9,
    members: 60,
    events: 6,
    description:
      "Dive into the world of intelligent machines with the Robotics Club. Engage in hands-on projects involving AI, IoT, and mechatronics to design, build, and code robots that solve real-world problems — from automation to advanced robotics challenges.",
    tags: ["Hardware", "AI", "IoT", "Mechatronics", "Automation"],
    social: ["instagram", "email"],
    email: "robotics@university.com",
    bg: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
    achievements: []
  },
  {
    name: "MINDS - AI Club",
    category: "Technology",
    featured: true,
    rating: 4.9,
    members: 100,
    events: 5,
    description:
      "MINDS is the official Artificial Intelligence club at NST, uniting students passionate about AI, Machine Learning, and Neural Systems. Through workshops, research, and hackathons, the club empowers members to explore, innovate, and build intelligent solutions that shape the future.",
    tags: ["AI", "Machine Learning", "Neural Networks", "Innovation", "Research"],
    social: ["linkedin", "email"],
    email: "minds@university.com",
    bg: "linear-gradient(135deg, #f3e5f5, #e1bee7)",
    achievements: []
  },
  {
    name: "Creators Corner",
    category: "Arts & Culture",
    featured: true,
    rating: 4.7,
    members: 180,
    events: 10,
    description:
      "Creators Corner is a vibrant community where imagination meets expression. Explore photography, visual arts, digital design, and storytelling — a space for creators who believe in the power of visuals and narratives to move minds and hearts.",
    tags: ["Creativity", "Photography", "Art", "Storytelling", "Design"],
    social: ["youtube", "instagram", "email"],
    email: "creatorscorner@university.com",
    bg: "linear-gradient(135deg, #b3e5fc, #fce4ec)",
    achievements: []
  },
  {
    name: "Ensemble Club",
    category: "Theatre",
    featured: true,
    rating: 4.7,
    members: 180,
    events: 10,
    description:
      "The Ensemble Club brings the stage to life — uniting artists passionate about theatre, drama, music, and expressive dance. It’s a space to perform, direct, and create art that entertains, inspires, and connects audiences emotionally.",
    tags: ["Drama", "Theatre", "Dance", "Music", "Expression"],
    social: ["youtube", "instagram", "email"],
    email: "ensembleclub@university.com",
    bg: "linear-gradient(135deg, #fff8e1, #ffe082)",
    achievements: []
  },
  {
    name: "Algonauts - CP Club",
    category: "Technology",
    featured: true,
    rating: 5.0,
    members: 50,
    events: 4,
    description:
      "The Algonauts are a community of competitive programmers who live for logic and optimization. Prepare for ICPC, master DSA, and challenge yourself through regular coding contests that sharpen your algorithmic thinking.",
    tags: ["CP", "DSA", "ICPC", "Problem Solving", "Coding"],
    social: ["linkedin", "email"],
    email: "algonauts@university.com",
    bg: "linear-gradient(135deg, #ede7f6, #d1c4e9)",
    achievements: []
  },
  {
    name: "Orators",
    category: "Public Speaking",
    featured: true,
    rating: 4.6,
    members: 100,
    events: 5,
    description:
      "The Orators Club is the voice of the campus — where confident communicators are made. Engage in debates, extempore, and public speaking sessions that refine articulation, leadership, and persuasion.",
    tags: ["Debate", "Public Speaking", "Anchoring", "Leadership"],
    social: ["instagram", "email"],
    email: "orators@university.com",
    bg: "linear-gradient(135deg, #fff8e1, #ffe0b2)",
    achievements: []
  },
  {
    name: "Trailblazers",
    category: "Sports",
    featured: true,
    rating: 4.6,
    members: 315,
    events: 5,
    description:
      "Trailblazers is the heart of campus sports — a team of athletes who believe in passion, teamwork, and persistence. Compete in cricket, kabaddi, badminton, and athletics, representing NST with energy and pride.",
    tags: ["Sports", "Cricket", "Badminton", "Kabaddi", "Teamwork"],
    social: ["instagram", "email"],
    email: "sports@university.com",
    bg: "linear-gradient(135deg, #bbdefb, #c8e6c9)",
    achievements: []
  },
  {
    name: "Sharksphere",
    category: "Entrepreneurship",
    featured: true,
    rating: 5.0,
    members: 50,
    events: 4,
    description:
      "Sharksphere is the entrepreneurial ecosystem of NST — where visionaries meet investors, and ideas turn into ventures. Participate in startup challenges, investor pitch events, and business strategy sessions that fuel your entrepreneurial journey.",
    tags: ["Startup", "Business", "Entrepreneurship", "Leadership", "Pitch"],
    social: ["linkedin", "email"],
    email: "sharksphere@university.com",
    bg: "linear-gradient(135deg, #e8f5e9, #b2dfdb)",
    achievements: []
  },
  {
    name: "StellarQuest - Astronomy Club",
    category: "Space",
    featured: true,
    rating: 4.9,
    members: 240,
    events: 6,
    description:
      "StellarQuest is where curiosity meets the cosmos. Join us for skywatching nights, space research discussions, and astrophysics projects that bring you closer to understanding the mysteries of the universe.",
    tags: ["Space", "Astronomy", "Research", "Astrophysics", "Skywatching"],
    social: ["instagram", "email"],
    email: "stellarquest@university.com",
    bg: "linear-gradient(135deg, #bbdefb, #d1c4e9)",
    achievements: []
  }
];

const getSocialIcon = (platform) => {
  switch (platform) {
    case "facebook":
      return <FaFacebook />;
    case "twitter":
      return <FaTwitter />;
    case "instagram":
      return <FaInstagram />;
    case "linkedin":
      return <FaLinkedin />;
    case "youtube":
      return <FaYoutube />;
    case "email":
      return <FaEnvelope />;
    case "tiktok":
      return <FaTiktok />;
    case "github":
      return <FaGithub />;
    default:
      return null;
  }
};

const ClubDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const navigate = useNavigate();

  const filteredClubs = clubsData.filter((club) => {
    const matchesSearch = club.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "All Categories",
    "Technology",
    "Arts & Culture",
    "Public Speaking",
    "Sports",
    "Theatre",
    "Space",
    "Entrepreneur",
  ];

  return (
<div className="club-directory-page">
  <h1 className="club-directory-title">
    <span>Campus</span> Clubs
  </h1>
  <p className="club-directory-subtitle">
    Discover amazing communities, build lifelong friendships, and explore
    your passions with like-minded students
  </p>

  <div className="club-directory-search-bar">
    <input
      type="text"
      placeholder="Search clubs, activities, or interests..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="club-directory-search-input"
    />
    <button className="club-directory-search-button">Search</button>
  </div>

  <div className="club-directory-category-tabs">
    {categories.map((cat, i) => (
      <div
        key={i}
        className={`club-directory-tab ${
          selectedCategory === cat ? "club-directory-active-tab" : ""
        }`}
        onClick={() => setSelectedCategory(cat)}
      >
        {cat}
      </div>
    ))}
  </div>

  <h2 className="club-directory-featured-title">Featured Clubs</h2>

  <div className="club-directory-card-list">
    {filteredClubs.map((club, index) => (
      <div
        className="club-directory-card-featured"
        key={index}
        style={{ background: club.bg }}
      >
        <div className="club-directory-top-labels">
          <span className="club-directory-category">{club.category}</span>
        </div>

        <h3 className="club-directory-club-name">{club.name}</h3>
        <p className="club-directory-desc">{club.description || ""}</p>

        <div className="club-directory-stats">
          <span>
            <FaUsers /> {club.members} members
          </span>
          <span>
            <FaCalendarAlt /> {club.events} events
          </span>
        </div>

        <div className="club-directory-tags">
          {club.tags.map((tag, i) => (
            <span key={i} className="club-directory-tag">
              {tag}
            </span>
          ))}
        </div>

        {/* 🔽 Achievements Section */}
        {club.achievements && club.achievements.length > 0 && (
          <div className="club-directory-achievements">
            <details className="club-achievement-details">
              <summary className="club-achievement-summary">
                🌟 Achievements
              </summary>
              <ul className="club-achievement-list">
                {club.achievements.map((ach, i) => (
                  <li key={i} className="club-achievement-item">
                  {ach}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        )}

        <div className="club-directory-actions">
          <button
            className="club-directory-join-btn"
            onClick={() => navigate("/campus-events")}
          >
            Explore
          </button>

          <div className="club-directory-socials">
            {club.social.map((s, i) => (
              <a
                key={i}
                href="#"
                target="_blank"
                rel="noreferrer"
                className="club-directory-social-icon"
              >
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
