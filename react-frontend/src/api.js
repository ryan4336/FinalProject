// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:5001/api", // <-- change to http if required
  // withCredentials: true, // optional if your backend uses cookies
});

// helper APIs (optional wrappers)
export const getUserByEmail = (email) =>
  api.get("/users", { params: { email } }); // expects [] or [user]

export const createUser = (payload) =>
  api.post("/users", payload);

export const getTasksForUser = (userId) =>
  api.get("/tasks", { params: { userId } });

export const getTask = (id) =>
  api.get(`/tasks/${id}`);

export const createTask = (payload) =>
  api.post("/tasks", payload);

export const updateTask = (id, payload) =>
  api.put(`/tasks/${id}`, payload);

export const deleteTask = (id) =>
  api.delete(`/tasks/${id}`);

export default api;
