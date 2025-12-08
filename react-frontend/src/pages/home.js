import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Student Manager</h1>
      <p>This app lets you add, edit, delete, and view students stored in MongoDB.</p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/students" className="btn">View Students</Link>  
        <br /><br />
        <Link to="/create" className="btn">Add New Student</Link>
      </div>
    </div>
  );
}
