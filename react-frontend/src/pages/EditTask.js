import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTasks from "../hooks/useTasks";
import TaskForm from "../components/TaskForm";

export default function EditTask({ user }) {
  const nav = useNavigate();
  const { id } = useParams();
  const { tasks, editTask } = useTasks(user);
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!user) { nav("/signin"); return; }
    const t = tasks.find(t => t._id === id);
    if (t) setForm({ title: t.title, description: t.description, dueDate: t.dueDate ? t.dueDate.slice(0,16) : "", priority: t.priority || "Normal", completed: t.completed || false });
  }, [tasks, id, user, nav]);

  if (!form) return <div>Loading...</div>;

  const submit = async (e) => {
    e.preventDefault();
    try { await editTask(id, form); nav("/tasks"); }
    catch { alert("Failed to update task"); }
  };

  return <TaskForm form={form} setForm={setForm} onSubmit={submit} submitLabel="Update Task" />;
}
