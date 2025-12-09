// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
});

// ---------------- USER ----------------
export const getUserByEmail = (email) =>
  api.get("/users", { params: { email } });

export const createUser = (payload) =>
  api.post("/users", payload);

// ---------------- TASKS ----------------

// Get tasks for a specific user
export const getTasksForUser = (userId) =>
  api.get(`/tasks/${userId}`);

// Create a new task
export const createTask = (payload) =>
  api.post("/tasks", payload);

// Update a task
export const updateTask = (id, payload) =>
  api.put(`/tasks/${id}`, payload);

// Delete a task
export const deleteTask = (id) =>
  api.delete(`/tasks/${id}`);

export default api;
