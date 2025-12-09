// src/pages/TasksPage.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTasks from "../hooks/useTasks";
import TaskList from "../components/TaskList";

export default function TasksPage({ user }) {
  const navigate = useNavigate();

  // Redirect if user not signed in
  useEffect(() => {
    if (!user || !user._id) {
      navigate("/signin");
    }
  }, [user, navigate]);

  // If user isn't loaded yet, do nothing
  if (!user || !user._id) return <div>Loading...</div>;

  const { tasks, loading, error, reload, removeTask } = useTasks(user._id);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await removeTask(id);
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
        <h2>My Tasks</h2>
        <div>
          <button className="btn" onClick={() => navigate("/new")}>New Task</button>
          <button className="btn secondary" style={{marginLeft:8}} onClick={reload}>Reload</button>
        </div>
      </div>

      {loading && <div className="card">Loading...</div>}
      {error && <div className="card">Error loading tasks</div>}

      <TaskList 
        tasks={tasks} 
        onDelete={handleDelete} 
        userId={user._id} 
      />
    </div>
  );
}
