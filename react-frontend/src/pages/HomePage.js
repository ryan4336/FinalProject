// src/pages/HomePage.js
import React from "react";
import { Link } from "react-router-dom";

export default function HomePage({ user }) {
  return (
    <div>
      <div className="card">
        <h1>Welcome to TaskFlow</h1>
        <p>Manage your tasks, get reminders, and focus on what matters.</p>

        {user ? (
          <>
            <p className="small">Signed in as <strong>{user.email}</strong></p>
            <Link to="/tasks" className="btn">View My Tasks</Link>
            <Link to="/new" className="btn" style={{ marginLeft: 8 }}>Create Task</Link>
          </>
        ) : (
          <Link to="/signin" className="btn">Sign in with Email</Link>
        )}
      </div>
    </div>
  );
}
