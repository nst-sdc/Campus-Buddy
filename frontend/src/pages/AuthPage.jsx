import React, { useState } from "react";
import "./AuthPage.css";

const AuthPage = () => {
  const [userType, setUserType] = useState("student");
  const [isLogin, setIsLogin] = useState(true);

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

        <form className="auth-form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit" className="gradient-button">
            {isLogin ? `Sign in as ${userType}` : `Sign up as ${userType}`}
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span onClick={() => setIsLogin(false)}>Sign up</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Log in</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
