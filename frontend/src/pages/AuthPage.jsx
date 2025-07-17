import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import "./AuthPage.css";

const AuthPage = () => {
  const [userType, setUserType] = useState("student");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    password: "",
    batch_year: "",
    department: "",
    phone: "",
    // Club-specific fields
    club_name: "",
    club_category: "",
    established_year: "",
    description: "",
    club_email: "",
    website: "",
    contact_person: "",
    contact_phone: "",
  });

  const navigate = useNavigate();

  const {
    user,
    session,
    loading: authLoading,
    error: authError,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    updateUserProfile,
    getUserRole,
    isAuthenticated,
  } = useAuth();

  const departments = [
    "Computer Science",
    "Electronics",
    "Mechanical",
    "Civil",
    "Chemical",
    "Electrical",
    "Information Technology",
    "Biotechnology",
    "Architecture",
    "Business Administration",
    "Management",
    "Arts",
    "Commerce",
    "Other",
  ];

  const clubCategories = [
    "Technical",
    "Cultural",
    "Sports",
    "Literary",
    "Social Service",
    "Innovation & Tech",
    "Arts & Crafts",
    "Music & Dance",
    "Drama & Theatre",
    "Photography",
    "Entrepreneurship",
    "Environmental",
    "Academic",
    "Other",
  ];

  const currentYear = new Date().getFullYear();
  const batchYears = Array.from({ length: 6 }, (_, i) => currentYear + i);
  const establishedYears = Array.from(
    { length: 30 },
    (_, i) => currentYear - i
  );

  useEffect(() => {
    if (isAuthenticated && isAuthenticated() && !authLoading) {
      const userRole = getUserRole();
      if (userRole === "student") {
        navigate("/home", { replace: true });
      } else if (userRole === "club") {
        navigate("/clubpage", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    }
  }, [user, session, authLoading, navigate, isAuthenticated, getUserRole]);

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const resetForm = () => {
    setUserData({
      full_name: "",
      email: "",
      password: "",
      batch_year: "",
      department: "",
      phone: "",
      // Club-specific fields
      club_name: "",
      club_category: "",
      established_year: "",
      description: "",
      club_email: "",
      website: "",
      contact_person: "",
      contact_phone: "",
    });
    setError(null);
    setSuccessMessage(null);
  };

  const validateUserData = () => {
    const { full_name, email, password, department } = userData;

    if (!full_name.trim()) {
      setError("Full name is required");
      return false;
    }

    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    if (!password.trim()) {
      setError("Password is required");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (userType === "student") {
      if (!department) {
        setError("Department is required");
        return false;
      }

      if (!userData.batch_year) {
        setError("Batch year is required for students");
        return false;
      }

      // Phone validation (if provided)
      if (
        userData.phone &&
        !/^\d{10}$/.test(userData.phone.replace(/\D/g, ""))
      ) {
        setError("Please enter a valid 10-digit phone number");
        return false;
      }
    } else if (userType === "club") {
      if (!userData.club_name.trim()) {
        setError("Club name is required");
        return false;
      }

      if (!userData.club_category) {
        setError("Club category is required");
        return false;
      }

      if (!userData.established_year) {
        setError("Established year is required");
        return false;
      }

      if (!userData.contact_person.trim()) {
        setError("Contact person is required");
        return false;
      }

      if (!userData.contact_phone.trim()) {
        setError("Contact phone is required");
        return false;
      }

      // Club email validation (if provided)
      if (userData.club_email && !emailRegex.test(userData.club_email)) {
        setError("Please enter a valid club email address");
        return false;
      }

      // Contact phone validation
      if (
        userData.contact_phone &&
        !/^\d{10}$/.test(userData.contact_phone.replace(/\D/g, ""))
      ) {
        setError("Please enter a valid 10-digit contact phone number");
        return false;
      }
    }

    return true;
  };
  const saveUserDataToJson = async (userData, userType, userId) => {
    try {
      let jsonData;

      if (userType === "student") {
        jsonData = {
          id: userId,
          name: userData.full_name,
          email: userData.email,
          role: "student",
          batch_year: userData.batch_year
            ? parseInt(userData.batch_year)
            : null,
          department: userData.department,
          phone: userData.phone || null,
          created_at: new Date().toISOString(),
        };
      } else if (userType === "club") {
        jsonData = {
          id: userId,
          name: userData.full_name, // Contact person name
          email: userData.email, // Login email
          role: "club",
          club_name: userData.club_name,
          club_category: userData.club_category,
          established_year: userData.established_year
            ? parseInt(userData.established_year)
            : null,
          description: userData.description || null,
          club_email: userData.club_email || null,
          website: userData.website || null,
          contact_person: userData.contact_person,
          contact_phone: userData.contact_phone,
          created_at: new Date().toISOString(),
        };
      }

      // Send POST request to your JSON endpoint
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("User data saved to JSON:", result);
      return { success: true, data: result };
    } catch (error) {
      console.error("Error saving user data to JSON:", error);
      return { success: false, error: error.message };
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithGoogle(userType);
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      console.error("Google sign in error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    try {
      const result = await signIn(email, password);
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      console.error("Email auth error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateUserData()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let signupData = {
        full_name: userData.full_name,
        email: userData.email,
      };

      if (userType === "student") {
        signupData = {
          ...signupData,
          batch_year: userData.batch_year
            ? parseInt(userData.batch_year)
            : null,
          department: userData.department,
          phone: userData.phone || null,
        };
      } else if (userType === "club") {
        signupData = {
          ...signupData,
          club_name: userData.club_name,
          club_category: userData.club_category,
          established_year: userData.established_year
            ? parseInt(userData.established_year)
            : null,
          description: userData.description || null,
          club_email: userData.club_email || null,
          website: userData.website || null,
          contact_person: userData.contact_person,
          contact_phone: userData.contact_phone,
        };
      }

      const result = await signUp(
        userData.email,
        userData.password,
        userType,
        signupData
      );

      if (!result.success) {
        setError(result.error);
        return;
      }
      // Generate user ID (you can use result.user.id if available from Supabase)
      const userId =
        result.user?.id ||
        `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Save user data to JSON endpoint
      const jsonResult = await saveUserDataToJson(userData, userType, userId);

      if (!jsonResult.success) {
        console.warn("Failed to save to JSON:", jsonResult.error);
        // Don't fail the signup if JSON save fails, just log it
      }

      // Simple success message - just show "check your email"
      setSuccessMessage(
        "Account created successfully! Please check your email for a confirmation link."
      );
      setError(null);
      resetForm();
      setIsLogin(true); // Switch to login form
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const result = await signOut();
      if (!result.success) {
        setError("Failed to sign out");
      } else {
        setError(null);
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.error("Sign out error:", err);
      setError("Failed to sign out");
    }
  };

  if (authLoading) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (isAuthenticated && isAuthenticated()) {
    const userRole = getUserRole() || "Not assigned";
    return (
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <span className="auth-logo">👥</span>
            <h1 className="gradient-text">Campus-Buddy</h1>
            <p>Welcome back!</p>
          </div>

          <div className="user-info">
            <div className="user-avatar">
              {user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Avatar"
                  className="avatar-img"
                />
              ) : (
                <div className="avatar-placeholder">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <h3>{user.user_metadata?.full_name || user.email}</h3>
            <p className="user-email">{user.email}</p>
            <p className="user-role">
              Role: <span className="role-badge">{userRole}</span>
            </p>

            <div className="user-actions">
              <button className="gradient-button" onClick={handleSignOut}>
                Sign Out
              </button>
              <button
                className="gradient-button"
                onClick={() => {
                  if (userRole === "student") {
                    navigate("/home");
                  } else if (userRole === "club") {
                    navigate("/clubpage");
                  } else {
                    navigate("/home");
                  }
                }}
              >
                Go to {userRole === "club" ? "Club Dashboard" : "Home"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <span className="auth-logo">👥</span>
          <h1 className="gradient-text">Campus-Buddy</h1>
          <p>Connect, Discover, Participate</p>
        </div>

        <div className="user-toggle">
          <button
            className={`toggle-btn ${userType === "student" ? "active" : ""}`}
            onClick={() => setUserType("student")}
          >
            Student
          </button>
          <button
            className={`toggle-btn ${userType === "club" ? "active" : ""}`}
            onClick={() => setUserType("club")}
          >
            Club
          </button>
        </div>

        <button
          className="google-signin-btn"
          onClick={handleGoogleSignIn}
          disabled={loading || authLoading}
        >
          <svg
            className="google-icon"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {loading ? "Signing in..." : `Continue with Google as ${userType}`}
        </button>

        <div className="divider">
          <span>or</span>
        </div>

        {isLogin ? (
          <form className="auth-form" onSubmit={handleEmailAuth}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              disabled={loading || authLoading}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              disabled={loading || authLoading}
              minLength={6}
            />
            <button
              type="submit"
              className="gradient-button"
              disabled={loading || authLoading}
            >
              {loading ? "Signing in..." : `Sign in as ${userType}`}
            </button>
          </form>
        ) : (
          <form
            className="auth-form data-collection-form"
            onSubmit={handleSignUp}
          >
            {userType === "student" ? (
              <>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={userData.full_name}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        full_name: e.target.value,
                      }))
                    }
                    placeholder="Enter your full name"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>Password *</label>
                  <input
                    type="password"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                    minLength={6}
                  />
                </div>

                <div className="form-group">
                  <label>Department *</label>
                  <select
                    value={userData.department}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        department: e.target.value,
                      }))
                    }
                    required
                    disabled={loading}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Batch Year (Graduation Year) *</label>
                  <select
                    value={userData.batch_year}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        batch_year: e.target.value,
                      }))
                    }
                    required
                    disabled={loading}
                  >
                    <option value="">Select Batch Year</option>
                    {batchYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    placeholder="Enter your phone number"
                    disabled={loading}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>Contact Person Name *</label>
                  <input
                    type="text"
                    value={userData.full_name}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        full_name: e.target.value,
                      }))
                    }
                    placeholder="Enter contact person's full name"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>Login Email *</label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="Enter login email"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>Password *</label>
                  <input
                    type="password"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                    minLength={6}
                  />
                </div>

                <div className="form-group">
                  <label>Club Name *</label>
                  <input
                    type="text"
                    value={userData.club_name}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        club_name: e.target.value,
                      }))
                    }
                    placeholder="Enter club name"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>Club Category *</label>
                  <select
                    value={userData.club_category}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        club_category: e.target.value,
                      }))
                    }
                    required
                    disabled={loading}
                  >
                    <option value="">Select Club Category</option>
                    {clubCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Established Year *</label>
                  <select
                    value={userData.established_year}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        established_year: e.target.value,
                      }))
                    }
                    required
                    disabled={loading}
                  >
                    <option value="">Select Established Year</option>
                    {establishedYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Club Email (Optional)</label>
                  <input
                    type="email"
                    value={userData.club_email}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        club_email: e.target.value,
                      }))
                    }
                    placeholder="Enter club's public email"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>Website (Optional)</label>
                  <input
                    type="url"
                    value={userData.website}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        website: e.target.value,
                      }))
                    }
                    placeholder="Enter club website URL"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>Contact Person *</label>
                  <input
                    type="text"
                    value={userData.contact_person}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        contact_person: e.target.value,
                      }))
                    }
                    placeholder="Enter main contact person"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>Contact Phone *</label>
                  <input
                    type="tel"
                    value={userData.contact_phone}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        contact_phone: e.target.value,
                      }))
                    }
                    placeholder="Enter contact phone number"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>Club Description (Optional)</label>
                  <textarea
                    value={userData.description}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Brief description of your club"
                    disabled={loading}
                    rows={3}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="gradient-button"
              disabled={loading}
            >
              {loading ? "Creating Account..." : `Create ${userType} Account`}
            </button>
          </form>
        )}

        {error && <div className="error-message">{error}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <div className="auth-footer">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setIsLogin(false);
                  setError(null);
                  setSuccessMessage(null);
                  resetForm();
                }}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setIsLogin(true);
                  setError(null);
                  setSuccessMessage(null);
                  resetForm();
                }}
              >
                Log in
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
