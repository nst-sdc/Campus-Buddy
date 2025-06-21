import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import MyEvents from './pages/MyEvents'
import Events from './pages/Events'
import Footer from './components/Footer.jsx'
const App = () => {
  return (
    <>
    <Router>
      <div>
        <div>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/myevents" element={<MyEvents />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </div>
      </div>
      <Footer/>
    </Router>
    </>
  );
};

export default App;



