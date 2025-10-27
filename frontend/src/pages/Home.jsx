import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Users, Heart, Zap, Star, TrendingUp, Menu, X, Shield, Clock, Globe, Github, Linkedin, ChevronDown, ChevronUp, UserPlus, Search, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function CampusBuddyHomepage() {
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredClub, setHoveredClub] = useState(null);
  const [hoveredDeveloper, setHoveredDeveloper] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [componentsLoaded, setComponentsLoaded] = useState(false);
  const componentRef = useRef(null);

  // Force component re-render and ensure proper initialization
  useEffect(() => {
    const initializeComponent = async () => {
      try {
        // Wait for DOM to be ready
        await new Promise(resolve => {
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve);
          } else {
            resolve();
          }
        });

        // Wait for CSS to load
        await new Promise(resolve => {
          const checkStyles = () => {
            const testElement = document.createElement('div');
            testElement.className = 'campusContainer';
            document.body.appendChild(testElement);
            
            const styles = window.getComputedStyle(testElement);
            document.body.removeChild(testElement);
            
            // Check if our CSS classes are loaded
            if (styles.position !== 'static' || styles.display !== 'inline') {
              resolve();
            } else {
              setTimeout(checkStyles, 50);
            }
          };
          checkStyles();
        });

        // Small delay to ensure Aceternity UI is ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        setComponentsLoaded(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Component initialization error:', error);
        setIsLoading(false);
      }
    };

    initializeComponent();
  }, []);

  // Enhanced AOS initialization with retry mechanism
  useEffect(() => {
    if (!componentsLoaded) return;

    const initAOS = () => {
      try {
        const elements = document.querySelectorAll('[data-aos]');
        
        if (elements.length === 0) {
          // Retry if elements not found
          setTimeout(initAOS, 100);
          return;
        }

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('aos-animate');
              // Trigger reflow to ensure animation plays
              entry.target.offsetHeight;
            }
          });
        }, {
          threshold: 0.1,
          rootMargin: '10px'
        });
        
        elements.forEach(el => {
          observer.observe(el);
          // Ensure initial state
          el.classList.remove('aos-animate');
        });

        return () => observer.disconnect();
      } catch (error) {
        console.error('AOS initialization error:', error);
      }
    };
    
    const cleanup = initAOS();
    return cleanup;
  }, [componentsLoaded]);

  // Force re-render when component mounts
  useEffect(() => {
    const forceUpdate = () => {
      if (componentRef.current) {
        componentRef.current.style.opacity = '0';
        requestAnimationFrame(() => {
          if (componentRef.current) {
            componentRef.current.style.opacity = '1';
          }
        });
      }
    };

    const timer = setTimeout(forceUpdate, 50);
    return () => clearTimeout(timer);
  }, []);

  const campusStats = [
    { 
      icon: <Calendar className="statIcon" />, 
      number: "0", 
      label: "Active Events",
      colorClass: "statBlue",
      description: "Join exciting events happening this week"
    },
    { 
      icon: <Users className="statIcon" />, 
      number: "5+", 
      label: "Active Clubs",
      colorClass: "statGreen",
      description: "Connect with diverse student organizations"
    },
    { 
      icon: <Heart className="statIcon" />, 
      number: "300+", 
      label: "Student Members",
      colorClass: "statYellow",
      description: "Growing community of active students"
    }
  ];

  const topClubs = [
    {
      name: "Dev Club",
      members: "120+",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Master web development and build amazing applications",
      tags: ["Web Dev", "JavaScript", "React"]
    },
    {
      name: "Robotics Club",
      members: "85+",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Design, build, and program robots for competitions and innovation",
      tags: ["Robotics", "Arduino", "AI", "Engineering"]
    },
    {
      name: "Entrepreneurship Club",
      members: "80+",
      category: "Business",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Turn your ideas into successful ventures",
      tags: ["Startup", "Business", "Innovation"]
    },
    {
      name: "Sports Club",
      members: "20+",
      category: "Sports",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Stay active and competitive",
      tags: ["Fitness", "Sports", "Health"]
    },
    {
      name: "Creators Corner",
      members: "65+",
      category: "Arts",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Unleash your creativity through digital art, design, and multimedia",
      tags: ["Digital Art", "Design", "Video", "Animation"]
    },
    {
      name: "Mobile App Dev Society",
      members: "95+",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Create innovative mobile applications for iOS and Android",
      tags: ["Mobile Dev","React Native"]
    },
  ];

  const developers = [
    {
      name: "Krish Patil",
      role: "Maintainer",
      bio: "Computer Science student and project maintainer passionate about UI/UX design. Created the complete design system and loves solving frontend challenges.",
      github: "https://github.com/krishx06",
      linkedin: "https://www.linkedin.com/in/krish-patil-nst/",
      skills: ["React", "Figma", "UI/UX Design", "JavaScript","Supabase"]
    },
    {
      name: "Gayatri Jaiswal",
      role: "Full-stack developer",
      bio: "Full-stack development enthusiast studying Computer Engineering. Enjoys building end-to-end applications and exploring new technologies.",
      github: "https://github.com/TechGenie-awake",
      linkedin: "https://www.linkedin.com/in/gayatrijaiswal2006/",
      skills: ["React", "Supabase", "Node.js", "JavaScript", "Database Design"]
    },
    {
      name: "Sneha Chepurwar",
      role: "Frontend Developer",
      bio: "Frontend development student with a keen eye for responsive design. Loves creating interactive user interfaces and learning modern web technologies.",
      github: "https://github.com/sneha31-debug",
      linkedin: "https://www.linkedin.com/in/sneha-chepurwar-754892325/",
      skills: ["React", "Supabase", "CSS", "Responsive Design"]
    },
    {
      name: "Divya Pahuja",
      role: "Frontend Developer",
      bio: "Web development student passionate about creating beautiful and functional user interfaces. Focuses on clean code and modern CSS techniques.",
      github: "https://github.com/Divyapahuja31",
      linkedin: "https://www.linkedin.com/in/divya-pahuja25/",
      skills: ["React", "CSS", "HTML", "Tailwind CSS"]
    },
    {
      name: "Saurav Kumar",
      role: "Frontend Developer",
      bio: "Computer Science student specializing in frontend development. Enjoys building responsive web applications and learning React ecosystem.",
      github: "https://github.com/Magnus1X",
      linkedin: "https://www.linkedin.com/in/saurav-kumar-b7b87b338/",
      skills: ["React", "CSS", "JavaScript"]
    },
    {
      name: "Kumar Manak",
      role: "Frontend Developer",
      bio: "Web development student with a passion for creating modern and interactive web experiences. Focuses on React development and styling.",
      github: "https://github.com/manak-sharma20",
      linkedin: "https://www.linkedin.com/in/kumar-manak-064bbb361/",
      skills: ["React", "CSS", "JavaScript", "Web Design"]
    }
  ];

  const workingSteps = [
    {
      step: "1",
      icon: <UserPlus className="stepIcon" />,
      title: "Sign Up",
      description: "Create your account and set up your profile with your interests and preferences"
    },
    {
      step: "2",
      icon: <Search className="stepIcon" />,
      title: "Discover",
      description: "Browse through events, clubs, and activities that match your interests"
    },
    {
      step: "3",
      icon: <Bell className="stepIcon" />,
      title: "Stay Updated",
      description: "Get notifications about new events and activities from your favorite clubs"
    }
  ];

  const benefits = [
    {
      icon: <Shield className="benefitIcon" />,
      title: "Smart Event Discovery",
      description: "Find events tailored to your interests — browse by club, department, or tags with a clean interface"
    },
    {
      icon: <Clock className="benefitIcon" />,
      title: "Seamless RSVP & Calendar Integration",
      description: "Quickly RSVP to events and add them to your calendar with one click — no more missed events"
    },
    {
      icon: <Globe className="benefitIcon" />,
      title: "Event Tracking",
      description: "Monitor attendance, track participants, and manage event analytics"
    }
  ];

  const faqs = [
    {
      question: " How can I RSVP to events?",
      answer: "After logging in, browse events and use the \"Going\", \"Not Going\", or \"Maybe\" options on each event card."
    },
    {
      question: "Where can I see my RSVP'd events?",
      answer: "You can view all your responses in the My Events section — categorized as Upcoming or Past."
    },
    {
      question: "What can I manage from the Club Dashboard?",
      answer: "Clubs can create, edit, and delete events, view RSVP stats, and update their club profile details."
    },
    {
      question: "Can I get reminders for events?",
      answer: "For now, you can use the 'Add to Calendar' button on each event page. Email reminders are coming soon"
    },
    {
      question: " Can I contribute to this project?",
      answer: "Absolutely! Head to the GitHub repo, check the README, pick an issue, and start contributing. We welcome all contributors!"
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Show loading state while components initialize
  if (isLoading) {
    return (
      <div className="campusContainer" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
            borderTopColor: 'white',
            animation: 'spin 1s ease-in-out infinite',
            margin: '0 auto 20px'
          }} />
          <p>Loading Campus Buddy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="campusContainer" ref={componentRef} style={{ 
      opacity: componentsLoaded ? 1 : 0,
      transition: 'opacity 0.3s ease-in-out'
    }}>
      <section className="heroSection">
        <div className="backgroundBeams">
          <div className="beam beam1"></div>
          <div className="beam beam2"></div>
          <div className="beam beam3"></div>
          <div className="beam beam4"></div>
          <div className="beam beam5"></div>
          <div className="beam beam6"></div>
        </div>
        <div className="heroContainer" data-aos="fade-up">
          <div className="heroContainer" data-aos="fade-up">
            <div className="heroTitleContainer">
              <div className="heroIcon">
                <Calendar className="heroCalendar" />
              </div>
              <h1 className="heroTitle">
                <span className="welcomeText">Welcome to</span>
                <span className="titleHighlight">Campus-Buddy</span>
              </h1>
            </div>
          </div>
          
          <div className="heroSubtitleContainer">
            <Star className="subtitleStar" />
            <p className="heroSubtitle">Your gateway to campus life</p>
            <Star className="subtitleStar" />
          </div>

          <p className="heroDescription">
            Discover amazing events, connect with fellow students, and make the most of 
            your campus experience. Whether you're looking to learn, compete, or just have 
            fun - we've got you covered! 🎉
          </p>
          <Link to="/campusevents">
            <button className="heroCtaBtn">
              <Calendar className="ctaIcon" />
              <span>Explore Events</span>
              <TrendingUp className="ctaArrow" />
            </button>
          </Link>
        </div>
      </section>

      <section className="statsSection">
        <div className="statsContainer">
          <div className="statsHeader" data-aos="fade-up">
            <h2 className="statsTitle">Campus at a Glance</h2>
            <p className="statsSubtitle">See what's happening on campus right now!</p>
          </div>

          <div className="statsGrid">
            {campusStats.map((stat, index) => (
              <div 
                key={index}
                className={`statCard ${stat.colorClass} ${hoveredStat === index ? 'statCardHovered' : ''}`}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className={`statIconContainer ${hoveredStat === index ? 'statIconHovered' : ''}`}>
                  {stat.icon}
                </div>
                
                <div className={`statNumber ${hoveredStat === index ? 'statNumberHovered' : ''}`}>
                  {stat.number}
                </div>
                
                <h3 className="statLabel">{stat.label}</h3>
                
                <div className={`statDescription ${hoveredStat === index ? 'statDescriptionVisible' : ''}`}>
                  <p>{stat.description}</p>
                </div>

                {hoveredStat === index && (
                  <div className="statTrendingIcon">
                    <TrendingUp className="trendingIcon" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="topClubsSection">
        <div className="topClubsContainer">
          <div className="sectionHeader" data-aos="fade-up">
            <h2 className="sectionTitle">Top Clubs</h2>
            <p className="sectionSubtitle">Discover the most active and engaging clubs on campus</p>
          </div>

          <div className="clubsGrid">
            {topClubs.map((club, index) => (
              <div 
                key={index}
                className={`clubCard ${hoveredClub === index ? 'clubCardHovered' : ''}`}
                onMouseEnter={() => setHoveredClub(index)}
                onMouseLeave={() => setHoveredClub(null)}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="clubImageContainer">
                  <img src={club.image} alt={club.name} className="clubImage" />
                </div>
                
                <div className="clubContent">
                  <div className="clubCategory">{club.category}</div>
                  <h3 className="clubName">{club.name}</h3>
                  <p className="clubDescription">{club.description}</p>
                  
                  <div className="clubTags">
                    {club.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="clubTag">{tag}</span>
                    ))}
                  </div>
                  
                  <div className="clubFooter">
                    <div className="clubMembers">
                      <Users className="membersIcon" />
                      <span>{club.members} members</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="howItWorksSection">
        <div className="howItWorksContainer">
          <div className="sectionHeader" data-aos="fade-up">
            <h2 className="sectionTitle">How Campus Buddy Works</h2>
            <p className="sectionSubtitle">Get started in just 3 simple steps</p>
          </div>

          <div className="stepsContainer">
            {workingSteps.map((step, index) => (
              <div 
                key={index}
                className="stepCard"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <div className="stepNumber">{step.step}</div>
                <div className="stepIconContainer">
                  {step.icon}
                </div>
                <h3 className="stepTitle">{step.title}</h3>
                <p className="stepDescription">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="whyChooseSection">
        <div className="whyChooseContainer">
          <div className="sectionHeader" data-aos="fade-up">
            <h2 className="sectionTitle">Why Choose CampusBuddy?</h2>
            <p className="sectionSubtitle">Experience the best of campus life with our unique features</p>
          </div>

          <div className="benefitsGrid">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="benefitCard"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="benefitIconContainer">
                  {benefit.icon}
                </div>
                <h3 className="benefitTitle">{benefit.title}</h3>
                <p className="benefitDescription">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="developersSection">
        <div className="developersContainer">
          <div className="sectionHeader" data-aos="fade-up">
            <h2 className="sectionTitle">Meet the Developers</h2>
            <p className="sectionSubtitle">The passionate team behind CampusBuddy</p>
          </div>

          <div className="developersGrid">
            {developers.map((developer, index) => (
              <div 
                key={index}
                className={`developerCard ${hoveredDeveloper === index ? 'developerCardHovered' : ''}`}
                onMouseEnter={() => setHoveredDeveloper(index)}
                onMouseLeave={() => setHoveredDeveloper(null)}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className={`developerOverlay ${hoveredDeveloper === index ? 'developerOverlayVisible' : ''}`}>
                  <div className="developerSocial">
                    <button
                      className="socialLink"
                      onClick={() => handleSocialClick(developer.github)}
                      aria-label={`Visit ${developer.name}'s GitHub`}
                    >
                      <Github className="socialIcon" />
                    </button>
                    <button
                      className="socialLink"
                      onClick={() => handleSocialClick(developer.linkedin)}
                      aria-label={`Visit ${developer.name}'s LinkedIn`}
                    >
                      <Linkedin className="socialIcon" />
                    </button>
                  </div>
                </div>

                <div className="developerContent">
                  <h3 className="developerName">{developer.name}</h3>
                  <p className="developerRole">{developer.role}</p>
                  <p className="developerBio">{developer.bio}</p>
                  
                  <div className="developerSkills">
                    {developer.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skillTag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faqSection">
        <div className="faqContainer">
          <div className="sectionHeader" data-aos="fade-up">
            <h2 className="sectionTitle">Frequently Asked Questions</h2>
            <p className="sectionSubtitle">Got questions? We've got answers!</p>
          </div>

          <div className="faqList">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`faqItem ${openFAQ === index ? 'faqItemOpen' : ''}`}
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <button 
                  className="faqQuestion"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  {openFAQ === index ? 
                    <ChevronUp className="faqIcon" /> : 
                    <ChevronDown className="faqIcon" />
                  }
                </button>
                <div className={`faqAnswer ${openFAQ === index ? 'faqAnswerOpen' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ctaSection">
        <div className="ctaContainer" data-aos="fade-up">
          <h2 className="ctaTitle">Ready to dive into campus life?</h2>
          <p className="ctaDescription">
            Browse upcoming events, RSVP to activities that interest you, and start 
            building your campus network today!
          </p>
          <Link to="/campusevents">
            <button className="ctaBtn">
              <TrendingUp className="ctaBtnIcon" />
              <span>Get Started</span>
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}