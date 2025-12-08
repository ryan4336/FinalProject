import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    major: ''
  });

  const [editingId, setEditingId] = useState(null);

  // FETCH ALL STUDENTS (READ)
  useEffect(() => {
    axios.get('https://localhost:5001/api/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error('Error fetching students', err));
  }, []); // IMPORTANT: [] prevents infinite requests

  // HANDLE FORM INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // CREATE NEW STUDENT
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://localhost:5001/api/students', form)
      .then(res => {
        setStudents([...students, res.data]);
        setForm({ name: '', email: '', major: '' });
      })
      .catch(err => console.error('Error creating student', err));
  };

  // DELETE STUDENT
  const handleDelete = (id) => {
    axios.delete(`https://localhost:5001/api/students/${id}`)
      .then(() => {
        setStudents(students.filter(s => s.id !== id));
      })
      .catch(err => console.error('Error deleting student', err));
  };

  // LOAD STUDENT INTO FORM (ENTER EDIT MODE)
  const startEdit = (student) => {
    setEditingId(student.id);
    setForm({
      name: student.name,
      email: student.email,
      major: student.major
    });
  };

  // SAVE EDIT (UPDATE)
  const saveEdit = (e) => {
    e.preventDefault();

    axios.put(`https://localhost:5001/api/students/${editingId}`, form)
      .then(res => {
        setStudents(students.map(s => (s.id === editingId ? res.data : s)));
        setEditingId(null);
        setForm({ name: '', email: '', major: '' });
      })
      .catch(err => console.error('Error updating student', err));
  };

  return (
    <div className="App">
      <h1>Student Manager</h1>

      {/* FORM */}
      <form onSubmit={editingId ? saveEdit : handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="major"
          placeholder="Major"
          value={form.major}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Save Changes" : "Add Student"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ id: '', name: '', email: '', major: '' });
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <hr />

      {/* STUDENT LIST */}
      <h2>Student List</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            <strong>{student.name}</strong> — {student.email} — {student.major}

            <button onClick={() => startEdit(student)}>Edit</button>
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
