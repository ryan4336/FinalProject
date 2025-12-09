import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTasks from "../hooks/useTasks";
import TaskForm from "../components/TaskForm";

export default function CreateTask({ user }) {
  const nav = useNavigate();
  const { addTask } = useTasks(user);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Normal",
    completed: false,
  });

  if (!user) { nav("/signin"); return null; }

  const submit = async (e) => {
    e.preventDefault();
    try { await addTask(form); nav("/tasks"); }
    catch { alert("Failed to create task"); }
  };

  return <TaskForm form={form} setForm={setForm} onSubmit={submit} submitLabel="Create Task" />;
}
