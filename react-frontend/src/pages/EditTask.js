import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditTask({ tasks = [], onUpdate }) {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "", description: "", dueDate: "", priority: "Medium", isCompleted: false
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const t = tasks.find(x => x.id === id);
    if (t) {
      setForm({
        title: t.title || "",
        description: t.description || "",
        dueDate: t.dueDate ? t.dueDate.split("T")[0] : "",
        priority: t.priority || "Medium",
        isCompleted: !!t.isCompleted
      });
    } else {
      // if tasks not loaded yet, leave blank — user can refresh
    }
  }, [id, tasks]);

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.title || !form.dueDate) {
      setError("Title and due date required.");
      return;
    }
    setBusy(true);
    const res = await onUpdate(id, form);
    setBusy(false);
    if (!res.ok) {
      setError(res.error || "Update failed");
    }
  };

  return (
    <div className="card">
      <h2>Edit Task</h2>
      {error && <div className="error">{error}</div>}

      <div style={{display:"grid", gap:8}}>
        <label className="kv">Title</label>
        <input name="title" value={form.title} onChange={handleChange} />

        <label className="kv">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} />

        <label className="kv">Due Date</label>
        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />

        <label className="kv">Priority</label>
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <label style={{display:"flex", alignItems:"center", gap:8}}>
          <input type="checkbox" name="isCompleted" checked={form.isCompleted} onChange={handleChange} />
          Mark completed
        </label>

        <div style={{display:"flex", gap:8}}>
          <button className="btn" onClick={handleSubmit} disabled={busy}>{busy ? "Saving..." : "Save Changes"}</button>
        </div>
      </div>
    </div>
  );
}
