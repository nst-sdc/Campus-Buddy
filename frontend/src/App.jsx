import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import MyEvents from "./pages/MyEvents";
import EventDetails from "./pages/EventDetails";
import Footer from "./components/Footer.jsx";
import { AuthProvider } from "./context/AuthContext";
import ThemeProvider from "./context/ThemeProvider";
import Navbar from "./components/Navbar.jsx";
import AuthPage from "./pages/AuthPage";
import AuthCallback from "./pages/AuthCallback.jsx";
import ProfileCard from "./pages/ProfileCard";
import ClubProfileCard from "./pages/ClubProfileCard";
import CreateEventForm from "./pages/CreateEventForm";
import ClubDirectory from "./pages/ClubDirectory";
import ClubDashboardPage from "./pages/ClubDashboardPage";
import EventStatistics from "./pages/EventStatistics.jsx";
import CampusEvents from "./pages/CampusEvents.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router
          // Disable automatic scroll restoration to prevent unwanted scroll behavior
          // This will prevent pages from opening scrolled down when navigating from a scrolled page
          scrollRestoration="manual"
        >
          <ScrollToTop />
          <Navbar />
          <div className="app-layout">
            <main className="main-content">
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<AuthPage />} />
                <Route
                  path="/auth"
                  element={<Navigate to="/login" replace />}
                />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/campus-events" element={<CampusEvents />} />
                <Route path="/home" element={<Home />} />

                {/* Protected routes - accessible by any authenticated user */}
                <Route
                  path="/clubdashboard"
                  element={
                    <ProtectedRoute>
                      <ClubDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/campusevents"
                  element={
                    <ProtectedRoute>
                      <CampusEvents />
                    </ProtectedRoute>
                  }
                />

                {/* Student-specific routes */}
                <Route
                  path="/myevents"
                  element={
                    <ProtectedRoute>
                      <MyEvents />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/events/:id"
                  element={
                    <ProtectedRoute>
                      <EventDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profilecard"
                  element={
                    <ProtectedRoute>
                      <ProfileCard />
                    </ProtectedRoute>
                  }
                />

                {/* Club-specific routes */}
                <Route
                  path="/clubprofilecard"
                  element={
                    <ProtectedRoute>
                      <ClubProfileCard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/createevent"
                  element={
                    <ProtectedRoute>
                      <CreateEventForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/clubpage"
                  element={
                    <ProtectedRoute>
                      <ClubDirectory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/eventstatistics"
                  element={
                    <ProtectedRoute>
                      <EventStatistics />
                    </ProtectedRoute>
                  }
                />

                {/* Default redirect */}
                <Route path="/" element={<Navigate to="/home" replace />} />

                {/* Catch all route - redirect to home */}
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
