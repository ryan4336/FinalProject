import { useState, useEffect } from "react";
import axios from "../api/axiosConfig";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get("/tasks")
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tasks", err);
        setLoading(false);
      });
  };

  const addTask = (newTask) => {
    return axios
      .post("/tasks", newTask)
      .then((res) => {
        setTasks([...tasks, res.data]);
      })
      .catch((err) => console.error("Error adding task", err));
  };

  const deleteTask = (id) => {
    return axios
      .delete(`/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((t) => t._id !== id));
      })
      .catch((err) => console.error("Error deleting task", err));
  };

  const updateTask = (id, updatedTask) => {
    return axios
      .put(`/tasks/${id}`, updatedTask)
      .then((res) => {
        setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
      })
      .catch((err) => console.error("Error updating task", err));
  };

  return {
    tasks,
    loading,
    addTask,
    deleteTask,
    updateTask,
    fetchTasks,
  };
}
