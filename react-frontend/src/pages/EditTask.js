// src/pages/EditTask.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTask } from "../api";
import useTasks from "../hooks/useTasks";
import TaskForm from "../components/TaskForm";

export default function EditTask({ user }) {
  const { id } = useParams();
  const nav = useNavigate();
  const { editTask } = useTasks(user);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      nav("/signin");
      return;
    }
    // load single task
    (async () => {
      try {
        const res = await getTask(id);
        const t = res.data;
        // ensure task belongs to user
        if (!t) throw new Error("Not found");
        const userId = user.id || user._id;
        if ((t.userId && (t.userId !== userId)) && (t.userId !== userId.toString())) {
          alert("You cannot edit this task.");
          nav("/tasks");
          return;
        }
        setForm({
          title: t.title || "",
          description: t.description || "",
          dueDate: t.dueDate ? t.dueDate.split(".")[0] : "",
          priority: t.priority || "Normal",
          isCompleted: t.isCompleted || false,
        });
      } catch (err) {
        alert("Failed to load task");
        nav("/tasks");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, [id, user]);

  if (loading) return <div className="card">Loading...</div>;
  if (!form) return null;

  const submit = async (e) => {
    e.preventDefault();
    try {
      await editTask(id, form);
      nav("/tasks");
    } catch (err) {
      alert("Failed to update task");
    }
  };

  return <TaskForm form={form} setForm={setForm} onSubmit={submit} submitLabel="Save Changes" />;
}
