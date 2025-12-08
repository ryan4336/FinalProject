import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./pages/HomePage";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import TaskListPage from "./pages/TaskListPage";
import api from "./api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // fetch tasks (READ)
  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/tasks");
      // normalize id (_id vs id)
      const normalized = res.data.map((t) => ({ 
        ...t, 
        id: t.id || t._id 
      }));
      setTasks(normalized);
    } catch (err) {
      console.error("Error loading tasks:", err);
      setError("Could not load tasks. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // CREATE
  const createTask = async (payload) => {
    try {
      const res = await api.post("/tasks", payload);
      const newTask = res.data;
      newTask.id = newTask.id || newTask._id;
      setTasks((prev) => [...prev, newTask]);
      navigate("/"); // go to list/home
      return { ok: true };
    } catch (err) {
      console.error("Create failed:", err);
      return { ok: false, error: err?.response?.data || err.message };
    }
  };

  // UPDATE
  const updateTask = async (id, payload) => {
    try {
      const res = await api.put(`/tasks/${id}`, payload);
      const updated = res.data;
      updated.id = updated.id || updated._id;
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      navigate("/");
      return { ok: true };
    } catch (err) {
      console.error("Update failed:", err);
      return { ok: false, error: err?.response?.data || err.message };
    }
  };

  // DELETE
  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed. Check console.");
    }
  };

  // TOGGLE COMPLETE
  const toggleComplete = async (task) => {
    try {
      await updateTask(task.id, { ...task, isCompleted: !task.isCompleted });
    } catch (err) {
      console.error("Toggle complete failed", err);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container">
        {error && <div className="error">{error}</div>}
        <Routes>
          <Route path="/" element={
            <HomePage
              tasks={tasks}
              loading={loading}
              onDelete={deleteTask}
              onToggleComplete={toggleComplete}
              onRefresh={loadTasks}
            />
          } />
          <Route path="/new" element={<CreateTask onCreate={createTask} />} />
          <Route path="/edit/:id" element={<EditTask tasks={tasks} onUpdate={updateTask} />} />
          <Route path="/tasks" element={
            <TaskListPage 
              tasks={tasks}
              loading={loading}
              onDelete={deleteTask}
              onToggleComplete={toggleComplete}
              onRefresh={loadTasks}
            />
          } />
          <Route path="*" element={<div style={{padding:20}}>Page not found</div>} />
        </Routes>
      </main>
    </>
  );
}
