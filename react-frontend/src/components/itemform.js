import React from "react";

export default function ItemForm({ form, setForm, editingId, onSubmit, onCancel }) {

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: "20px" }}>

      <h2>{editingId ? "Edit User" : "Add User"}</h2>

      {/* ID FIELD */}
      {!editingId && (
        <>
          <input
            name="id"
            placeholder="User ID"
            value={form.id}
            onChange={handleChange}
          />
          <br /><br />
        </>
      )}

      {/* NAME FIELD */}
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <br /><br />

      {/* EMAIL FIELD */}
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <br /><br />

      <button type="submit">
        {editingId ? "Save Changes" : "Add User"}
      </button>

      {editingId && (
        <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      )}

    </form>
  );
}
