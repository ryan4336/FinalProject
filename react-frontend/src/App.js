import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ItemForm from "./components/itemform";

function App() {

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    id: '',
    name: '',
    email: ''
  });

  const [editingId, setEditingId] = useState(null);

  // READ - fetch users
  useEffect(() => {
    axios.get('https://localhost:5001/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching users", err));
  }, []);

  // CREATE
  const addUser = (e) => {
    e.preventDefault();

    axios.post('https://localhost:5001/api/users', form)
      .then((res) => {
        setUsers([...users, res.data]);
        setForm({ id: '', name: '', email: '' });
      })
      .catch(err => console.error("Error adding user", err));
  };

  // DELETE
  const deleteUser = (id) => {
    axios.delete(`https://localhost:5001/api/users/${id}`)
      .then(() => setUsers(users.filter(u => u.id !== id)))
      .catch(err => console.error("Error deleting user", err));
  };

  // ENTER EDIT MODE
  const startEdit = (user) => {
    setEditingId(user.id);
    setForm({
      id: user.id,
      name: user.name,
      email: user.email
    });
  };

  // UPDATE
  const saveEdit = (e) => {
    e.preventDefault();

    axios.put(`https://localhost:5001/api/users/${editingId}`, form)
      .then((res) => {
        setUsers(users.map(u => (u.id === editingId ? res.data : u)));
        setEditingId(null);
        setForm({ id: '', name: '', email: '' });
      })
      .catch(err => console.error("Error updating user", err));
  };

  return (
    <div className="App">
      <h1>User Manager</h1>

      {/* Form */}
      <ItemForm
        form={form}
        setForm={setForm}
        editingId={editingId}
        onSubmit={editingId ? saveEdit : addUser}
        onCancel={() => {
          setEditingId(null);
          setForm({ id: '', name: '', email: '' });
        }}
      />

      <hr />

      {/* User List */}
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.id}</strong> — {user.name} — {user.email}

            <button 
              onClick={() => startEdit(user)} 
              style={{ marginLeft: "10px" }}
            >
              Edit
            </button>

            <button 
              onClick={() => deleteUser(user.id)} 
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

export default App;
