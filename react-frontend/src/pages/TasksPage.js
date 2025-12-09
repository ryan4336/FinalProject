// src/pages/TasksPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import useTasks from "../hooks/useTasks";
import TaskList from "../components/TaskList";

export default function TasksPage({ user }) {
  const navigate = useNavigate();
  const { tasks, loading, error, reload, removeTask } = useTasks(user);

  if (!user) {
    // if not signed in, redirect to sign in
    navigate("/signin");
    return null;
  }

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

      <TaskList tasks={tasks} onDelete={handleDelete} userId={user.id || user._id} />
    </div>
  );
}
