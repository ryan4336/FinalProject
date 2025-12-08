import React from "react";

export default function ItemList({ users, onEdit, onDelete }) {
  return (
    <div>
      <h2>User List</h2>

      {users.length === 0 && <p>No users found.</p>}

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <strong>{u.name}</strong> — {u.email}

            <button
              onClick={() => onEdit(u)}
              style={{ marginLeft: "10px" }}
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(u.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>

          </li>
        ))}
      </ul>
    </div>
  );
}
