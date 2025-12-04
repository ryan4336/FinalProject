import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {

  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    major: ''
  });

  useEffect(() => {
    axios.get('https://localhost:5001/api/students').then(res => {
      setStudents (res.data);
    }).catch(err => {
      console.error('Error fetching students', err);
    });
  });


  return
}

export default App;
