import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import MyEvents from './pages/MyEvents';
import Events from './pages/Events';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AuthPage from './pages/AuthPage';
import ProfileCard from './pages/ProfileCard'
import CreateEventForm from './pages/CreateEventForm';
import ClubDirectory from './pages/ClubDirectory';

const App = () => {
  const userType = 'student'; 

  return (
    <Router>
      <Navbar userType={userType} />

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/myevents" element={<MyEvents />} />  
        <Route path="/profilecard" element={<ProfileCard />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/create" element={<CreateEventForm />} />
      </Routes>

      <Footer />
      <div>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/myevents" element={<MyEvents />} />
            <Route path="/events" element={<Events />} />
            <Route path='/profilecard' element={<ProfileCard/>} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/createevent" element={<CreateEventForm />} />
            <Route path='/clubpage' element={<ClubDirectory/>}/>
          </Routes>
        </div>
      </div>
      <Footer/>
    </Router>
  );
};

export default App;
