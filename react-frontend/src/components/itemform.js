import React from "react";

export default function ItemForm({ form, setForm, editingId, onSubmit, onCancel }) {
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: "20px" }}>
      <h2>{editingId ? "Edit Student" : "Add Student"}</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Student Name"
      />
      <br /><br />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Student Email"
      />
      <br /><br />

      <input
        name="major"
        value={form.major}
        onChange={handleChange}
        placeholder="Student Major"
      />
      <br /><br />

      <button type="submit">
        {editingId ? "Save Changes" : "Add Student"}
      </button>

      {editingId && (
        <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      )}
    </form>
  );
}
