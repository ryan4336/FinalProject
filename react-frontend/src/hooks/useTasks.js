// src/hooks/useTasks.js
import { useEffect, useState } from "react";
import {
  getTasksForUser,
  createTask,
  updateTask,
  deleteTask,
} from "../api";

/**
 * useTasks(user)
 * - user: { id, email } or null
 * Returns: { tasks, loading, error, reload, addTask, editTask, removeTask }
 */
export default function useTasks(user) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    if (!user) {
      setTasks([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await getTasksForUser(user.id);
      // Expect array
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [user]);

  const addTask = async (payload) => {
    if (!user) throw new Error("Not signed in");
    const body = { ...payload, userId: user.id };
    const res = await createTask(body);
    setTasks((s) => [...s, res.data]);
    return res.data;
  };

  const editTask = async (id, payload) => {
    const res = await updateTask(id, payload);
    setTasks((s) => s.map((t) => (t.id === id || t._id === id ? res.data : t)));
    return res.data;
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks((s) => s.filter((t) => t.id !== id && t._id !== id));
  };

  return {
    tasks,
    loading,
    error,
    reload: load,
    addTask,
    editTask,
    removeTask,
  };
}
