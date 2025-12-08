import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="brand">TaskFlow</div>
      <nav style={{display:"flex", gap:8, alignItems:"center"}}>
        <Link to="/">Home</Link>
        <Link to="/tasks">All Tasks</Link>
        <Link to="/new">Create Task</Link>
      </nav>
    </header>
  );
}
