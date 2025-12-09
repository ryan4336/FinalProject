// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
});

// ------------------ USERS ------------------

export const getUserByEmail = (email) =>
  api.get(`/users/search`, { params: { email } });

export const createUser = (payload) =>
  api.post("/users", payload);

// ------------------ TASKS ------------------

export const getTasksForUser = (userId) =>
  api.get(`/tasks/user/${userId}`);

export const getTask = (id) =>
  api.get(`/tasks/${id}`);

export const createTask = (payload) =>
  api.post("/tasks", payload);

export const updateTask = (id, payload) =>
  api.put(`/tasks/${id}`, payload);

export const deleteTask = (id) =>
  api.delete(`/tasks/${id}`);

export default api;
