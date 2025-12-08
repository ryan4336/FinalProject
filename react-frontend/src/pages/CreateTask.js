import React, { useState } from "react";

export default function CreateTask({ onCreate }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    isCompleted: false
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.title || !form.dueDate) {
      setError("Title and due date are required.");
      return;
    }

    setBusy(true);
    const res = await onCreate(form);
    setBusy(false);

    if (!res.ok) {
      setError(res.error || "Failed to create.");
    }
  };

  return (
    <div className="card">
      <h2>Create Task</h2>
      {error && <div className="error">{error}</div>}

      <div style={{display:"grid", gap:8}}>
        <label className="kv">Title</label>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Task title" />

        <label className="kv">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Optional description" />

        <div className="form-row">
          <div style={{flex:1}}>
            <label className="kv">Due Date</label>
            <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
          </div>

          <div style={{width:140}}>
            <label className="kv">Priority</label>
            <select name="priority" value={form.priority} onChange={handleChange}>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>

        <div style={{display:"flex", gap:8}}>
          <button className="btn" onClick={handleSubmit} disabled={busy}>{busy ? "Saving..." : "Create Task"}</button>
        </div>
      </div>
    </div>
  );
}
