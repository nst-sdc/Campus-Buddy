import React, { useState, useEffect } from 'react';
import { Calendar, Users, Heart, Zap, Star, TrendingUp } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';

export default function CampusBuddyHomepage() {
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const campusStats = [
    {
      icon: <Calendar className="stat-icon" />, 
      number: "6", 
      label: "Active Events",
      colorClass: "stat-blue",
      description: "Join exciting events happening this week"
    },
    {
      icon: <Users className="stat-icon" />, 
      number: "25+", 
      label: "Active Clubs",
      colorClass: "stat-green",
      description: "Connect with diverse student organizations"
    },
    {
      icon: <Heart className="stat-icon" />, 
      number: "500+", 
      label: "Student Members",
      colorClass: "stat-yellow",
      description: "Growing community of active students"
    }
  ];

  const features = [
    {
      icon: <Users className="feature-icon" />,
      title: "Connect & Network",
      description: "Meet like-minded students, join clubs, and build lasting friendships through shared interests and activities.",
      colorClass: "feature-blue"
    },
    {
      icon: <Zap className="feature-icon" />,
      title: "Stay Updated",
      description: "Never miss out on exciting events, workshops, competitions, and activities happening around campus.",
      colorClass: "feature-green"
    },
    {
      icon: <Star className="feature-icon" />,
      title: "Grow & Learn",
      description: "Participate in workshops, hackathons, and skill-building events to enhance your academic and personal growth.",
      colorClass: "feature-yellow"
    }
  ];

  return (
    <div className="campus-buddy-container">
      {/* Hero Section */}
      <section className="hero-section" data-aos="fade-up">
        <div className="hero-container">
          <div className="hero-title-container">
            <div className="hero-icon">
              <Calendar className="hero-calendar" />
            </div>
            <h1 className="hero-title">
              Welcome to <span className="title-highlight">Campus-Buddy</span>
            </h1>
          </div>
          <div className="hero-subtitle-container">
            <Star className="subtitle-star" />
            <p className="hero-subtitle">Your gateway to campus life</p>
            <Star className="subtitle-star" />
          </div>
          <p className="hero-description">
            Discover amazing events, connect with fellow students, and make the most of 
            your campus experience. Whether you're looking to learn, compete, or just have 
            fun - we've got you covered! 🎉
          </p>
          <button className="hero-cta-btn">
            <Calendar className="cta-icon" />
            <span>Explore Events</span>
            <TrendingUp className="cta-arrow" />
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" data-aos="fade-up">
        <div className="stats-container">
          <div className="stats-header">
            <h2 className="stats-title">Campus at a Glance</h2>
            <p className="stats-subtitle">See what's happening on campus right now!</p>
          </div>
          <div className="stats-grid">
            {campusStats.map((stat, index) => (
              <div 
                key={index}
                className={`stat-card ${stat.colorClass} ${hoveredStat === index ? 'stat-card-hovered' : ''}`}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                data-aos="zoom-in"
              >
                <div className={`stat-icon-container ${hoveredStat === index ? 'stat-icon-hovered' : ''}`}>
                  {stat.icon}
                </div>
                <div className={`stat-number ${hoveredStat === index ? 'stat-number-hovered' : ''}`}>{stat.number}</div>
                <h3 className="stat-label">{stat.label}</h3>
                <div className={`stat-description ${hoveredStat === index ? 'stat-description-visible' : ''}`}>
                  <p>{stat.description}</p>
                </div>
                {hoveredStat === index && (
                  <div className="stat-trending-icon">
                    <TrendingUp className="trending-icon" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" data-aos="fade-up">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">Why Campus Buddy?</h2>
            <p className="features-subtitle">Unlock endless opportunities right on your campus.</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`feature-card ${feature.colorClass} ${hoveredFeature === index ? 'feature-card-hovered' : ''}`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                data-aos="zoom-in-up"
              >
                <div className={`feature-icon-container ${hoveredFeature === index ? 'feature-icon-hovered' : ''}`}>{feature.icon}</div>
                <h3 className={`feature-title ${hoveredFeature === index ? 'feature-title-hovered' : ''}`}>{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                {hoveredFeature === index && (
                  <>
                    <div className="feature-gradient-overlay"></div>
                    <div className="feature-star-icon">
                      <Star className="star-icon" />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" data-aos="fade-up">
        <div className="cta-container">
          <h2 className="cta-title">Ready to dive into campus life?</h2>
          <p className="cta-description">
            Browse upcoming events, RSVP to activities that interest you, and start 
            building your campus network today!
          </p>
          <button className="cta-btn">
            <TrendingUp className="cta-btn-icon" />
            <span>Get Started</span>
          </button>
        </div>
      </section>
    </div>
  );
}
