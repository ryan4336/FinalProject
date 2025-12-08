import React from "react";

export default function ItemForm({ form, setForm, editingId, onSubmit, onCancel }) {
  
  // update form values
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: "20px" }}>
      <h2>{editingId ? "Edit User" : "Add User"}</h2>

      <input
        name="id"
        value={form.id}
        onChange={handleChange}
        placeholder="User ID"
      />
      <br /><br />

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <br /><br />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <br /><br />

      <button type="submit">
        {editingId ? "Save Changes" : "Add User"}
      </button>

      {editingId && (
        <button 
          type="button" 
          onClick={onCancel} 
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
