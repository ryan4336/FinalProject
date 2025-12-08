import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ItemForm from './components/itemform';
import ItemList from './components/itemlist';

function App() {

  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: ""
  });

  const [editingId, setEditingId] = useState(null);

  // GET ALL USERS
  useEffect(() => {
    axios.get("http://localhost:5001/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching users", err));
  }, []);

  // CREATE USER
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5001/api/users", form)
      .then(res => {
        setUsers([...users, res.data]);
        setForm({ id: "", name: "", email: "" });
      })
      .catch(err => console.error("Error creating user", err));
  };

  // DELETE USER
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5001/api/users/${id}`)
      .then(() => {
        setUsers(users.filter(u => u.id !== id));
      })
      .catch(err => console.error("Error deleting user", err));
  };

  // LOAD A USER INTO FORM FOR EDITING
  const startEdit = (user) => {
    setEditingId(user.id);
    setForm({
      id: user.id,
      name: user.name,
      email: user.email
    });
  };

  // UPDATE USER
  const saveEdit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5001/api/users/${editingId}`, form)
      .then((res) => {
        setUsers(users.map(u => (u.id === editingId ? res.data : u)));
        setEditingId(null);
        setForm({ id: "", name: "", email: "" });
      })
      .catch(err => console.error("Error updating user", err));
  };

  return (
    <div className="App">
      <h1>User Manager</h1>

      <ItemForm
        form={form}
        setForm={setForm}
        editingId={editingId}
        onSubmit={editingId ? saveEdit : handleSubmit}
        onCancel={() => {
          setEditingId(null);
          setForm({ id: "", name: "", email: "" });
        }}
      />

      <ItemList
        users={users}
        onEdit={startEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
