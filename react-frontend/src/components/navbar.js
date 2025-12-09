// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, onSignOut }) {
  return (
    <nav className="nav">
      <div className="brand"><Link to="/" style={{textDecoration:"none"}}>TaskFlow</Link></div>

      <Link to="/tasks">My Tasks</Link>
      <Link to="/new">Create</Link>

      {user ? (
        <>
          <span style={{ marginLeft: 12 }} className="small">Signed in: {user.email}</span>
          <button className="btn secondary" style={{ marginLeft: 12 }} onClick={onSignOut}>Sign Out</button>
        </>
      ) : (
        <Link to="/signin" style={{ marginLeft: "auto" }}>Sign In</Link>
      )}
    </nav>
  );
}
