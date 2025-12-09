// src/components/TaskForm.js
import React from "react";

export default function TaskForm({ form, setForm, onSubmit, submitLabel="Save" }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  return (
    <form className="card" onSubmit={onSubmit}>
      <h3>{submitLabel}</h3>

      <div className="form-row">
        <input name="title" value={form.title || ""} onChange={handleChange} placeholder="Title" required />
        <select name="priority" value={form.priority || "Normal"} onChange={handleChange}>
          <option>Low</option>
          <option>Normal</option>
          <option>High</option>
          <option>Critical</option>
        </select>
      </div>

      <div className="form-row">
        <input name="dueDate" type="datetime-local" value={form.dueDate || ""} onChange={handleChange} />
      </div>

      <div className="form-row">
        <textarea name="description" value={form.description || ""} onChange={handleChange} placeholder="Description" rows={4} />
      </div>

      <div style={{ display:"flex", gap:8 }}>
        <button className="btn" type="submit">{submitLabel}</button>
      </div>
    </form>
  );
}
