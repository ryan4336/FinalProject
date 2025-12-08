import React from "react";

export default function ItemList({ students, onEdit, onDelete }) {
  return (
    <div>
      <h2>Student List</h2>

      {students.length === 0 && <p>No students found.</p>}

      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <strong>{student.name}</strong> — {student.email} — {student.major}

            <button 
              onClick={() => onEdit(student)} 
              style={{ marginLeft: "10px" }}
            >
              Edit
            </button>

            <button 
              onClick={() => onDelete(student.id)} 
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
